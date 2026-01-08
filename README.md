# codingdavinci.de (static site)

This repository contains the static website served at **codingdavinci.de**.

## Local preview

You can open [index.html](index.html) directly in a browser, but some browsers restrict scripts on `file://` URLs.

Recommended: run a tiny local web server from the repository root:

- Python: `python -m http.server 8000`
- Node: `npx serve .`

Then open `http://localhost:8000/`.

## Structure

- [index.html](index.html) is the entry point.
- [theme/](theme/) contains the Drupal theme assets (CSS/JS/images) that the static page reuses.
- [js/i18n.js](js/i18n.js) provides DE/EN translations using FormatJS.

## Language switch (DE/EN)

Language selection order:

1. URL parameter `?lang=de|en`
2. `localStorage` key `cdv_lang`
3. Browser language
4. Default: `en`

## Email spam protection

The contact email address is not present as a `mailto:` link in the HTML.
It is assembled at runtime by [js/spamspan.js](js/spamspan.js).

## Deployment (GitHub Pages)

Deployment is done via GitHub Actions and publishes the repository root as a GitHub Pages site:

- Workflow: [.github/workflows/pages.yml](.github/workflows/pages.yml)
- Trigger: push to `main` (and manual `workflow_dispatch`)
