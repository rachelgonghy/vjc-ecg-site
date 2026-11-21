# ECG @ VJC: redesigned pages

All 33 pages rebuilt as plain HTML, CSS and JavaScript. Same file names as the originals, same
Google Sheets behind them, same Google Sites addresses for links.

## What changed

- **Looks like VJC, reads like an app.** Maroon, gold and cream are kept. Headings are Fraunces
  (a warm serif), body text is Figtree. Long text became timelines, checklists, cards, tabs and
  tap-to-open answers. Real VJC photos (fairs, panels, learning journeys, campus) are used throughout.
- **Faster.** About 14 KB per page instead of about 290 KB, plus one shared stylesheet and script
  (about 28 KB compressed) that the browser keeps between pages. No React or in-browser unpacking.
- **Works on phones.** Checked at 320, 390, 768, 1024, 1280 and 1440 px wide. A bottom tab bar
  (Home, Search, Ask ECG, Book) appears on phones.
- **Search everywhere.** Press `/` (or tap Search) on any page.
- **New interactive pieces.** The homepage shows "What's on this term" for JC1 or JC2 from the ECG
  Calendar sheet. The RP calculator shows the score as you tap and your "biggest boost". Get Started
  has tap-to-reveal myths. The Overseas Education Portal has **My plan**, a checklist that keeps the
  plan students already made in the old portal. Opportunities and fair talks have "Add to Google Calendar".
  The fair has a prep checklist and a colour-coded floor map.
- **Chatbot.** `ecg-chatbot.html` shows the existing chatbot (vjc-ecg-chatbot.pages.dev) inside the
  ECG site, with an "Open in a new tab" fallback. Questions from the homepage are passed on as `?q=`.
  `ecg-chatbot-custom.html` is an unlinked alternative with ECG's own chat design (suggested questions,
  typed-in answers, related ECG pages). It needs the chatbot's API route confirmed before use.

## Publishing

The pages work as they are on GitHub Pages. Two ways to switch over:

1. **Side by side (safest):** keep the old files, publish, then in Google Sites change each embed's
   address from `.../vjc-ecg/<page>.html` to `.../vjc-ecg/redesign/<page>.html`. Swap pages one at
   a time if you like.
2. **Replace:** move everything in `redesign/` to the repository root (overwriting the old pages).
   The Google Sites embeds keep their addresses.

Keep the `assets/` folder next to the pages.

## Editing

- Content on most pages still comes from the same Google Sheets, so update those as before.
- Words on the fixed pages (UK, US, Get Started Here, and so on) are in the `.html` file itself.
  Search for the sentence and edit it.
- Partner organisations for EdVantage! Fair are in `assets/data/partners.json`.
- The design rules and how to add a page are in `DESIGN.md`. Every style is in `assets/ecg.css`;
  the menu, search list, breadcrumbs and footer are built from the list at the top of `assets/ecg.js`.

## Before going live

1. **Chatbot embed.** Check the chatbot shows inside `ecg-chatbot.html`. If it stays blank, the
   chatbot's Cloudflare settings block embedding (`X-Frame-Options` or `frame-ancestors`); allow your
   GitHub Pages address there, or rely on the "Open in a new tab" button.
2. **Links inside Google Sites.** Inside an embed, links to other ECG pages open the Google Sites
   page in a new tab, as before. Opened directly, they go to the sibling file. Change `LINK_TARGET`
   in `assets/ecg.js` to `_top` if your Google Site allows embeds to navigate the whole page.
3. **Student data in a public sheet.** The Talk Allocation sheet is published to the web with every
   student's name and email, so anyone with the link can download it. Consider showing allocations
   by an ID or class instead, or using a form-based lookup.
4. **Sample talks removed.** The old Talk Allocation page showed made-up talks (for example
   "Dr. Evelyn Carter") whenever the sheet failed. The new page says the list didn't load instead.
5. **Sheet loading.** As before, if Google blocks a published sheet, pages retry through the public
   CORS proxies the old site used (allorigins.win, corsproxy.io). Remove them in `ECG.sheet()` in
   `assets/ecg.js` if you'd rather not use third parties.
