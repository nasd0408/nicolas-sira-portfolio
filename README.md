# Nicolás Sira — Portfolio

Personal portfolio of **Nicolás Sira**, full-stack engineer building operational software, multi-tenant products and reliable digital systems.

**Live:** https://nasd0408.github.io/nicolas-sira-portfolio/

A static, dependency-free single-page site — no framework, no build step. Just HTML, CSS and vanilla JavaScript.

## Highlights

- **Bilingual** — English / Spanish toggle with `localStorage` persistence and browser-language detection.
- **Motion, done right** — scroll-driven horizontal case studies, an animated hero orbit, reveal-on-scroll, and a custom cursor. All gated behind `prefers-reduced-motion`.
- **Zero dependencies** — everything runs from three files; deploy the folder as-is.
- **SEO-ready** — Open Graph + Twitter cards, `Person` JSON-LD structured data, `sitemap.xml` and `robots.txt`.
- **Accessible** — skip link, semantic landmarks, `aria` states and keyboard focus styles.

## Tech stack

`HTML` · `CSS` · `Vanilla JavaScript` — plus the stack showcased in the work itself: React, .NET, Angular, TypeScript, React Native and PostgreSQL / SQL Server.

## Project structure

```
.
├── index.html          # Content, structure and meta/SEO
├── styles.css          # Visual system and responsive layout
├── script.js           # i18n dictionary + interactions
├── 404.html            # Branded not-found page
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── assets/             # Product screenshots, logos and OG image
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
| Visual system and responsive layout    | `styles.css`  |
| Product images                         | `assets/`     |

> The English/Spanish copy lives in the `translations` object in `script.js`, keyed by the `data-i18n` attributes in `index.html`. Update both sides when adding text.

## Deployment

Pushes to `main` deploy automatically to **GitHub Pages** via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The site is also drag-and-drop deployable to Netlify Drop — `index.html` is at the root, so no build command or publish directory is required.

## License

© Nicolás Sira. All rights reserved.
