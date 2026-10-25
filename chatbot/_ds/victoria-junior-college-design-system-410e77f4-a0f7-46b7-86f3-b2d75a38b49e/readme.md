# Victoria Junior College — Design System

## What this is
A from-scratch design system for **Victoria Junior College (VJC)**, a Singapore pre-university institution ("junior college") under the Ministry of Education, founded 1984, nicknamed "the College by the Sea." Built from the college's real public website content — no Figma file or codebase was attached for this project — so components and UI kit are original constructions styled to the brand, not code ports.

**Source referenced:** [victoriajc.moe.edu.sg](https://www.victoriajc.moe.edu.sg/) (live site, built on Singapore Government's Isomer CMS). Pages read: Home, About Us, The Victorian SEAL. No Figma link, codebase, or slide deck was provided.

**Logo/crest:** VJC has a real college crest (`VJCCrest.png`, hosted at `isomer-user-content.by.gov.sg`). This tool environment cannot download binary images from external URLs, so the crest is **not** included as a file here — and it was never hand-drawn or reconstructed from memory (a real institutional crest must come from the source, not be approximated). Everywhere a mark would appear, this system uses the wordmark "VICTORIA JUNIOR COLLEGE" set in the display serif. **Ask:** upload the crest file (and any other official logo lockups) and it will be dropped into `assets/` and wired into every kit and template.

## Brand context
- **Identity:** students and alumni are called "Victorians." The school's guiding framework is **the Victorian SEAL** — Service at the Heart, Excellence in Co-Curricular Domains, Academic Enrichment & Achievement, Leadership Impact & Influence.
- **Crest colours & symbolism** (from the college's own About Us page): **Yellow** = royalty, dignity, leadership, care for others. **Red** = universal brotherhood and equality. The crest also carries an open book (knowledge, wisdom) and a torch (truth, tradition). This system's palette is built directly from that symbolism plus the user's brief (dark red / maroon / yellow).
- **Products represented here:** one surface — the public **marketing website** (`ui_kits/school-website/`). The real site also has a MOE-standard header (".gov.sg" trust banner) which is specific to Singapore government sites; that banner is omitted here since it's a government-wide fixture, not a VJC brand element.

## Index
- `styles.css` — root stylesheet, imports every token file. Link this one file.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`.
- `guidelines/` — foundation specimen cards (colour, type, spacing, brand marks) shown in the Design System tab.
- `components/core/` — Button, IconButton, Badge, Tag, Card.
- `components/forms/` — Input, Select, Checkbox, Radio, Switch.
- `components/feedback/` — Toast, Tooltip, Dialog.
- `components/navigation/` — Tabs.
- `ui_kits/school-website/` — Home, About & SEAL, Admissions, Happenings (news), Contact.
- `assets/` — icons (Lucide, CDN-substituted — see Iconography). No logo file yet; see Ask above.
- `SKILL.md` — portable skill definition for use in Claude Code.

## Content fundamentals
**Voice:** warm, aspirational, formal-but-personal — institutional pride without corporate stiffness. Copy leans editorial and slightly literary (poetic nicknames like "the College by the Sea," alliterative triads like "conviction, courage and compassion").

**Person:** third person for the institution ("Victorians," "the College"), occasional collective "we" in About/culture copy. Rarely addresses the reader as "you" — this is an institution speaking about itself and its community, not a product pitching a user.

**Casing:** Sentence case for headings and nav labels in body copy; the site's own nav is set in Title Case ("About Us", "The Victorian SEAL"). Programme/initiative names are proper nouns and capitalised consistently (SEAL, CCA, DSA, JAE).

**Tone markers:** values-driven language (excellence, service, leadership, character), acronym-heavy for programmes (SEAL, CCA, ECG, AESOP), light editorializing on achievement ("did us proud"). No slang, no exclamation-heavy hype.

**Emoji:** essentially never in body copy; a single sparkle appeared once in a link teaser on the live site — treat as a rare accent, not a pattern. Default to none.

**Vibe:** heritage and continuity (anthem, crest, "passing the torch") balanced with forward motion ("ignite," "shape the world," "ready for the future"). Copy is proud of tradition but frames it as fuel for what's next, not nostalgia for its own sake.

## Visual foundations
**Colour:** two-colour crest system — deep maroon/red as the dominant institutional colour (headers, primary actions, wordmark), gold/yellow as a disciplined accent (underlines, highlights, small badges, hover glow) — never as a second dominant field. Neutrals are warm cream/ink, not cool grey, so the whole system reads warm rather than corporate. Semantic colours (success/danger/info) are muted and desaturated so they never compete with the brand red.

**Type:** a serif display face (`Source Serif 4`) for headlines and pull quotes carries the "heritage institution" register; a clean grotesque sans (`Work Sans`) handles UI chrome, nav, and body copy for legibility at small sizes. Display type is set tight and large; body copy is generous (1.55–1.7 line-height) for long-form pages like About and Culture of Excellence.

**Spacing:** 4px base scale (4→128), generous section spacing (48–96px) between page blocks — the real site's pages are long and sectioned, not dense.

**Backgrounds:** full-bleed photography for hero banners (campus/student life photos), flat cream/maroon field colour elsewhere. No illustration style, no repeating pattern/texture, no gradients as a decorative device (a single soft gold glow is used only as a focus/hover treatment, never as a background wash).

**Animation:** understated. 120–200ms ease-standard transitions on hover/focus only; no bounce, no entrance choreography. This is an institutional site, not a product — motion should be felt, not seen.

**Hover states:** primary buttons darken (maroon-700→maroon-800); ghost/text buttons and links pick up a gold underline or shift to a darker maroon; cards lift with a slightly larger soft shadow, no scale change.

**Press/active states:** primary buttons go one step darker still (maroon-900), no shrink/scale — a heritage brand keeps its shapes stable.

**Borders:** thin (1px) warm-sand borders on cards/inputs at rest; on focus, replaced by a 3px soft gold ring (`--focus-ring`) rather than a colour-swapped border, echoing the crest's gold.

**Shadows:** soft and warm-tinted (brown-black at low opacity), never pure black or blue-black — `--shadow-sm/md/lg` scale from subtle card lift to modal elevation.

**Corner radii:** moderate, not pill-happy — 8px default control radius, 14px cards, pill only for tags/badges/chips. Reflects an institutional, slightly formal register rather than a soft consumer-app one.

**Cards:** white surface, 1px sand border, `--shadow-sm` at rest, `--shadow-md` on hover, 14px radius, no coloured left-border accent.

**Transparency/blur:** used sparingly — a translucent maroon scrim (not blur) over hero photography to keep overlaid white text legible; no frosted-glass/blur panels elsewhere.

**Imagery colour vibe:** warm, sunlit, naturalistic campus/student photography (not cool-toned, not heavily filtered/grainy) — this system ships no real photos (none were supplied) and uses labelled placeholders (`image-slot`-style) instead.

## Iconography
No icon font, SVG sprite, or icon set was found in the source (a marketing site built on a government CMS, not a component library). **Substituted with [Lucide](https://lucide.dev) via CDN** (`unpkg.com/lucide@latest`) — closest match to the thin, single-weight line icons implied by the site's minimal chrome (search, menu, chevrons, social glyphs). This is a flagged substitution: swap in VJC's own icon set if one exists. Unicode/emoji are not used as icons anywhere in this system.

## Intentional additions
Since no component library or Figma file defines VJC's UI primitives, this system authors a standard baseline set sized to a marketing site's needs: Button, IconButton, Badge, Tag, Card, Input, Select, Checkbox, Radio, Switch, Tabs, Dialog, Toast, Tooltip. None of these replace or contradict a real VJC pattern — they simply didn't exist to begin with.

## Caveats & ask
1. **No logo file** — crest could not be downloaded from the live site by this tool. Upload it and it'll be wired in everywhere a mark appears.
2. **No Figma/codebase** — component sizing, spacing, and interaction details are original, brand-consistent constructions, not ports of real VJC UI (because none exists to port).
3. **Fonts are Google Fonts substitutes** (Source Serif 4 + Work Sans) chosen to match the site's editorial-serif-headline / clean-sans-body feel — no official VJC brand fonts were found. Flag if the college has type guidelines.
4. **Icons are Lucide (CDN)**, a substitution — swap if VJC has its own icon set.
5. **No real photography** — hero/photo slots are placeholders; drop in real campus photos for full fidelity.
