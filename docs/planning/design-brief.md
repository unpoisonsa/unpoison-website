# UnPoison website design brief

Status: Confirmed  
Date: 2026-09-28

## 1. Feature summary

Rebuild unpoison.org as a fast, accessible, content-led custom website that preserves the substance and recognisable identity of the existing WordPress site without reproducing its page-builder structure. It must serve donors, policy and research audiences, affected communities, farmers, journalists, partners, and maintainers by making UnPoison understandable, its evidence discoverable, and its actions obvious.

Success means public content parity, materially faster delivery on ordinary mobile connections, and a simple Markdown/Git publishing workflow that technical maintainers can operate with LLM assistance.

## 2. Primary user action

**Understand, then act.**

A first-time visitor should quickly understand:

1. what UnPoison is;
2. what problem it addresses;
3. why its work is credible and current;
4. what they can do next.

The next action depends on the visitor: explore evidence, follow a campaign, report an incident, contribute expertise, contact the organisation, or donate. The homepage should establish understanding before competing calls to action appear.

## 3. Design direction

Use a **civic editorial** direction with an organic South African character. Preserve the canary/logo, existing colour cues, photography, typographic heritage, and “For All Forever,” but refine them into a disciplined system that feels credible, informed, and proactive.

The experience should resemble a well-edited public-interest publication and field guide rather than a campaign template. It should balance policy authority with human consequence and forward movement. Evidence should be visible through dates, authorship, source information, document metadata, and current-work signals rather than through institutional visual clichés.

Avoid all identified anti-directions: corporate sustainability branding, overly academic archive styling, fear-driven campaigning, generic NGO components, and rustic environmental craft aesthetics.

## 4. Layout strategy

### Site-wide hierarchy

- Use a small, stable primary navigation organised around understanding, evidence/work, active campaigns, action, and organisational information.
- Give persistent but restrained access to donating and reporting an incident; neither should overpower initial comprehension.
- Use breadcrumbs and clear content labels on deeper pages so research and campaign content retains context.
- Use generous editorial spacing and controlled reading widths. Dense document collections should favour lists and metadata over repeated decorative cards.

### Homepage flow

1. **Identity and proposition:** UnPoison, “For All Forever,” and a concise explanation of the organisation's role.
2. **Why this matters:** a small set of sourced facts or proof points with dates/context, not floating statistics.
3. **What UnPoison does:** plain-language explanation of policy, research, convening, education, support, and advocacy.
4. **Current work:** recent submissions, campaigns, or outcomes, drawn from structured content.
5. **Choose an action:** audience-relevant routes such as explore evidence, join a campaign, report an incident, contribute, or donate.
6. **Trust and network:** selected partners, media, and institutional credibility without displaying every logo at equal weight.
7. **Stay connected:** contact or updates, subject to confirming the mailing-list workflow.

### Supporting content

- Treat reports, submissions, databases, media releases, educational resources, and external research as structured resources with consistent metadata.
- Treat active initiatives as campaigns with goals, status, evidence, updates, resources, and actions.
- Keep organisation, vision, mission, people/network, and contact information distinct from the evidence library.

## 5. Key states

### Normal content

Pages should render complete, useful HTML before JavaScript. Important information and navigation must not depend on animation, client-side hydration, or third-party services.

### Resource search and filtering

- Default: show recent and important resources with visible type/date/topic metadata.
- No results: explain which filters are active and offer a one-action reset.
- Missing file: retain the metadata page, explain the unavailable download, and provide a contact route rather than returning a bare error.
- Large document: disclose PDF/file type and size before download when available.

### Media

- Videos should use lightweight previews and load the third-party player only after activation.
- If YouTube is unavailable or blocked, preserve the title, summary, and direct link.
- Images should reserve their layout space and degrade without obscuring adjacent content.

### Legacy incident report

- Clearly label the transition to the existing reporting service/form.
- Explain what information is needed and set expectations before handing off.
- If the legacy form is unavailable, provide a safe contact route and do not imply that a report was submitted.

### Donation handoff

- Preserve the existing donation route during phase one.
- Clearly identify external payment handoff, success, cancellation, and failure where the current integration permits.
- Do not redesign the payment system until requirements are confirmed.

### General errors and edge cases

- Provide a useful 404 with search/navigation to work, campaigns, reporting, and contact.
- Preserve readable content with JavaScript disabled.
- Respect reduced-motion preferences.
- Support long titles, organisation names, dates, and document filenames without truncating essential meaning.

## 6. Interaction model

- Navigation and core calls to action use ordinary links with predictable browser behaviour.
- Resource filters update quickly, remain keyboard-operable, and can be represented in the URL when practical so filtered views are shareable.
- Downloads identify their file type and open/download consistently.
- Accordions are reserved for genuinely secondary detail such as long campaign FAQs; important content must not be hidden by default.
- Video previews require intentional activation.
- Hover effects are supplementary; every state and action must remain apparent on touch and keyboard devices.
- Motion is restrained and used only to clarify state or hierarchy. The site should feel fast rather than animated.

## 7. Content requirements

### Core content types

- standard page;
- resource/document;
- work update or policy submission;
- campaign;
- media appearance or external coverage;
- organisation/partner entry;
- video/webinar;
- action/contact destination.

### Resource metadata

Each resource should support, where applicable:

- title;
- short summary;
- publication date and updated date;
- author or publishing organisation;
- resource type;
- topics/campaigns;
- source/canonical URL;
- local file and file size/type;
- featured image with meaningful alternative text;
- related resources;
- citation or download label.

### Migration rules

- Preserve all substantively valuable public content.
- Consolidate duplicate explanations and overlapping timelines.
- Archive or retire demo, placeholder, superseded, and duplicate items after review.
- Maintain a redirect map for every changed public URL.
- Retain original publication dates and provenance.
- Do not automatically publish historical incident submissions or sensitive personal data.
- Replace unexplained uppercase link copy with descriptive action labels.
- Correct spelling, grammar, broken headings, and inconsistent naming during migration without changing substantive positions silently.

## 8. Recommended implementation references

Consult these Impeccable references during implementation:

- `reference/spatial-design.md` for editorial hierarchy, document lists, and varied page rhythm;
- `reference/typography.md` for the preserved-but-refined type system and performance-conscious font loading;
- `reference/color-and-contrast.md` for converting the existing palette into accessible design tokens;
- `reference/responsive-design.md` for low-end mobile and container-aware components;
- `reference/interaction-design.md` for filtering, downloads, legacy handoffs, focus, and error states;
- `reference/ux-writing.md` for calls to action, resource metadata, form handoffs, and error messages;
- `reference/motion-design.md` only for restrained state transitions and reduced-motion handling.

## 9. Open questions

These should not delay the initial static/content architecture work, but must be resolved before final cutover where relevant:

1. Complete WordPress/hosting backup and extraction of original media, SEO data, redirects, analytics settings, and unpublished material.
2. Page-by-page and asset-by-asset migrate/rewrite/consolidate/archive/retire decisions.
3. Exact incident-report storage, notification, access, retention, consent, anonymisation, and POPIA workflow.
4. Future donation requirements, including recurring donations, EFT, tax certificates, and payment analytics.
5. Mailing-list provider and consent workflow, if newsletter signup remains.
6. Final hosting and deployment platform.
7. Ownership/licensing and current versions of third-party photography, partner logos, reports, and video thumbnails.
8. Analytics events and measurable post-launch success targets beyond content parity and performance.
