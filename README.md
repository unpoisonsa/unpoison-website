# UnPoison website

A fast, accessible, content-led replacement for the current WordPress site.

## Local development

```sh
npm install
npm run dev
```

## Quality checks

```sh
npm run check
npm run build
npm run verify
```

The production build generates static HTML with Astro, then creates a Pagefind search index in `dist/`.
`npm run verify` also checks every generated internal link.

## Publishing content

Resources live in `src/content/resources/` as Markdown with validated front matter. Copy an existing file, update its metadata and prose, then run the quality checks before publishing.

The current resource files intentionally point to original documents on the WordPress host. They will be switched to local canonical files after the complete media archive and link inventory are available.
