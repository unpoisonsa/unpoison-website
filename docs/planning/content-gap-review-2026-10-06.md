# Legacy content and URL gap review — 6 October 2026

This is a cutover review of the 14 public WordPress pages and one dated post recorded in the [migration ledger](./migration-ledger.md), checked against the current Astro routes and Netlify redirects. It also uses the old homepage's public links and spot-checks of the live Animals, Pesticide-Free City, Stories, Education & Tools, and Alternatives pages. It is **not** a complete inbound-link or final WordPress crawl; administrator exports and Search Console are still needed. No changes in this batch have been deployed.

| Priority | Legacy URL/content | Current state | Required decision or work |
| --- | --- | --- | --- |
| P1 | `/animals/` and its wildlife-rescue PDF | Expanded local page, local PDF and two redirects drafted locally | Anna to review campaign ownership, urgent-care wording, original home-treatment claim, and directory contact details before approval. |
| P0 | `/poison-free-city/` | Local draft now has the WordPress Datawrapper map as a dated still plus a link to its live interactive version, the verified poll and Champs links, City reporting route, and key FAQ answers | Confirm map data owner/update process, campaign claims, and reporting handoff with Anna before cutover. |
| P0 | `/submit-a-story/` | Redirected to `/report-an-incident/`, which offers an email first-contact route rather than the WordPress form | Confirm the intake, privacy and response workflow with the people handling reports. Preserve or replace the old form before declaring functional parity. |
| P1 | `/our-work/` and homepage-linked submission/press-release attachment URLs | Ten resource records now exist, including the 2023 HHP list, 2024 Act 36 comment, 2025 derogation request and colloquium; their copied files and exact redirects are drafted locally | Continue migrating the remaining public documents and old attachment URLs; this is still partial parity. |
| P1 | Dated 2020 spray-drift article | Local resource page now preserves the article/report relationship; both original PDFs and dated URL/attachment redirects are drafted | Review the article wording, then test redirects on preview after deployment is authorised. |
| P1 | `/monthly-donations/` and `/debit-order/` | Redirects point to `/donate/`; current page provides once-off PayFast and asks visitors to email for recurring/EFT details | Confirm whether the recurring and EFT journeys are active and ensure the redirect destination meets donor expectations. |
| P2 | `/stories/` | No new route or redirect; old page visibly contains example Story 1–4 timeline shortcode rather than verified public stories | Do not import demo stories as real testimony. Confirm whether any approved stories exist in WordPress entries; then migrate with consent or retire/redirect. |
| P2 | `/education-tools/` and `/alternatives/` | Redirect to `/resources/`; live old pages are empty or title-only | Existing redirects are reasonable for these page shells. Review separately linked PDFs/tools for migration. |
| P3 | `/case-studies/`, `/demo/`, `/coming-soon/` | No new route | Confirm whether any inbound links or unpublished content need preservation; otherwise retire deliberately. |

The immediate cutover risk is **not only missing page slugs**. The old homepage links to many WordPress attachment URLs for policy submissions, colloquium materials and press releases. This local batch adds direct redirects for the selected files, but many old document URLs still lack a specific destination. A generic `/resources/` redirect would lose the document a visitor expected.

## Local batch: city campaign and first document tranche

- Restored the community-maintained Cape Town suburb map as a dated static preview and direct link to the live Datawrapper chart. The original iframe rendered blank in the local in-app preview, so the still is the dependable default. This is **not** yet an integration with uCampaign or Lyle's separate map experiment.
- Restored key campaign questions, the original poll and Champs application, and the City’s current schedule/complaint path. The poll shortlink resolves to the same Google Form linked on WordPress. The City’s official page publishes changing district schedules, listed products, protocol and a complaint form.
- Preserved the 2020 spray-drift report and executive summary unmodified. The 2021 uploads have identical SHA-256 hashes to the 2020 uploads, so both old URL sets can redirect to the same local pair.
- Added the first tranche of exact documents and metadata records from the old homepage/Our Work page: the 2023 HHP list and corrected release, 2025 HHP media release, 2024 Act 36 comment, March 2025 derogation suspension request, and 2025 colloquium programme and press release. The old homepage calls the programme a “report”; the new resource labels it accurately.
- The incident intake form, recurring donation route, and remaining document archive are **still open**. No changes in this batch have been pushed or deployed.

## Animals editorial and safety review

- The new `/animals/` draft preserves the public journey and original campaign dependencies: professional help, warning signs, direct and secondary poisoning, owl-poisoning short, owl/raptor webinar, detailed poison alternatives, the UnPoison Champs sign-up form, three FAQ topics, and the original rescue directory.
- The directory PDF is the original three-page January 2026 public file. Its SHA-256 is `85131b7a818df96821448976dfb11d08e658a1ad8948941bc10bcd5585572f8a` and the copied file matches it.
- The WordPress page includes detailed bird capture/transport instructions and a homeopathic-treatment FAQ. The local draft retains the handling and transport topics with a review warning, and retains the homeopathic FAQ as an *unverified claim*, without republishing its dose or procedure as treatment guidance. The original is still available for exact editorial comparison. See [`animals-source-preservation.md`](./animals-source-preservation.md).
- The old page's embedded contact form is replaced by a route to the new Contact page for now. Confirm whether Animals enquiries need a distinct recipient or form.
- Before publication, Anna should confirm the page's emergency wording, whether specific handling guidance should be included, whether any named contact is still active, and whether the external wildlife-poisoning report route remains correct.

## Remaining evidence needed before cutover

1. WordPress WXR plus full uploads backup, including the documents and any current edits since the original ledger snapshot.
2. Search Console's linked-pages, top landing pages and 404 data to prioritise redirects for externally linked URLs.
3. A final crawl of WordPress pages, posts, attachment pages and linked public PDFs immediately before DNS switch.
4. Explicit editorial decisions for each P0/P1 gap above, followed by a redirect test on the Netlify preview **only after deployment is authorised**.
