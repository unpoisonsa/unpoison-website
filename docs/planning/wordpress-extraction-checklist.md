# WordPress extraction checklist

Status: Next operational step  
Date: 2026-09-28

## Before logging in

- Confirm the administrator account belongs to an authorised UnPoison maintainer.
- Use the existing password manager or perform account recovery directly through the official site if required.
- Do not paste passwords, one-time codes, database credentials, or payment credentials into chat or project files.
- Do not update WordPress, Divi, or plugins before the backup; updates would change the system being captured.

## WordPress administrator capture

### Site and users

- [ ] Record WordPress Site Health information/export if available.
- [ ] Record the active theme, child theme, and versions.
- [ ] Record active and inactive plugins and versions.
- [ ] Record administrators/editors and confirm which accounts remain valid.
- [ ] Capture Settings → General, Reading, Permalinks, Media, Discussion, and Privacy settings.
- [ ] Capture the primary menu and any footer/global navigation.

### Content export

- [ ] Tools → Export → All content → download WXR/XML.
- [ ] Export pages, posts, and media separately as supplemental files if the all-content export is difficult to inspect.
- [ ] Record drafts, private pages, revisions, reusable blocks, and Divi global layouts that are not public.
- [ ] Record any custom post types or taxonomies.

The WXR export contains content records but not the attachment files themselves or complete site/plugin configuration. It is a supplement to the database/files backup, not a substitute.

Official references:

- https://wordpress.org/documentation/article/tools-export-screen/
- https://developer.wordpress.org/cli/commands/export/

### Forms and sensitive data

- [ ] Open WPForms and identify every form, especially incident report form ID 172.
- [ ] Export form definitions/settings if the installed edition supports it.
- [ ] Export entries only to an approved private location.
- [ ] Record notification recipients, sender/reply-to settings, confirmation messages/redirects, spam controls, and uploaded-file storage.
- [ ] Identify whether entries are retained in WordPress, delivered by email, or both.
- [ ] Count historical entries without copying their contents into the project repository.
- [ ] Identify who currently reviews, publishes, anonymises, and deletes reports.
- [ ] Record the general Divi contact form and newsletter/signup destination.

### SEO and redirects

- [ ] Record AIOSEO global titles/descriptions, organisation schema, social profiles, sitemap settings, and robots directives.
- [ ] Export redirects if a redirect module/plugin is active.
- [ ] Capture per-page SEO titles, descriptions, canonicals, noindex flags, and social images from the database/export.
- [ ] Record Search Console and other verification tokens by purpose; do not expose unrelated secrets.

### Integrations

- [ ] Confirm ownership of GA4 property `G-X6RM1QK6ER`.
- [ ] Confirm Google Search Console access.
- [ ] Identify email delivery/SMTP configuration and newsletter provider.
- [ ] Confirm PayFast merchant/account ownership and current return/cancel/notify URLs.
- [ ] Confirm ThrivePay/debit-order ownership and whether it remains active.
- [ ] Record YouTube channel/video ownership where relevant.

## Hosting control-panel capture

- [ ] Generate/download a full site backup before making changes.
- [ ] Export the WordPress database as SQL or compressed SQL.
- [ ] Download the complete WordPress files or, at minimum, `wp-content/uploads`, active theme/child theme, and custom/must-use plugins.
- [ ] Verify that uploads cover all years from 2020 through the present.
- [ ] Record PHP version, cron jobs, redirects, certificates, and server-level configuration relevant to the site.
- [ ] Identify backups already provided by the host and their retention period.
- [ ] Record the origin IP and how it can remain privately reachable during the rollback window.

WordPress treats database and files as separate backup concerns. A complete restoration requires both.

Official references:

- https://developer.wordpress.org/advanced-administration/security/backup/
- https://developer.wordpress.org/advanced-administration/security/backup/database/

## Domain/DNS capture

- [ ] Identify the registrar and DNS-control account owner.
- [ ] Export or screenshot the complete DNS zone.
- [ ] Record current TTLs.
- [ ] Identify apex, `www`, mail, SPF, DKIM, DMARC, verification, and service-specific records.
- [ ] Do not change nameservers for the initial Netlify deployment.
- [ ] Create a preview subdomain only after the DNS export is safely stored.

Public discovery currently shows `host-h.net` / `dns-h.com` nameservers, web address `197.221.14.16`, and active mail/SPF records. The control-panel export is authoritative.

## Storage rules for acquired material

Never commit these to Git:

- database dumps;
- full WordPress backups;
- `.env` files or credentials;
- WPForms/contact submissions;
- uploads containing unpublished or personal data;
- payment exports;
- server configuration containing secrets.

Safe candidates for the repository after review:

- public WXR-derived content;
- public images and documents with confirmed rights;
- URL inventories and redirect maps without personal data;
- content metadata and hashes;
- migration scripts;
- public SEO metadata.

## Verification before extraction is considered complete

- [ ] Database dump opens and contains WordPress plus plugin tables.
- [ ] Upload archive opens and contains original files, not only thumbnails.
- [ ] WXR parses successfully.
- [ ] Page/media counts reconcile with the public inventory or have an explanation.
- [ ] Form entries and notifications have an authorised owner and private backup.
- [ ] DNS and integration ownership are documented.
- [ ] At least two maintainers know where the private archive is stored and how access is controlled.

