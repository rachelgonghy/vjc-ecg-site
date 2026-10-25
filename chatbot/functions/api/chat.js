// Cloudflare Pages Function — serves POST /api/chat
// Set GEMINI_API_KEY in: Cloudflare dashboard → your Pages project →
// Settings → Environment variables → Production.
export async function onRequestPost(context) {
  const json = (obj, status = 200) =>
    new Response(JSON.stringify(obj), {
      status,
      headers: { "content-type": "application/json" },
    });

  const key = context.env.GEMINI_API_KEY;
  if (!key) return json({ error: "Server is missing GEMINI_API_KEY." }, 500);

  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const { system, messages } = body || {};
  if (!Array.isArray(messages) || !messages.length) {
    return json({ error: "No messages supplied." }, 400);
  }

  const payload = {
    contents: messages.slice(-20).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content ?? "") }],
    })),
    generationConfig: { temperature: 0.3, maxOutputTokens: 800 },
  };
  if (system) payload.systemInstruction = { parts: [{ text: String(system) }] };

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
    encodeURIComponent(key);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text();
      return json({ error: "Upstream error " + res.status, detail: detail.slice(0, 500) }, 502);
    }

    const data = await res.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join("") || "";
    return json({ text });
  } catch (e) {
    return json({ error: "Request failed: " + String(e) }, 500);
  }
}
