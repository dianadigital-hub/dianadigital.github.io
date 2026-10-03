# Design-Definitionen — diana.

Referenz aller Design-Werte, wie sie aktuell im Code verwendet werden (`src/index.css`, `src/App.tsx`, `src/legal.tsx`, `src/PasswordGate.tsx`). Kein separates Design-Tool — die Werte leben direkt in den Tailwind-Klassen bzw. in `index.css`.

## 1. Farben

| Hex | Name (informell) | Verwendung |
|---|---|---|
| `#f6f5ef` | Creme | Haupt-Hintergrund (Leistungen, Über mich, Ladebildschirm, `<main>`) |
| `#12221f` | Tiefschwarz-Grün | `<html>`/`<body>`-Hintergrund, Footer, CMS-Overlay-Hintergrund (`/96` Deckkraft) |
| `#173530` | Markengrün (dunkel) | Header-Text auf hellem Grund, Hero-Hintergrund, Projekte-Sektion, Passwort-Gate-Hintergrund, CMS-Button, Überschriften auf Creme, Ränder |
| `#e9be5b` | Gold | Primärer CTA (`.button-primary`), Qualifikationen-Hintergrund, Tagline/Label auf dunklem Grund, Projekt-Label, Hover-Akzente |
| `#c85d35` | Terrakotta | Kontakt-Sektion-Hintergrund, Akzent-Labels (Leistungen, Über mich), Porträt-Rahmen, mobiles Menü „Kontakt“ |
| `#dce8dc` | Salbei hell | Philosophie-Hintergrund, Porträt-Platzhalter-Hintergrund |
| `#315448` | Salbei dunkel | Fließtext in der Philosophie-Sektion |
| `#527267` | Gedämpftes Grün | Labels/Subheadlines (Ladebildschirm, Philosophie-Label, Rolle unter Porträt, Legal „Zurück“) |
| `#5c6962` | Grau-Grün | Fließtext auf Creme (Leistungen-Subheadline/-Beschreibung, Über-mich-Absätze) |
| `#a9c6b0` | Hellgrün | Projekt-Label-Text auf dunklem Grund |
| `#a9b9b0` | Helles Grau-Grün | CMS-Editor Feldbeschriftungen |
| `#e9e6da` | Warmes Hellgrau | CMS-Editor Feldbeschriftungen (Variante) |
| `#fffaf0` | Warmweiß | Text auf dunklem/terrakotta Grund (Kontakt-Sektion, CMS-Überschriften) |
| `#3e492f` | Dunkles Olive | Fließtext in Qualifikationen |
| `#725528` | Braun | Label in Qualifikationen |
| `#ffe0a0` | Helles Gold | Label in Kontakt-Sektion |
| `#3e4a44` | Dunkles Grau-Grün | Fließtext in Datenschutz/Impressum-Overlay |
| `#b8d0bd` (65%) | Salbei, gedämpft | Dekoratives Anführungszeichen (Philosophie) |

Ergänzend: `white`/`black` in diversen Deckkraftstufen (`/20`, `/35`, `/55`, `/65`, `/72`, `/75`, `/80`) für Rahmen, sekundären Text und Overlays auf farbigen Flächen.

## 2. Typografie

**Schriften** (Google Fonts, in `index.css` importiert):

- `--font-serif`: „Playfair Display“ (500, 600, 700, Italic 500) · Fallback `Georgia, serif` — Überschriften, Marke, Zitate
- `--font-sans`: „DM Sans“ (400, 500, 600, 700) · Fallback `Arial, sans-serif` — Fließtext, Labels, Buttons, Formulare (Standard-Bodyfont)

**Größen-Skala** (alle Headlines nutzen `clamp()` für fließende Responsivität):

| Element | `clamp()` | Line-Height | Tracking |
|---|---|---|---|
| Hero-Marke „diana.“ (h1) | `5.7rem, 17vw, 15rem` | 0.67 | -0.095em |
| Hero-Headline | `1.45rem, 3vw, 2.65rem` | 1.08 | -0.045em |
| Section-H2 (Leistungen/Projekte) | `2.7rem, 5.8vw, 5.8rem` | 0.93 | -0.065em |
| Kontakt-H2 | `2.8rem, 5.3vw, 5.4rem` | 0.93 | -0.065em |
| Über-mich-H2 | `2.5rem, 5.15vw, 5.25rem` | 0.95 | -0.067em |
| Qualifikationen-H2 | `2.6rem, 4.3vw, 4.4rem` | 0.94 | -0.06em |
| Philosophie-Zitat | `2.15rem, 4.6vw, 4.55rem` | 1.02 | -0.055em |
| Über-mich-Zitat | `1.85rem, 3.7vw, 3.65rem` | 1.05 | -0.055em |
| Leistung-H3 | `1.8rem, 3.2vw, 3rem` | 1 | -0.055em |
| Projekt-H3 | `1.8rem, 3.4vw, 3.2rem` | 0.98 | -0.055em |
| Fokus-H3 | `1.9rem, 3.5vw, 3.2rem` | 1.02 | -0.055em |
| Qualifikation-Item-Titel | `1.35rem` (fix) | 1.5rem | -0.035em |
| Legal-Overlay-Titel | `text-4xl`/`sm:text-5xl` | — | -0.05em |

**Eyebrow/Label-Stil** (wiederkehrendes Muster über alle Sektionen): `uppercase`, `font-semibold`, Größe `0.64–0.7rem`, Tracking `0.14–0.24em`.

## 3. Layout & Spacing

- **Container-Breiten**: `max-w-[1440px]` (Header, Footer, Hero) · `max-w-[1280px]` (Leistungen, Projekte, Qualifikationen, Über mich, Kontakt) · `max-w-[1120px]` (Philosophie) · `max-w-3xl` (CMS- und Legal-Overlay)
- **Section-Padding**: horizontal `px-5 sm:px-8 lg:px-12`, vertikal `py-24 sm:py-32 lg:py-40` (Qualifikationen: `lg:py-36`)
- **Breakpoints** (Tailwind-Standard, kein `md:` im Einsatz): `sm` = 640px, `lg` = 1024px

## 4. Buttons

```css
.button-primary, .button-quiet {
  display: inline-flex; align-items: center; gap: 0.75rem;
  min-height: 46px; padding: 0.7rem 1rem;
  font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  transition: color 300ms, background-color 300ms, border-color 300ms, transform 300ms;
}
```

- **`.button-primary`**: Gold-Hintergrund `#e9be5b`, Text `#173530`, Rand `#e9be5b`. Hover: Hintergrund `#f6f5ef`, `translateY(-2px)`.
- **`.button-quiet`**: transparent, weißer Rand (55%), weißer Text. Hover: weißer Hintergrund, Text `#173530`.

## 5. Animationen

| Klasse | Dauer / Easing | Effekt |
|---|---|---|
| `.reveal` | 700ms `cubic-bezier(0.16,1,0.3,1)` | Scroll-getriggert (IntersectionObserver, threshold 0.14): `opacity 0→1`, `translateY 28px→0` |
| `.hero-reveal` | 850ms `cubic-bezier(0.16,1,0.3,1)` | Beim Laden, gestaffelt über `nth-child` (120/190/290/390/480ms) |
| `.hero-image` (`hero-scale`) | 1.8s `cubic-bezier(0.16,1,0.3,1)` | `scale(1.06)→scale(1)` |
| `.portrait-img` (`portrait-in`) | 1.8s `cubic-bezier(0.16,1,0.3,1)` | `scale(1.08)→scale(1)` |
| `.portrait-stage::after` (Rahmen) | 450ms `cubic-bezier(0.16,1,0.3,1)` | Versatz-Rahmen rückt bei Hover von `16px` auf `8px` |
| `.nav-link::after` (Unterstrich) | 280ms ease | `scaleX` Underline-Hover |

`prefers-reduced-motion: reduce` setzt alle Animations-/Transition-Dauern auf `0.01ms` und zeigt `.reveal`-Inhalte sofort.

## 6. Z-Index-Ebenen

| Ebene | z-Index | Element |
|---|---|---|
| 1 (oberste) | `z-[70]` | `DraftBanner` (Entwurfs-Hinweis, fixiert oben) |
| 2 | `z-[60]` | CMS-Toggle-Button, Mobile-Menü-Button |
| 3 | `z-[58]` | `LegalOverlay` (Datenschutz/Impressum) |
| 4 | `z-[55]` | CMS-/Admin-Overlay |
| 5 | `z-50` | Header (fixiert, `top-8` wegen `DraftBanner`) |
| 6 | `z-40` | Mobile-Menü (Vollbild) |

## 7. Komponenten-Inventar

- **`PasswordGate` / `usePasswordGate` / `DraftBanner`** (`PasswordGate.tsx`) — clientseitiges Zugangs-Gate + permanenter Entwurfs-Banner
- **`LegalOverlay` / `Blocks` / `Paragraph`** (`legal.tsx`) — Datenschutz- und Impressum-Seiten als Vollbild-Overlay, inkl. gelber Platzhalter-Markierung (`<mark>`) für unausgefüllte Felder
- **`Reveal`** — Wrapper-Komponente für scroll-getriggerte Einblendung (IntersectionObserver)
- **`ArrowUpRight` / `ArrowDown`** — Inline-SVG-Icons, `stroke`-basiert, `currentColor`
- **Header** — fixiert, transparent über Hero, wird bei `scrollY > 24` zu Creme mit Blur und Bottom-Border
- **Mobile-Menü** — Vollbild-Overlay, Links staggered eingeblendet (`100 + i*70ms`)
- **CMS-/Admin-Overlay** — einfacher Inhalts-Editor (Text ändern → JSON herunterladen → manuell in `public/content/data.json` einfügen), erreichbar über Button unten rechts und Footer-Link
- **Sections** (in Reihenfolge): Hero → Philosophie (`#haltung`) → Leistungen (`#leistungen`) → Projekte (`#projekte`) → Qualifikationen → Über mich (`#ueber-mich`) → Kontakt (`#kontakt`) → Footer

## 8. Bild-Assets

| Datei | Maße | Format | Verwendung |
|---|---|---|---|
| `public/images/hero.png` | 1672×941 | PNG | Hero-Hintergrund (`object-cover object-[60%_center]`) |
| `public/images/portrait.jpg` | 441×407 | JPEG, **baseline** (bewusst nicht progressive, für maximale Kompatibilität) | Porträt in „Über mich“ (`aspect-[4/5]`) |

## 9. Content-Modell

Alle Textinhalte kommen aus `public/content/data.json` (Typ `Content` in `App.tsx`): `meta`, `hero`, `philosophy`, `services` (3 Items + `focus`), `projects` (Items mit optionalem `href`/`linkLabel` für externe Verlinkung), `qualifications` (Titel/Text-Paare), `about`, `contact`. Rechtstexte (Datenschutz/Impressum) sind bewusst **nicht** darüber steuerbar, sondern fest in `legal.tsx` codiert.
