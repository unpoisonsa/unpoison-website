# WordPress-to-custom-site migration plan

Status: Ready to execute  
Date: 2026-09-28

## Migration principles

- Never make the public WordPress site the only remaining copy of organisational content.
- Never change production before a verified backup and rollback path exist.
- Preserve substance, provenance, dates, and public URLs; do not preserve accidental Divi structure.
- Treat form entries, unpublished content, credentials, and database exports as private data that must not enter Git.
- Build and review the replacement in parallel while WordPress remains live.
- Use an explicit short content freeze and final delta capture before switching DNS.

## Phase 0 — access and safety

1. Confirm owners for WordPress, hosting, domain/DNS, analytics, forms, email, PayFast, and ThrivePay.
2. Create a password-manager/shared-access approach; do not exchange passwords in project files or chat.
3. Export the current DNS zone and identify every mail, verification, and service record.
4. Create a complete host-level backup of files and database.
5. Verify that the backup can be opened and that the database dump and `wp-content/uploads` are present.
6. Store the archival backup outside the public repository with access limited to authorised maintainers.

Exit criterion: the current site can be restored independently of the host's live copy.

## Phase 1 — acquisition and inventory

1. Export WordPress “All content” as WXR/XML.
2. Download the complete `wp-content/uploads` directory.
3. Export the database and identify plugin-specific tables.
4. Export or document WPForms entries, fields, notifications, confirmations, anti-spam settings, and file uploads.
5. Capture All in One SEO metadata, schema, sitemap settings, and redirects.
6. Record active menu structure, widgets/global Divi layouts, contact forms, newsletter destinations, PayFast fields, and ThrivePay flow.
7. Export Google Analytics and Search Console access/configuration, not raw credentials.
8. Crawl the public site and produce inventories of URLs, titles, statuses, canonicals, internal links, external links, images, documents, videos, and redirects.
9. Hash original files to identify true duplicates despite filename differences.
10. Record image dimensions, file sizes, current usage, alt text, captions, credit/licensing, and source URL where available.

Exit criterion: every public page and file has a source record and every private integration has an identified owner.

## Phase 2 — editorial classification

Assign each page, post, resource, and asset one disposition:

- **migrate** unchanged apart from formatting/accessibility;
- **rewrite** while preserving meaning and provenance;
- **consolidate** into another canonical item;
- **archive** but keep accessible;
- **redirect** to a current equivalent;
- **retire** after confirming it has no legal, editorial, or link-preservation value.

Priority order:

1. current work and primary documents;
2. mission/vision/about content;
3. active campaigns;
4. incident reporting and donation handoffs;
5. contact and participation paths;
6. media, webinars, partners, and supporting resources;
7. legacy and placeholder pages.

Exit criterion: no URL or media item is deleted merely because it appears unused in a page-builder view.

## Phase 3 — foundation build

1. Initialise the Astro/TypeScript project and content schemas.
2. Implement design tokens, typography, navigation, footer, page shell, metadata, sitemap, robots, and 404.
3. Implement resource, work, campaign, media, and standard-page templates.
4. Add responsive image handling and lightweight video previews.
5. Add Pagefind indexing and accessible search/filter UI.
6. Add redirect and security-header configuration in version control.
7. Add automated content, link, accessibility, and build checks.
8. Deploy a non-indexed preview site.

Exit criterion: representative sample content works across every content type and required viewport.

## Phase 4 — content migration

1. Convert content from WXR/REST/HTML sources into typed Markdown entries using repeatable scripts.
2. Preserve original IDs and source URLs in private migration metadata for traceability.
3. Copy documents and images from the host backup rather than scraping resized frontend versions.
4. Apply the editorial disposition matrix.
5. Correct headings, link text, spelling, alt text, metadata, and duplicated descriptions.
6. Create a canonical URL and redirect record for every legacy URL.
7. Review scientific/policy wording with Anna before publishing rewritten substantive copy.
8. Compare the generated content inventory against the original crawl until parity is accounted for.

Exit criterion: every discovered public content item is represented by a migrated page/file, archive entry, redirect, or approved retirement decision.

## Phase 5 — integration bridges

1. Keep the current incident form live during preview.
2. Determine the production bridge or approved replacement before DNS cutover.
3. Verify the complete existing donation flow without submitting a financial transaction.
4. Recreate or preserve return/cancellation paths as required.
5. Confirm contact and newsletter delivery destinations.
6. Configure analytics only after events and privacy expectations are agreed.

Exit criterion: reporting, donation, contact, and subscriptions have named owners, tested routes, and failure handling.

## Phase 6 — QA and launch preparation

1. Run content-parity, link, redirect, accessibility, browser, responsive, and performance checks.
2. Have the project owner and Anna review the preview site.
3. Test documents, search, filters, video fallbacks, 404, contact paths, incident handoff, and payment handoff.
4. Export the DNS zone again and lower only the relevant web-record TTL if the DNS provider supports it.
5. Schedule a short WordPress content freeze.
6. Capture a final database/uploads/WXR delta and rebuild the replacement.
7. Take a final restorable WordPress backup.

Exit criterion: signed-off content, passing quality gates, verified backup, tested rollback, and no unexplained inventory differences.

## Phase 7 — cutover

1. Attach the production domain to the new host and verify TLS before changing public traffic where possible.
2. Change only the apex/`www` web records; preserve MX, SPF, DKIM, DMARC, verification, and unrelated service records.
3. Verify homepage, representative deep links, legacy redirects, documents, sitemap, robots, forms/handoffs, and analytics.
4. Monitor 404s, redirect failures, build/deploy status, contact/report delivery, and payment handoffs.
5. Keep the WordPress origin intact and access-restricted during the rollback window.

Rollback trigger examples: broken critical content, inaccessible evidence files, failed reporting route, failed payment handoff, or domain/TLS errors that cannot be corrected quickly.

## Phase 8 — stabilisation and retirement

1. Review 404 and search data after launch and add missing redirects or synonyms.
2. Complete the new incident-report workflow and remove the temporary bridge.
3. Review the donation journey as a separate project.
4. Remove confirmed duplicate/demo assets from production while retaining the archive.
5. Add an ongoing content review for stale claims, external links, partner logos, and superseded documents.
6. Retire WordPress only after backups, private form data, redirects, and required records have been retained and independently verified.

## Fastest responsible sequence

Work can run in parallel after the backup:

- content extraction and classification;
- Astro foundation/design system;
- asset deduplication and document metadata;
- DNS/hosting preparation;
- incident/donation workflow discovery.

The critical path is: **verified backup → content inventory → representative templates → migrated priority content → integration decision → QA → cutover**.

