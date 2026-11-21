---
name: ECG @ VJC
description: Education & Career Guidance site for Victoria Junior College students, embedded page by page in Google Sites.
colors:
  maroon: "#8C151B"
  maroon-700: "#721017"
  maroon-900: "#2E0507"
  gold: "#D6A017"
  gold-300: "#F3CF63"
  gold-100: "#FCF1CF"
  cream: "#FBF7EF"
  paper: "#FFFDF9"
  sand: "#F3EAD6"
  rose: "#F8E6E2"
  ink: "#241A15"
  ink-2: "#4A3A31"
  muted: "#74635A"
  line: "#E9DEC6"
typography:
  display: { family: Fraunces, weights: [600, 700, 800], axes: { SOFT: 60-100, WONK: "1 only in the home h1" } }
  body: { family: Figtree, weights: [400, 500, 600, 700], size: 17px, line-height: 1.6 }
radius: { sm: 10px, md: 14px, lg: 22px, pill: 999px }
motion: transitions.dev tokens (see assets/ecg.css :root)
---

# ECG @ VJC design system

The site should feel like a friendly app a student would open on their phone, not a policy document.
It keeps VJC's maroon, gold and cream so it reads as the school's own.

## Files

- `assets/ecg.css`: every style. Tokens first, then shell, components, page patterns, home.
- `assets/ecg.js`: the site map, top bar, search (press `/`), breadcrumbs, section chips, jump bar,
  accordions, tabs, pager, help card, footer, phone tab bar, and `ECG.sheet()` for Google Sheets.
- `assets/icons.svg`: Lucide icons (ISC licence). Use `<svg class="icon"><use href="assets/icons.svg#i-NAME"/></svg>`.
  To add an icon, add a `<symbol>` with the icon's paths from lucide.dev.

## A new page

```html
<body data-page="file-name-without-html">
<main id="main">
  <header class="phero"><div class="wrap phero__in"><div data-crumbs></div> <h1>…</h1> <p class="lead">…</p></div></header>
  <nav data-jump></nav>              <!-- optional: builds "On this page" from section ids -->
  <div class="page"><div class="wrap stack"> <section id="…" class="block">…</section> … </div></div>
</main>
```

Add the page to `MAP` at the top of `assets/ecg.js` (file, title, parent, Google Sites path, blurb,
search words, icon). Breadcrumbs, section chips, pager, search and footer then include it.

Link to other pages as `uk.html`. Inside Google Sites the script points them at the Google Sites page
(new tab); opened directly they go to the file.

## Rules

1. **Lead with the answer.** A page opens with what a student needs to do, then the detail.
   Long paragraphs become `.facts`, `.steps`, `.checks`, `.tiles` or FAQ accordions.
2. **One colour job each.** Maroon is for actions and headings' accents. Gold marks "do this now"
   (the main button, checkpoints, the active tab). Cream and paper are grounds. Never violet.
3. **Type.** Fraunces only for headings, numbers and card titles. Figtree for everything else, 17px.
   Sentence case everywhere; eyebrows are the only uppercase.
4. **Components, not one-offs.** Use `.block`, `.tile`, `.step`, `.qa`, `.chip`, `.btn`, `.callout`.
   Avoid inline styles; add a pattern to `ecg.css` if one is missing.
5. **Motion is quiet.** Cards lift 2px, buttons press, accordions grow, tabs slide, the hero enters once.
   Nothing fades in on scroll. Everything rests under `prefers-reduced-motion`.
6. **Tap targets.** Every control outside running text is at least 44px tall.
7. **Copy.** Write to a student ("you"), plainly. Buttons are a verb and a thing ("Book a session").
   Headings name the thing ("What happens, and when"). No "unlock", "elevate", "seamless", "journey".
8. **Data.** Sheets stay the source of truth. Fetch with `ECG.sheet(url)`, show `cached` first, then
   `fresh`; always show a friendly message and a link if a sheet fails.
