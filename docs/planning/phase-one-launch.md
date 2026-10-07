# Phase-one launch: DNS and Google for Nonprofits

Status: preview-ready; **DNS has not been switched**. The WordPress site remains live at `unpoison.org`. The Netlify project serves the candidate site at `https://unpoison.netlify.app/`. On 2026-10-07 Jen requested a temporary Netlify cutover for Google review, followed by a return to WordPress while the complete replacement is developed. Do not treat that return as automatic until the specific Google product's ongoing website requirements and the WordPress site's condition are checked.

## Already prepared

- Netlify has `unpoison.org` as its primary domain and `www.unpoison.org` as a redirect to it. Both show pending DNS verification until cutover; a custom-domain TLS certificate cannot be issued yet.
- The candidate includes the organisation's mission, activities, contact route, NPO 279-035 and PBO 930082413, donation route, privacy page, current campaign, resource documents and 14 direct YouTube links. No Section 18A or tax-deductibility claim is made.
- Legacy high-priority page and PDF URLs have Netlify redirects. Seven public WordPress PDFs have local copies. The larger content-parity migration remains a second phase; see `migration-ledger.md`.
- Temporary deployments generate `noindex` metadata and a disallowing `robots.txt`. Even after attaching the custom domain, the site remains non-indexable until a production build has `INDEX_SITE=true`.

## Must confirm before cutover

1. Confirm that the public PayFast receiver ID `19983507`, carried over from the existing WordPress donation form, belongs to UnPoison and that the checkout displays the right beneficiary. Do not make a test payment without the organisation's approval.
2. Confirm who receives `unpoisonsa@gmail.com` messages and incident reports, how attachments/sensitive information should be handled, and whether the contact-first route is acceptable while a secure replacement form is planned.
3. Obtain a WordPress database and uploads backup, plus a DNS-zone export. Keep WordPress and its media accessible until redirects and full migration are reconciled.
4. Confirm the person who can edit the current DNS zone and the person who can resubmit or update the Google for Nonprofits application.

## DNS cutover (only after sign-off)

Keep existing nameservers and all mail-related records. In the current external DNS zone, replace only the web records after checking there are no conflicting `A`, `AAAA`, or `CNAME` entries:

| Host | Preferred record | Fallback |
| --- | --- | --- |
| `@` / `unpoison.org` | `ALIAS`/`ANAME`/flattened `CNAME` → `apex-loadbalancer.netlify.com` | `A` → `75.2.60.5` if the DNS provider cannot flatten the apex |
| `www` | `CNAME` → `unpoison.netlify.app` | — |

Those are the exact targets shown in this project's Netlify domain settings on 1 October 2026. Before changing records, lower their TTL if practical and record the current values for rollback. At the time of preparation, the apex resolves to WordPress at `197.221.14.16`; the zone also has Google MX and an SPF TXT record. **Do not replace the nameservers or delete MX/TXT records.**

For the temporary launch, set `INDEX_SITE=true` in Netlify's **production** deploy context (and `false` for previews) immediately before the single release build. The release can be checked at `unpoison.netlify.app` while DNS still points to WordPress; its canonical and sitemap will already target `https://unpoison.org`. Then change the DNS records. When both domains verify in Netlify, wait for a valid HTTPS certificate and test `https://unpoison.org/` and the `www` redirect. Confirm the new site has the `https://unpoison.org` canonical and sitemap, `robots.txt` allows crawling, and no `noindex` meta tag remains. Deploy previews should remain non-indexable.

## Temporary cutover and return to WordPress

- Before editing DNS, export or record the **entire** xneelo zone, not only the web records. On 2026-10-07 the observed `@` and `www` A records both resolved to the WordPress host `197.221.14.16`; recheck the authoritative zone and TTL in xneelo before relying on these values. Keep the WordPress hosting, files, database, and mail service unchanged during the temporary cutover.
- For the Netlify interval, change only `@` and `www` as above. Do not switch nameservers or modify MX, SPF, DKIM, DMARC, or Google verification TXT records. Verify the public site, donation handoff, contact route, redirects, and both HTTPS hostnames after propagation.
- Record which Google decision is awaited and its application/reference status. Google for Nonprofits account verification, Google Workspace for Nonprofits activation, and Ad Grants website approval are distinct; a decision on one does not establish approval of the others.
- Before returning to WordPress, confirm that the restored site still meets the requirements of the approved Google product, particularly identity, mission, contact, HTTPS, and functioning visitor journeys. If Ad Grants is active, a website that no longer meets its policy can risk suspension. Preserve the approved domain and do not move ads to the Netlify preview hostname.
- To roll back, restore the exact pre-cutover xneelo web records from the zone snapshot (expected `@` and `www` A records to `197.221.14.16`, subject to that snapshot). Then verify WordPress at both hostnames over HTTPS, check legacy pages and mail, and return Netlify to its non-indexable preview configuration when it is no longer the production site. Do not remove the Netlify project or its content; it remains the development preview for the full replacement.

## Launch smoke test

- Home, About, Contact, Donate, Privacy, campaign, Resources, Videos and incident-report pages load over HTTPS on desktop and phone.
- NPO/PBO numbers, legal name, email address and mission are consistent with the registration documents.
- PayFast handoff shows the correct beneficiary; no personal payment data is collected on the site. Incident-report email reaches the approved recipient.
- Downloaded PDFs, YouTube links, campaign external links and old-page redirects work.
- `www` redirects to the chosen primary domain; there are no browser certificate warnings, mixed-content requests or broken images.
- Search Console domain ownership remains available, and the new sitemap is submitted after cutover. Monitor crawl, redirect and indexing errors.

## Google resubmission

Use `https://unpoison.org/` (not the Netlify preview URL) when the domain, HTTPS and indexing checks pass. The public site should clearly identify UnPoison, describe actual activities and provide a working contact route and substantive original content. Check the current Google for Nonprofits/Goodstack application status and respond with the NPO/PBO documents through the official application flow; do not upload registration letters to the public website merely for verification. If applying for Google Ad Grants later, recheck its separate website policy and donation flow requirements.

This checklist is preparation, not a claim that Google has approved the organisation or that the full WordPress content migration is complete.
