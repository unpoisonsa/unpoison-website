# UnPoison current-site discovery audit

Snapshot date: 2026-09-28  
Public site: https://unpoison.org/

This is a factual discovery snapshot, not a final information architecture, visual design, or technology recommendation.

## Executive summary

The current site is a WordPress/Divi site whose homepage carries most of the organisation's story, advocacy timeline, media coverage, webinars, member logos, resources, and contextual education in one long document. The core public journeys are:

1. Understand UnPoison's purpose and evidence.
2. Read and download policy submissions, reports, databases, and public resources.
3. Follow active campaigns such as Pesticide-Free Cape Town.
4. Report a spraying or poisoning incident.
5. Donate or offer support.
6. Contact the organisation.

The strongest opportunity is not simply a visual redesign. It is to separate a large mixed homepage into a small number of durable content types and user journeys, while protecting document URLs, search equity, form data, analytics history, and payment integrations.

## Public technology footprint

- WordPress 6.9.9.
- Divi theme 4.14.7 and Divi-generated per-page CSS.
- Divi 100 Article Card extension.
- WPForms on the incident-reporting page.
- All in One SEO 4.9.5.1.
- MonsterInsights / Google Analytics with measurement ID `G-X6RM1QK6ER`.
- PayFast hosted checkout form for once-off donations.
- A legacy debit-order page linking to ThrivePay.
- Apache origin server.
- Home page HTML is approximately 306 KB uncompressed and 45 KB over a compressed transfer in the sampled request, before images, fonts, CSS, JavaScript, and embedded media.
- The sampled home page exposed 12 font resources, 21 image resources, 12 scripts, 4 stylesheets, and 14 YouTube embeds/iframes.
- A sampled public request had roughly 6 seconds to first byte. Browser and crawler requests also intermittently timed out or returned rate limits, so performance should be re-measured from several regions before setting a formal baseline.

## Public content inventory

The public WordPress REST API reports:

- 14 pages.
- 1 conventional post in the sitemap.
- 214 media-library items.
- 170 images: 74 JPEG, 95 PNG, 1 WebP.
- 43 PDFs.
- 1 DOCX file.
- 168 of the 170 media-library images have no saved alternative text. Inline/page-specific alternative text may differ, but the library metadata needs an accessibility pass.

### Pages

| Path | WordPress title | Notes |
| --- | --- | --- |
| `/` | Home | Primary long-form site; updated 2026-09-09. |
| `/our-work/` | Our Work | Older structured list of submissions and reports; overlaps the home timeline. |
| `/monthly-donations/` | Monthly Donations | Contains EFT details and a PayFast once-off form; the navigation uses this page. |
| `/debit-order/` | Debit Order | Links to ThrivePay; not present in the primary navigation. |
| `/poison-free-city/` | Pesticide-Free City | Active Cape Town campaign, FAQ, resources, and participation CTAs. |
| `/animals/` | Animals | Newer campaign/resource page; not present in the primary navigation. |
| `/submit-a-story/` | Report an Incident | Long WPForms incident intake form. |
| `/contact/` | Contact | General contact form. |
| `/education-tools/` | Education & Tools | Older page; status and future role need editorial review. |
| `/stories/` | Stories | Older page; status and future role need editorial review. |
| `/case-studies/` | Case studies | Appears to be an older or placeholder page. |
| `/alternatives/` | Alternatives | Appears to be an older or placeholder page. |
| `/demo/` | DEMO | Divi demo/template content; should not remain publicly indexable if unused. |
| `/coming-soon/` | Coming Soon | Legacy page; should not remain publicly indexable if unused. |

The navigation also accepts `/monthly-donation/`, which redirects to `/monthly-donations/`. Preserve or deliberately replace that redirect during cutover.

## Content and UX observations

### Homepage

- Strong mission, urgency, research credibility, and breadth of partnerships are present.
- The page asks one document to serve first-time visitors, policymakers, researchers, affected residents, donors, journalists, farmers, and partner organisations.
- The advocacy timeline, media links, webinars, member logos, educational resources, and general pesticide-use education are difficult to scan as one continuous page.
- Document links are often represented by uppercase calls to action without consistent metadata such as document type, publication date, author, topic, or short abstract.
- The homepage uses several font families and many downloaded font files.
- Fourteen embedded YouTube players are expensive at initial load; privacy-enhanced, click-to-load video previews would be leaner.
- Some headings and labels contain copy errors or inconsistencies, and the page has duplicate/empty heading structure that should be normalized.

### Documents and research

- The PDFs are a central organisational asset, not incidental downloads.
- Several documents have duplicate or near-duplicate uploads.
- The public library would benefit from typed metadata: title, publication date, document type, topic/campaign, author/organisation, summary, file size, and canonical download URL.
- Search, filters, related resources, and stable URLs are likely more valuable than reproducing the existing visual timeline exactly.

### Incident reporting

The form collects names, email addresses, phone numbers, locations, health impacts, environmental impacts, dates, alleged legal non-compliance, and a preference for anonymity. This is sensitive operational data and may include health information and allegations about third parties.

Before rebuilding it, confirm:

- the lawful purpose and consent wording;
- which fields are necessary and which can be optional;
- where submissions are stored and forwarded;
- who can access them;
- how long they are retained;
- how attachments are accepted and protected;
- how public excerpts are reviewed and anonymised;
- what acknowledgement, emergency guidance, and escalation expectations are set;
- the applicable POPIA/privacy and security requirements.

The current page says only one narrative field will be published, but no discoverable privacy policy was found in the public sitemap/search pass.

### Donations

- The donation page promises three routes: once-off PayFast, EFT, and monthly donations.
- The visible PayFast form is configured as a simple amount form with a minimum of R5 and an item name of “UnPoison Advocacy”.
- The separate debit-order page links to ThrivePay but is not clearly integrated into the main donation journey.
- The new site needs a confirmed decision about once-off versus recurring donations, tax certificates, donor acknowledgements, payment success/failure states, analytics, and whether bank details should remain public.

## Migration capture plan

### Preferred: complete archival capture

Before changing the existing site, obtain a restorable backup containing both:

1. A full database export, including plugin tables and form entries.
2. A file backup, especially `wp-content/uploads`, the active theme/child theme, and relevant plugin configuration or custom code.

The database and files are separate parts of a WordPress backup. A database-only backup does not contain uploaded media, themes, plugins, or configuration files.

### Useful supplemental exports

- WordPress Admin → Tools → Export → All content, producing a WXR/XML export.
- Media-library inventory/CSV if available.
- Direct archive of `wp-content/uploads` from the hosting file manager, SFTP, SSH, or a host backup.
- WPForms entries and notification/settings export for the incident form.
- Contact-form submissions if stored.
- All in One SEO titles, descriptions, canonical URLs, schema, and redirect settings.
- Google Analytics property access and event/conversion definitions.
- Search Console property access.
- PayFast merchant access and current integration settings.
- ThrivePay/debit-order ownership and data-flow details.
- DNS/domain registrar and hosting access.
- Current user list and publishing roles, without copying passwords into project files.

WordPress's WXR export contains content records but not site settings or the attachment files themselves. It is therefore a supplement, not a sufficient backup on its own.

### If administrator or hosting access is unavailable

The public REST API, sitemaps, rendered pages, and directly linked media can reconstruct much of the public site. This fallback will not reliably preserve:

- unpublished or draft content;
- Divi/global layout configuration;
- SEO/plugin settings;
- form entries and notification rules;
- redirects not exercised during the crawl;
- original media that is no longer linked;
- analytics, payment, or email-service configuration;
- revision history and editorial metadata.

## Proposed discovery sequence

1. Confirm organisational goals, audiences, success measures, brand tone, and editorial ownership.
2. Confirm access to WordPress admin, hosting/files/database, domain/DNS, analytics, forms, and payment accounts.
3. Create a complete backup and non-destructive local content inventory.
4. Interview the people who receive incident reports, publish research, manage campaigns, and process donations.
5. Classify every current page and asset as migrate, rewrite, consolidate, archive, redirect, or retire.
6. Define the content model and launch information architecture.
7. Decide the editing model and technical stack based on publishing frequency, team capacity, hosting budget, and privacy requirements.
8. Prototype the highest-risk journeys first: document discovery, incident reporting, and donations.
9. Build and migrate content with accessibility, performance, SEO, privacy, analytics, and redirect checks.
10. Run a parallel staging review, freeze WordPress edits briefly, perform a final delta migration, switch DNS, and monitor errors/forms/payments.

## Sources

- Current site and public REST API: https://unpoison.org/
- Public sitemap: https://unpoison.org/wp-sitemap.xml
- WordPress Tools Export documentation: https://wordpress.org/documentation/article/tools-export-screen/
- WordPress backup documentation: https://developer.wordpress.org/advanced-administration/security/backup/
- WordPress database backup documentation: https://developer.wordpress.org/advanced-administration/security/backup/database/
- WP-CLI export documentation: https://developer.wordpress.org/cli/commands/export/

