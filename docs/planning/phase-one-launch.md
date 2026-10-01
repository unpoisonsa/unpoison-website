# Phase-one launch: DNS and Google for Nonprofits

Status: preview-ready; **DNS has not been switched**. The WordPress site remains live at `unpoison.org`. The Netlify project serves the candidate site at `https://unpoison.netlify.app/`.

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

When both domains verify in Netlify, wait for a valid HTTPS certificate, then test `https://unpoison.org/` and the `www` redirect. Only once the new site is serving correctly, set the Netlify production environment variable `INDEX_SITE=true` and trigger a fresh production deploy. Verify that the generated canonical URLs and sitemap use `https://unpoison.org`, `robots.txt` allows crawling, and the `noindex` meta tag has disappeared. Deploy previews should remain non-indexable.

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
