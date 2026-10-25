/**
 * ECG@VJC Chatbot — API proxy (Google Apps Script)
 *
 * Keeps your Gemini API key server-side so it never appears in the webpage.
 *
 * SETUP
 * 1. Go to script.google.com → New project. Name it "ECG VJC Chatbot API".
 * 2. Delete the sample code, paste this whole file in, and save.
 * 3. Left sidebar → Project Settings (gear icon) → Script Properties →
 *    Add script property:
 *       Property: GEMINI_API_KEY
 *       Value:    <paste your Gemini key>
 *    Save.
 * 4. Top right → Deploy → New deployment → gear icon → Web app.
 *       Description: v1
 *       Execute as:  Me
 *       Who has access: Anyone
 *    → Deploy → Authorize access (approve the permission prompt).
 * 5. Copy the Web app URL. It looks like:
 *       https://script.google.com/macros/s/AKfy..../exec
 *    Send that URL back and it gets wired into the chatbot page.
 *
 * NOTE: after any code change you must Deploy → Manage deployments →
 * edit → Version: New version → Deploy, or the live URL keeps serving the old code.
 */

var MODELS = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-3.5-flash', 'gemini-3-flash-preview'];
var VERSIONS = ['v1beta'];

function getLogSheet() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('LOG_SHEET_ID');
  var ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.create('ECG VJC Chatbot — Question Log');
  if (!id) props.setProperty('LOG_SHEET_ID', ss.getId());
  var sheet = ss.getSheetByName('Questions') || ss.insertSheet('Questions');
  if (sheet.getLastRow() === 0) sheet.appendRow(['timestamp', 'question']);
  return sheet;
}

function logQuestion(question) {
  try {
    if (!question) return;
    getLogSheet().appendRow([new Date().toISOString(), String(question).slice(0, 500)]);
  } catch (e) {
    // Logging must never break the chat response.
  }
}

function doPost(e) {
  try {
    var key = PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!key) return reply({ error: 'Script property GEMINI_API_KEY is not set.' });

    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var messages = body.messages;
    if (!messages || !messages.length) return reply({ error: 'No messages supplied.' });

    var lastUser = null;
    for (var li = messages.length - 1; li >= 0; li--) {
      if (messages[li].role !== 'assistant') { lastUser = messages[li].content; break; }
    }
    logQuestion(lastUser);

    var contents = [];
    messages.slice(-8).forEach(function (m) {
      var role = m.role === 'assistant' ? 'model' : 'user';
      var text = String(m.content == null ? '' : m.content).trim();
      if (!text) return;
      if (!contents.length && role === 'model') return;
      if (contents.length && contents[contents.length - 1].role === role) contents[contents.length - 1].parts[0].text += '\n\n' + text;
      else contents.push({ role: role, parts: [{ text: text }] });
    });
    while (contents.length && contents[contents.length - 1].role !== 'user') contents.pop();
    if (!contents.length) return reply({ error: 'No question found.' });

    var payload = {
      contents: contents,
      generationConfig: { temperature: 0.3, maxOutputTokens: 2048 }
    };
    if (body.system) payload.systemInstruction = { parts: [{ text: String(body.system) }] };

    var code = 0;
    var raw = '';
    var tried = [];
    var firstDetail = '';

    // Single pass, one attempt per model, no sleeps — Cloudflare's relay call
    // times out around 100s, so this must resolve fast even in the worst case.
    outer:
    for (var v = 0; v < VERSIONS.length; v++) {
      for (var i = 0; i < MODELS.length; i++) {
        var res = UrlFetchApp.fetch(
          'https://generativelanguage.googleapis.com/' + VERSIONS[v] + '/models/' + MODELS[i] +
            ':generateContent?key=' + encodeURIComponent(key),
          {
            method: 'post',
            contentType: 'application/json',
            payload: JSON.stringify(payload),
            muteHttpExceptions: true
          }
        );
        code = res.getResponseCode();
        raw = res.getContentText();
        if (code === 200) break outer;
        tried.push(VERSIONS[v] + '/' + MODELS[i] + ':' + code);
        if (!firstDetail) firstDetail = raw.slice(0, 300);
        if (code !== 400 && code !== 403 && code !== 404 && code !== 429 && code !== 503) break outer;
      }
    }

    if (code !== 200) {
      return reply({
        error: 'Upstream error (tried ' + tried.join(', ') + ')',
        detail: 'first: ' + firstDetail + ' || last: ' + raw.slice(0, 300)
      });
    }

    var data = JSON.parse(raw);
    var parts =
      data && data.candidates && data.candidates[0] && data.candidates[0].content
        ? data.candidates[0].content.parts || []
        : [];
    var text = parts
      .map(function (p) { return p.text || ''; })
      .join('')
      .trim();

    return reply({ text: text });
  } catch (err) {
    return reply({ error: 'Request failed: ' + err });
  }
}

function doGet(e) {
  var wantsPopular = e && e.parameter && e.parameter.popular;
  if (!wantsPopular) {
    return reply({ ok: true, note: 'ECG@VJC chatbot API is running. Send a POST request.' });
  }
  try {
    var sheet = getLogSheet();
    var rows = sheet.getLastRow() > 1 ? sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues() : [];
    var counts = {};
    rows.forEach(function (r) {
      var q = String(r[0] || '').trim();
      if (!q) return;
      var key = q.toLowerCase();
      if (!counts[key]) counts[key] = { text: q, count: 0 };
      counts[key].count++;
    });
    var top = Object.keys(counts)
      .map(function (k) { return counts[k]; })
      .filter(function (c) { return c.count > 1; })
      .sort(function (a, b) { return b.count - a.count; })
      .slice(0, 6)
      .map(function (c) { return c.text; });
    return reply({ ok: true, popular: top });
  } catch (err) {
    return reply({ ok: true, popular: [] });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
