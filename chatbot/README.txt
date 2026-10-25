EASIEST SETUP: CLOUDFLARE WORKERS AI (no Google key, no location block)
1. Cloudflare -> Workers & Pages -> vjc-ecg-chatbot -> Settings -> Bindings
   -> Add -> Workers AI. Variable name: AI  (capital A, capital I). Save.
2. Upload this folder again (Create deployment) so the new _worker.js is live.
3. Open /api/chat - it should show "mode": "workers-ai".
If Workers AI fails, the chatbot automatically falls back to Gemini / Apps Script.

IF THE CHATBOT SAYS "User location is not supported"
Google blocks Gemini calls from some Cloudflare server locations. Fix it by
routing through Google Apps Script, which runs on Google's own servers:
1. Open apps-script/Code.gs in this folder and follow the SETUP steps at the top.
2. Copy the Web app URL (https://script.google.com/macros/s/.../exec).
3. Cloudflare -> vjc-ecg-chatbot -> Settings -> Variables and Secrets ->
   add APPS_SCRIPT_URL = that URL. Redeploy.
4. /api/chat should then show "mode": "apps-script-relay".

ECG Chatbot - Cloudflare Pages deploy folder

1. Upload the CONTENTS of this folder (not the folder itself) to your Cloudflare Pages project.
   _worker.js must sit next to index.html at the top level.
2. Cloudflare > your Pages project > Settings > Variables and Secrets > add:
   GEMINI_API_KEY = your key from aistudio.google.com/apikey (Secret, Production)
3. Redeploy (Deployments > Retry deployment) so the key takes effect.
4. Open the site and ask a question.

Error guide (shown in the chat as [diagnostic: ...]):
- HTTP 405: _worker.js is missing or not at the top level.
- 403 PERMISSION_DENIED: the Google project behind the key is blocked. Use a key from a personal Google account.
- 503 / high demand: Gemini is busy. The worker already retries other models; wait and try again.

The page reads the latest content from your Google Sheets each time it opens (cached 30 minutes), so you only need to redeploy when the page design changes, not when sheet content changes.
