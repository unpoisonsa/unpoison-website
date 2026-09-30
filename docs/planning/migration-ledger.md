# UnPoison migration ledger

Snapshot date: 2026-09-29  
Source: public WordPress REST API and rendered public page content  
Machine-editable ledger: [`migration-ledger.csv`](./migration-ledger.csv)

## Purpose

This is the working content-parity ledger for the WordPress-to-Astro migration. Every discovered public item must end in one of these states before cutover:

- migrated;
- rewritten while preserving its substance and provenance;
- consolidated into another canonical item;
- archived;
- redirected;
- deliberately retired with approval.

The public WordPress site remains the source of truth until every P0/P1 row has been resolved and a final post-freeze crawl reconciles the totals.

## Inventory snapshot

| Kind | Rows | Present in prototype now | Main gap |
| --- | ---: | ---: | --- |
| WordPress pages | 14 | 5 partially represented | Animals, Contact and substantial sections of Home/Pesticide-Free City are absent. |
| WordPress posts | 1 | 0 | Spray-drift article and its relationship to the report are absent. |
| Documents | 44 | 5 represented as resource records | 39 document records still need migration/review. |
| Images | 170 | 4 source images copied | 166 images need usage, rights, duplicate and quality review. |
| YouTube videos | 14 | 0 | No video content type or click-to-load player exists yet. |
| Media coverage links | 26 | 0 | The “UnPoison in the Media” archive is absent. |
| Partner/supporter references | 41 | 0 | Members/supporters are absent and every relationship needs verification. |
| External forms | 3 | 1 campaign handoff represented | Campaign poll/champion destinations require verification. |
| External documents | 7 | 3 campaign links represented | Third-party source documents need stable titles and link checks. |
| Internal references requiring review | 29 | — | Attachment pages, legacy aliases and other routes need redirect decisions. |
| Forms/services/integrations | 9 | 2 temporary bridges | Ownership/configuration cannot be recovered fully from the public site. |

The CSV contains **367 trackable rows**. It is deliberately more granular than the 243 WordPress objects because it also records public videos, media articles, partners, external tools, unresolved internal links and operational integrations.

## Priority definitions

| Priority | Meaning |
| --- | --- |
| P0 | Launch-critical: primary journeys, current work, forms/payment bridges, SEO/redirect capture. |
| P1 | Required for responsible content parity: documents, videos, media, current campaigns and active integrations. |
| P2 | Editorial migration: supporting images, older tools, stories, partners and secondary material. |
| P3 | Probable retirement: placeholders, demo content and obsolete holding pages. |

## Page decisions

| Current URL | Proposed decision | Destination | Priority | Status |
| --- | --- | --- | --- | --- |
| `/` | Rewrite and consolidate | `/` | P0 | In progress |
| `/our-work/` | Migrate into typed resource library | `/resources/` | P0 | In progress; only five records exist |
| `/poison-free-city/` | Migrate full campaign and redirect | `/campaigns/pesticide-free-cape-town/` | P0 | Partial |
| `/submit-a-story/` | Preserve bridge, then replace safely | `/report-an-incident/` | P0 | Blocked on workflow/privacy decisions |
| `/monthly-donations/` | Preserve bridge, then consolidate | `/donate/` | P0 | Blocked on payment verification |
| `/contact/` | Migrate | `/contact/` | P0 | Not started |
| `/animals/` | Migrate and restructure | `/animals/` | P1 | Not started |
| `/debit-order/` | Verify, then consolidate or retire | `/donate/` | P1 | Blocked on ThrivePay access |
| `/stories/` | Review and archive/migrate approved stories | `/stories/` | P2 | Not started |
| `/education-tools/` | Review items and consolidate retained tools | `/resources/` | P2 | Not started |
| `/alternatives/` | Rewrite useful material as practical resources | `/resources/` | P2 | Not started |
| `/case-studies/` | Retire or redirect after inbound-link check | `/resources/` | P3 | Candidate retirement |
| `/demo/` | Retire | none/410 | P3 | Candidate retirement |
| `/coming-soon/` | Retire | none/410 | P3 | Candidate retirement |

The dated spray-drift post should become a stable resource/article at `/resources/pesticide-spray-drift-in-south-africa/`, with a redirect from its existing dated URL.

## Video ledger

All videos should be represented as typed resources with a title, summary, speakers/organisation, date where known, topics, direct YouTube link and thumbnail provenance. The embedded player must load only after activation; the direct link and summary must work without JavaScript or YouTube access.

| Video | YouTube ID | Proposed action |
| --- | --- | --- |
| UnPoison Our Wine — Transition Roadmap for South African Wine Farmers | `58gekrMt7Jw` | Migrate reference |
| UnPoison Our Air — Agrichemical Spray Drift in South Africa | `yxWBprX6KmM` | Migrate reference |
| UnPoison Our Owls & Raptors | `S5eLo2fjfbk` | Migrate reference; also relate to Animals |
| Calls for banning of toxic pesticides: Anna Shevel weighs in | `SzbsNBPVyUw` | Migrate as media/video |
| Chemical Alert — Carte Blanche | `Z79S9Ff-Qz8` | Migrate as media/video |
| Dangers and use of organophosphate | `c1KjiM0Ujio` | Migrate as media/video |
| UnPoison Our Water | `cSD7rlCKRqM` | Migrate reference |
| UnPoison Our Legislation | `ckDX2MCAilA` | Migrate reference |
| How one scientist took on the chemical industry | `ezVEzCmiXM4` | Migrate as supporting education resource |
| Pesticides: An Expensive Business | `jW-bGsN_4Pk` | Migrate as supporting education resource |
| Demystifying Highly Hazardous Pesticides in South Africa | `_C6aRP98-Ew` | Migrate reference |
| Calls for pesticide ban in schools: Anna Shevel shares thoughts | `m7AIwFStAQg` | Migrate as media/video |
| UnPoison Our City | `qc1jjcGwESE` | Migrate and relate to Pesticide-Free Cape Town |
| Women on Farms — Pesticide Exposure of Women Farmworkers | `ynwY2C5ikFY` | Migrate reference |

The videos remain available on YouTube and on the live WordPress site. They have not been copied locally and should not be downloaded unless ownership and the desired archival policy are confirmed.

## Documents

The WordPress media library contains 43 PDFs and 1 DOCX. The default decision is to migrate public documents, create a metadata record for each, and preserve the original public URL through either continued hosting or a redirect.

Each retained document needs:

- canonical title;
- publication date rather than upload date where different;
- author/issuing organisation;
- document type;
- topic/campaign relationships;
- short factual summary;
- file type and size;
- source and replacement URLs;
- related press release, article or later version;
- accessible download text.

Five obvious duplicate-title groups require file-hash and content comparison before choosing a canonical file:

1. `Is this herbicide spraying legal?` — media IDs 1462 and 1463.
2. `Request For Immediate Suspension and Review of the Derogation Process` — IDs 1255 and 1259.
3. `Submission on Draft Regulations for Hazardous Pesticides International Trade` — IDs 884 and 887.
4. `Pesticide spray drift in South Africa — Executive Summary` — IDs 131 and 739.
5. `Pesticide spray drift in South Africa` — IDs 132 and 738.

Duplicate filenames or titles do not prove identical content. No file should be deleted until originals have been hashed and compared.

## Images

There are 170 public media-library images. Only two have saved library alt text; 168 require an accessibility and usage review. Alt text should be written from the image's actual purpose on the new page, not copied mechanically from filenames.

The four prototype images already copied are still provisional:

- homepage canopy photograph;
- canary identity photograph;
- no-spray roadside campaign graphic;
- UnPoison Cape Town campaign image.

For every retained image, record usage, original dimensions, rights/credit, meaningful alt text or decorative status, focal point and generated WebP/AVIF derivatives. Screenshot images used only as links to media articles should usually be replaced by a clean text-led media listing rather than migrated as visual content.

## Media, partners and external references

The ledger records 26 media-coverage links and 41 partner/supporter references found in rendered public content.

Before migration:

- check that each media link still resolves;
- recover a proper article title, outlet and publication date where the current page uses an unlabelled screenshot link;
- distinguish reporting about UnPoison from general background reading;
- confirm whether every listed organisation is still a member, supporter or historical collaborator;
- obtain permission before implying a current endorsement;
- replace dead HTTP-only links and record intentional archives where useful.

## Forms and integrations

| System | Launch treatment | Missing information |
| --- | --- | --- |
| WPForms incident form 172 | Keep WordPress bridge until approved replacement exists | Definition, entries count, notifications, uploads, retention, access, consent and anonymisation process |
| General Divi contact form | Replace with a tested contact route | Recipient, SMTP/delivery, spam handling and privacy wording |
| Campaign contact/poll/champion forms | Preserve verified external handoffs initially | Ownership, response destination and whether each form is still active |
| Homepage newsletter form | Replace or retire | Provider, list ownership, consent history, double opt-in and current use |
| PayFast | Preserve verified bridge | Merchant ownership, fields, callbacks, receipts, failure states and analytics |
| ThrivePay | Preserve only if confirmed active | Account ownership, mandate flow and donor-data handling |
| GA4 `G-X6RM1QK6ER` | Reconfigure only after review | Property ownership, privacy basis and required events |
| All in One SEO | Export and migrate | Titles, descriptions, canonicals, schema, noindex flags and redirects |
| Search Console | Preserve ownership and use for launch QA | Verified owner and property access |

## First execution batch

This sequence closes the largest launch risks without waiting for a full design/content polish:

1. Obtain a complete WordPress files/database backup and WXR export.
2. Export SEO metadata/redirects and record form/payment configuration privately.
3. Download original public documents and hash them; resolve the five duplicate groups.
4. Generate resource entries for the 39 documents not yet represented locally.
5. Add the 14 video resource entries and a lightweight video-preview component.
6. Complete Pesticide-Free Cape Town and migrate the Animals page.
7. Build Contact and verify all campaign/contact destinations.
8. Recreate media coverage and verify the partners/supporters list.
9. Produce a redirect record for every legacy page, dated post, attachment page and alias.
10. Re-crawl immediately before launch and reconcile every ledger row.

## Access-dependent next actions

Public discovery cannot recover private or administrative state. WordPress/hosting access is still required for:

- full database and uploads backup;
- drafts, revisions and private content;
- original files that are no longer linked publicly;
- WPForms entries and notification configuration;
- Divi global layouts and form destinations;
- newsletter provider/list information;
- AIOSEO metadata and redirects;
- PayFast/ThrivePay configuration;
- analytics and Search Console ownership.

These rows are marked `blocked_access` in the CSV. They can remain bridged during preview, but they cannot remain unexplained at cutover.

## Updating the ledger

The CSV is generated from the current public snapshot with:

```sh
node scripts/build-migration-ledger.mjs /private/tmp docs/planning/migration-ledger.csv
```

The script expects the public page, post and three media API responses described in the discovery workflow. Regeneration replaces public-source rows, so editorial approvals and migration completion should ultimately live in a durable content manifest or be merged back after each refresh rather than maintained only as ad-hoc CSV edits.
