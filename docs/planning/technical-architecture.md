# Technical architecture recommendation

Status: Recommended baseline  
Date: 2026-09-28

## Decision summary

Build the replacement as a statically generated **Astro + TypeScript** site using typed local Markdown content collections, build-time image processing, and minimal client-side JavaScript. Add **Pagefind** after the static build for document/site search. Deploy the first production release to **Netlify** while keeping the existing external DNS provider and mail records in place.

This is intentionally a boring operational architecture: content is versioned with the code, every public page exists as HTML, there is no production database for normal publishing, and the live site can be rebuilt from the repository.

## Why Astro

The project is content-heavy rather than application-heavy. Its primary technical needs are structured Markdown, reusable editorial components, static HTML, image optimization, accessible progressive enhancement, and selective interactivity for search, filtering, and click-to-load video.

Astro fits those needs directly:

- static generation is the default;
- content collections provide schemas, TypeScript safety, validation, querying, and build-time page generation;
- Markdown and MDX are supported without turning the whole site into a client-side application;
- local images can be optimized and transformed at build time;
- client JavaScript is opt-in rather than the baseline;
- interactive components can be added later without replatforming the content.

Official references:

- https://docs.astro.build/en/concepts/why-astro/
- https://docs.astro.build/en/guides/content-collections/
- https://docs.astro.build/en/guides/images/
- https://docs.astro.build/en/guides/integrations-guide/sitemap/

## Alternatives considered

| Option | Strengths | Why it is not the baseline |
| --- | --- | --- |
| Astro | Typed content collections, static by default, component model, build-time images, low-JS architecture | Best match. |
| Hugo | Extremely fast builds, mature Markdown/content model, excellent static output | Go templates and content conventions add friction for the expected TypeScript/LLM-assisted maintenance; richer interactive components require a second frontend pattern. |
| Next.js static export | Large ecosystem and familiar React component model | More framework surface than this site needs; static export has feature restrictions and needs extra image-loader decisions. It makes it easier to accidentally ship unnecessary client JavaScript. |
| Continue WordPress | Familiar editor and existing integrations | Retains the page-builder/plugin/server maintenance and performance problems the project is intended to remove. |

Hugo remains a defensible fallback if the team later prioritises build speed and zero Node-based framework code above the component/content-schema advantages.

## Content architecture

Use Astro build-time collections with Zod schemas. Proposed source layout:

```text
src/
  assets/
    brand/
    images/
  components/
  content/
    campaigns/
    media/
    pages/
    partners/
    resources/
    work/
  layouts/
  pages/
  styles/
public/
  documents/
  wp-content/uploads/
```

### Collection responsibilities

- `resources`: reports, submissions, databases, explainers, handbooks, and external research.
- `work`: dated organisational activity and outcomes that may link to one or more resources.
- `campaigns`: longer-lived initiatives with status, goals, updates, resources, and actions.
- `media`: external coverage, interviews, audio, and webinars.
- `partners`: organisations and institutions, including logo and canonical URL.
- `pages`: stable editorial pages such as About, Contact, and Get Involved.

Prefer Markdown for prose and YAML front matter for structured fields. Use MDX only where a page genuinely requires a controlled interactive or visual component; ordinary content should not contain arbitrary code.

### Content validation

The build must fail when required content metadata is missing or invalid. Resource schemas should validate dates, titles, types, summaries, source URLs, local files, topics, and image alternative text. This turns content quality problems into visible build errors instead of silent production inconsistencies.

## Assets and URL preservation

### Images

- Store actively used editorial images under `src/assets` so Astro can generate responsive dimensions and modern formats.
- Keep original source files in a non-public archival backup outside Git where licensing or size makes repository storage inappropriate.
- Require reviewed alternative text for every meaningful image and an explicit empty alt value for decorative images.

### Documents

- Store public PDFs and similar downloads under `public/documents` using human-readable canonical paths.
- Initially preserve the legacy `/wp-content/uploads/YYYY/MM/...` files or redirect every known legacy asset URL to its new canonical document.
- Preserve original filenames when they are already widely linked; improve the surrounding metadata and download label instead of breaking the file URL.
- Verify actual file sizes from the hosting backup. Public REST metadata contains missing size values for many older files and is not a complete storage report.

### Migration-first asset policy

Copy first, prune second. The first migration snapshot should retain all original uploads and generated derivatives until the link audit and editorial classification are complete. Unused Divi demo assets and duplicate uploads can be removed from the production build after their references have been disproved, while remaining available in the private archive.

## Search

Use **Pagefind** as a post-build static search index:

- no search server or hosted search account;
- generated from the final HTML after every build;
- JavaScript and index chunks load only when search is used;
- supports a custom accessible search interface and metadata-based filtering.

Search should index editorial content and resource metadata, not global navigation/footer repetition. Resource filtering by type, topic, year, and campaign can use a small progressively enhanced index derived from the same collections.

Official reference: https://pagefind.app/docs/

## Styling and frontend behavior

- Use modern vanilla CSS with custom properties, cascade layers, logical properties, container queries, and a documented token system.
- Avoid a runtime CSS-in-JS dependency and avoid introducing a component framework globally.
- Use Astro components for server/build-time composition.
- Add small framework-free scripts only for behavior that native HTML cannot express well.
- Use native elements for disclosure, forms, navigation, and media controls wherever practical.
- Self-host the final licensed fonts and aggressively subset weights/character sets, or use system fallbacks until the final typography decision is verified.

## Performance budgets

Treat these as build-review budgets, not marketing claims:

- useful HTML without JavaScript on every normal page;
- no site-wide client framework bundle;
- no eager YouTube iframes;
- no more than two font families and only the weights actually used;
- responsive images with explicit dimensions;
- ordinary editorial pages should require little or no first-party JavaScript;
- search code loads on interaction or only on the search/library page;
- third-party analytics and embeds are isolated, delayed, and reviewed for privacy and performance.

Run Lighthouse and real-device checks during implementation, but prioritise field behavior on average Android/mobile connections over a single lab score.

## Hosting recommendation

### Initial production: Netlify static hosting

Reasons:

- recognises Astro's standard `astro build` → `dist` deployment;
- Git-based preview deployments support fast review with Anna before merging;
- external DNS can remain at the current provider;
- the apex domain can be pointed to Netlify with a web A/ALIAS record while mail records remain unchanged;
- redirects and security headers can live in version-controlled `netlify.toml` or `_redirects`/`_headers` files;
- rollback is deployment-based rather than server restoration.

Official references:

- https://docs.netlify.com/frameworks/
- https://docs.netlify.com/manage/domains/get-started-with-domains/
- https://docs.netlify.com/manage/routing/redirects/overview/
- https://docs.netlify.com/build/configure-builds/file-based-configuration/

### Alternative: Cloudflare Workers static assets

Cloudflare is a good later option if the organisation wants to move authoritative DNS to Cloudflare and use Workers for future backend functions. Cloudflare now recommends Workers for new application/static-asset projects over Pages. That migration broadens the initial DNS and platform change, so it is not the fastest low-risk cutover while email records are already active elsewhere.

Official references:

- https://developers.cloudflare.com/workers/static-assets/
- https://developers.cloudflare.com/pages/

### Current DNS evidence

At discovery time:

- authoritative nameservers: `host-h.net` / `dns-h.com` family;
- apex and `www` resolve to `197.221.14.16`;
- mail and SPF records are present.

Only the web records should change at launch. Export the complete DNS zone before editing anything. Do not infer the full mail configuration from public DNS queries alone.

## Functional integrations

### Incident reporting

Do not copy or redesign the live form until its data handling is understood. During staging, link to the existing live form. Before production cutover, choose one of:

1. keep WordPress available temporarily on a dedicated legacy origin/subdomain with its URLs and assets corrected;
2. proxy only the legacy form route to the old origin through a controlled edge rule;
3. replace it with an approved new secure workflow.

Option 3 is the preferred end state, but it requires the operational and privacy decisions documented in the design brief. A bridge must have an owner and removal date.

### Donations

Preserve the current PayFast/EFT/ThrivePay journey during phase one. Rebuild the surrounding content page and handoff only after account ownership, recurring-payment behavior, return URLs, and reconciliation are verified.

### Analytics

Preserve access to the existing GA4 property and measurement history. Do not automatically copy the current script into the new site; first confirm consent/privacy expectations, required events, and whether a lighter analytics setup would still meet organisational needs.

## Quality gates

Every production build should include:

- Astro/TypeScript validation;
- content schema validation;
- internal link and referenced-file checks;
- duplicate canonical URL detection;
- accessibility checks on representative templates;
- production build and Pagefind indexing;
- redirect-map validation;
- sitemap/robots verification;
- visual checks at narrow mobile, typical laptop, and large desktop widths;
- smoke tests for downloads, external handoffs, the incident bridge, donation journey, and contact paths.

## Deferred complexity

Do not add a headless CMS, production database, authenticated dashboard, server-rendered frontend, or custom payment/form backend until a demonstrated workflow requires it. Astro content collections allow those sources to be introduced later without discarding the public templates.

