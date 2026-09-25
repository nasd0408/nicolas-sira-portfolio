# Nicolás Sira — Portfolio

Personal portfolio of **Nicolás Sira**, backend developer focused on C#/.NET, SQL Server and PostgreSQL, with Angular and React experience alongside financial software and multi-tenant products.

**Live:** https://nasd0408.github.io/nicolas-sira-portfolio/

A static, dependency-free single-page site — no framework, no build step. Just HTML, CSS and vanilla JavaScript.

## Highlights

- **Bilingual** — English / Spanish toggle with `localStorage` persistence and browser-language detection.
- **Original visual identity** — the original palette, typography, hero orbits and product layouts.
- **Progressive images** — embedded low-resolution previews and responsive WebP images that fade in after decoding.
- **Motion** — the product scroll sequence, a progressive architecture diagram, a drawn experience timeline and interactive skill lighting. Reduced-motion and short-screen fallbacks keep content accessible. Scrolling itself stays native.
- **Deferred video** — product imagery is responsive and deferred until needed.
- **No build dependencies** — deploy the folder as-is. Typography uses Google Fonts with local font fallbacks.
- **SEO-ready** — Open Graph + Twitter cards, `Person` JSON-LD structured data, `sitemap.xml` and `robots.txt`.
- **Accessible** — skip link, semantic landmarks, `aria` states and keyboard focus styles.

## Tech stack

`HTML` · `CSS` · `Vanilla JavaScript` — plus the stack showcased in the work itself: C#/.NET, PostgreSQL, SQL Server, Angular and React.

## Project structure

```
.
├── index.html          # Content, structure and meta/SEO
├── styles.css          # Visual system and responsive layout
├── enhancements.css    # Progressive images, gallery and motion fallbacks
├── enhancements.js     # Image decode transitions and accessible gallery controls
├── script.js           # i18n dictionary + interactions
├── 404.html            # Branded not-found page
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── assets/             # Screenshots, logos, background video and OG image
└── .github/workflows/  # GitHub Pages deployment
```

## Run locally

No build step. Either open `index.html` directly, or serve the folder:

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

## Editing

| What                                   | Where         |
| -------------------------------------- | ------------- |
| Content and links                      | `index.html`  |
| English/Spanish copy and interactions  | `script.js`   |
| Visual system and responsive layout    | `styles.css`, `enhancements.css` |
| Product images                         | `assets/`     |
| Section background videos              | `assets/`     |

> The English/Spanish copy lives in the `translations` object in `script.js`, keyed by the `data-i18n` attributes in `index.html`. Update both sides when adding text.

## Deployment

Pushes to `main` deploy automatically to **GitHub Pages** via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The site is also drag-and-drop deployable to Netlify Drop — `index.html` is at the root, so no build command or publish directory is required.

## License

© Nicolás Sira. All rights reserved.
