// Cloudflare Pages — Advanced Mode worker (works with dashboard drag-and-drop upload).
// Handles POST /api/chat; everything else is served from the uploaded static files.
//
// Set GEMINI_API_KEY in: Pages project → Settings → Variables and secrets → Production.

const BUILD = "v15-github-ready";
const API = "https://generativelanguage.googleapis.com/v1beta";
// Cloudflare Workers AI models, tried in order. The first has a large context window for the sheets.
const WORKERS_AI_MODELS = [
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/meta/llama-4-scout-17b-16e-instruct",
  "@cf/meta/llama-3.1-8b-instruct-fast",
];
const WORKERS_AI_SYSTEM_CHARS = 32000;
const SMALL_MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
const SMALL_SYSTEM_CHARS = 16000;
// Questions that need precise facts from the sheets go to the larger model.
const DETAILED_RE = /deadline|due|close|open|when|date|timeline|eligib|criteria|requirement|qualif|interview|process|round|bond|apply|application|ucas|common app|sat|act|ucat|lnat|esat|tara|tmua|test|score|grade|rank point|\brp\b|h2|subject|aba|aptitude|compare|difference|which|cost|fee|stipend|allowance|psc|mindef|saf|dsta|a\*star|astar|edb|mfa|mha|moh|mext|jardine|nus|ntu|smu|sutd|sit|suss|oxbridge|medicine|law/i;
function pickModels(question) {
  const q = String(question || "");
  const detailed = DETAILED_RE.test(q) || q.length > 140;
  return detailed
    ? { detailed, models: WORKERS_AI_MODELS }
    : { detailed, models: [SMALL_MODEL, ...WORKERS_AI_MODELS.filter((m) => m !== SMALL_MODEL)] };
}

// Tried in order; the first one your key accepts is cached and reused.
const MODEL_CANDIDATES = [
  "gemini-3.8-flash",
  "gemini-3.8-flash-lite",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
  "gemini-3.5-flash",
  "gemini-3-flash-preview",
];

let cachedModel = null;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" },
  });

let modelListCache = null;
async function listModels(key) {
  if (modelListCache) return modelListCache;
  let res;
  try { res = await fetch(`${API}/models?key=${encodeURIComponent(key)}`, { signal: AbortSignal.timeout(4000) }); } catch { return []; }
  if (!res.ok) return [];
  const data = await res.json().catch(() => null);
  return (modelListCache = (data?.models || [])
    .filter((m) => (m.supportedGenerationMethods || []).includes("generateContent"))
    .map((m) => String(m.name || "").replace(/^models\//, ""))
    .filter(Boolean));
}

async function candidateOrder(key) {
  const available = await listModels(key);
  const order = MODEL_CANDIDATES.filter((c) => !available.length || available.includes(c));
  const extras = available.filter(
    (m) => m.includes("flash") && !/2\.0|2\.5|1\.5/.test(m) && !m.includes("image") && !m.includes("tts") && !order.includes(m)
  );
  const list = [...order, ...extras];
  return list.length ? list : MODEL_CANDIDATES;
}

async function pickModel(key) {
  if (cachedModel) return cachedModel;
  const list = await candidateOrder(key);
  return list[0];
}

async function generate(model, key, payload, deadline, retries = 1) {
  let plain = false;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const left = deadline - Date.now();
    if (left < 2500) return { status: 504, raw: "time budget used up" };
    const body = { ...payload };
    // 2.5-series models "think" by default, which eats the output budget. Turn it off for fast, short answers.
    if (/2\.5/.test(model) && !plain) {
      body.generationConfig = { ...(body.generationConfig || {}), thinkingConfig: { thinkingBudget: 0 } };
    }
    if (plain) {
      body.generationConfig = { maxOutputTokens: 2048 };
      if (body.systemInstruction) {
        const sys = body.systemInstruction.parts[0].text;
        delete body.systemInstruction;
        body.contents = body.contents.map((c, i) => i === 0 ? { role: "user", parts: [{ text: "Instructions (follow these):\n" + sys + "\n\n---\n\nQuestion:\n" + c.parts[0].text }] } : c);
      }
    }
    let res;
    try {
    res = await fetch(
      `${API}/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(Math.min(left - 500, 20000)),
      }
    );
    } catch (e) { return { status: 504, raw: "Gemini took too long (" + model + ")" }; }
    const status = res.status;
    const raw = await res.text();
    if (status === 400 && !plain && Date.now() + 3000 < deadline) { plain = true; attempt--; continue; }
    if (status !== 503 || attempt === retries || Date.now() + 3000 > deadline) return { status, raw };
    await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/sheet") {
      const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, OPTIONS", "Cache-Control": "no-store" };
      if (request.method === "OPTIONS") return new Response(null, { headers: cors });
      const target = url.searchParams.get("url") || "";
      let t;
      try { t = new URL(target); } catch (e) { return new Response("Bad url", { status: 400, headers: cors }); }
      if (t.hostname !== "docs.google.com" || !t.pathname.startsWith("/spreadsheets/")) {
        return new Response("Only Google Sheets links are allowed", { status: 403, headers: cors });
      }
      try {
        const r = await fetch(t.toString(), { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (VJC ECG site)" } });
        const body = await r.text();
        if (/accounts\.google\.com|<html/i.test(body.slice(0, 600))) {
          return new Response("Sheet is not published publicly", { status: 502, headers: cors });
        }
        return new Response(body, { status: r.status, headers: { ...cors, "Content-Type": "text/csv; charset=utf-8" } });
      } catch (e) {
        return new Response("Upstream error", { status: 502, headers: cors });
      }
    }
    if (url.pathname !== "/api/chat") return env.ASSETS.fetch(request);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" } });
    }

    const key = env.GEMINI_API_KEY;

    if (request.method === "GET") {
      if (url.searchParams.get("popular") && env.APPS_SCRIPT_URL) {
        try {
          const r = await fetch(env.APPS_SCRIPT_URL + "?popular=1", { redirect: "follow" });
          const raw = await r.text();
          let data = null;
          try { data = JSON.parse(raw); } catch {}
          return json({ popular: (data && data.popular) || [] });
        } catch {
          return json({ popular: [] });
        }
      }
      if (env.AI) {
        return json({ ok: true, build: BUILD, mode: "workers-ai", models: WORKERS_AI_MODELS });
      }
      if (env.APPS_SCRIPT_URL) {
        return json({ ok: true, build: BUILD, mode: "apps-script-relay" });
      }
      if (!key) return json({ ok: false, build: BUILD, keyPresent: false });
      const models = await listModels(key);
      return json({ ok: true, build: BUILD, keyPresent: true, chosen: await pickModel(key), models });
    }

    if (request.method !== "POST") return json({ error: "Use POST." }, 405);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON body." }, 400);
    }

    let aiNote = env.AI ? "" : "Workers AI not bound; ";
    // First choice when bound: Cloudflare Workers AI (runs inside Cloudflare, no key, no location block).
    if (env.AI) {
      const { system, messages } = body || {};
      const turns = [];
      for (const m of (Array.isArray(messages) ? messages : []).slice(-8)) {
        const role = m.role === "assistant" ? "assistant" : "user";
        const text = String(m.content ?? "").trim();
        if (!text) continue;
        if (!turns.length && role === "assistant") continue;
        if (turns.length && turns[turns.length - 1].role === role) turns[turns.length - 1].content += "\n\n" + text;
        else turns.push({ role, content: text });
      }
      while (turns.length && turns[turns.length - 1].role !== "user") turns.pop();
      if (!turns.length) return json({ error: "No question found in the message." }, 400);
      const route = pickModels(turns[turns.length - 1].content);
      const tried = [];
      let lastErr = "";
      for (const model of route.models) {
        const sys = String(system || "").slice(0, model === SMALL_MODEL ? SMALL_SYSTEM_CHARS : WORKERS_AI_SYSTEM_CHARS);
        try {
          const out = await env.AI.run(model, {
            messages: [{ role: "system", content: sys }, ...turns],
            max_tokens: 600,
            temperature: 0.3,
          });
          const text = String((out && (out.response ?? out.result?.response)) || "").trim();
          if (text) return json({ text, model, via: "workers-ai", route: route.detailed ? "detailed" : "simple" });
          tried.push(model + ":empty");
        } catch (e) {
          tried.push(model + ":err");
          lastErr = String(e && e.message || e).slice(0, 300);
        }
      }
      aiNote = "Workers AI failed (" + tried.join(", ") + (lastErr ? " - " + lastErr : "") + "); ";
      if (!env.APPS_SCRIPT_URL && !key) {
        return json({ error: aiNote }, 502);
      }
    }

    // Preferred path: relay through a Google Apps Script web app, which runs on
    // Google's own infrastructure (avoids the free tier's datacenter IP block)
    // and holds the API key in its own script properties.
    if (env.APPS_SCRIPT_URL) {
      try {
        const relay = await fetch(env.APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
          redirect: "follow",
        });
        const raw = await relay.text();
        let data = null;
        try { data = JSON.parse(raw); } catch {}
        if (relay.ok && data && data.text) return json({ text: data.text, via: "apps-script" });
        return json(
          {
            error: `Apps Script relay error ${relay.status}`,
            detail: (data && (data.error || data.detail)) || raw.slice(0, 400),
          },
          502
        );
      } catch (e) {
        return json({ error: "Apps Script relay failed: " + String(e) }, 502);
      }
    }

    if (!key) {
      return json({ error: "Set APPS_SCRIPT_URL (recommended) or GEMINI_API_KEY." }, 500);
    }

    const { system, messages } = body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: "No messages supplied." }, 400);
    }

    const payload = {
      contents: (() => {
        const out = [];
        for (const m of messages.slice(-8)) {
          const role = m.role === "assistant" ? "model" : "user";
          const text = String(m.content ?? "").trim();
          if (!text) continue;
          if (!out.length && role === "model") continue;
          if (out.length && out[out.length - 1].role === role) out[out.length - 1].parts[0].text += "\n\n" + text;
          else out.push({ role, parts: [{ text }] });
        }
        while (out.length && out[out.length - 1].role !== "user") out.pop();
        return out;
      })(),
      generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
    };
    if (!payload.contents.length) return json({ error: "No question found in the message." }, 400);
    if (system) payload.systemInstruction = { parts: [{ text: String(system) }] };

    try {
      // Try the cached model first, then walk the candidate list past any
      // model the key isn't permitted to call (403) or that doesn't exist (404).
      const deadline = Date.now() + 27000;
      const list = await candidateOrder(key);
      const order = cachedModel ? [cachedModel, ...list.filter((m) => m !== cachedModel)] : list;

      let model = null;
      let status = 0;
      let raw = "";
      const tried = [];
      let firstDetail = "";

      for (const candidate of order.slice(0, 8)) {
        model = candidate;
        ({ status, raw } = await generate(candidate, key, payload, deadline));
        if (status === 200) {
          cachedModel = candidate;
          break;
        }
        tried.push(`${candidate}:${status}`);
        if (!firstDetail && status !== 404) firstDetail = raw.slice(0, 400);
        if (status !== 400 && status !== 403 && status !== 404 && status !== 429 && status !== 503 && status !== 504) break;
        if (Date.now() + 2500 > deadline) break;
        if (cachedModel === candidate) cachedModel = null;
      }

      if (status !== 200) {
        return json(
          {
            error: aiNote + `Gemini error ${status} (tried ${tried.join(", ")})`,
            detail: firstDetail || raw.slice(0, 400),
          },
          502
        );
      }

      const data = JSON.parse(raw);
      const text = (data?.candidates?.[0]?.content?.parts || [])
        .map((p) => p.text || "")
        .join("")
        .trim();

      if (!text) return json({ error: "Gemini returned no text.", detail: raw.slice(0, 400) }, 502);
      return json({ text, model });
    } catch (e) {
      return json({ error: "Request failed: " + String(e) }, 500);
    }
  },
};
