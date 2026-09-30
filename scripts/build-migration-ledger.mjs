import fs from 'node:fs';
import path from 'node:path';

const inputDir = process.argv[2] ?? '/private/tmp';
const outputPath = process.argv[3] ?? 'docs/planning/migration-ledger.csv';

const readJson = (filename) => JSON.parse(fs.readFileSync(path.join(inputDir, filename), 'utf8'));

const pages = readJson('unpoison-pages.json');
const posts = readJson('unpoison-posts.json');
const media = [1, 2, 3].flatMap((page) => readJson(`unpoison-media-${page}.json`));

const namedEntities = new Map([
  ['amp', '&'],
  ['apos', "'"],
  ['gt', '>'],
  ['lt', '<'],
  ['nbsp', ' '],
  ['quot', '"'],
]);

function decodeHtml(value = '') {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&([a-z]+);/gi, (entity, name) => namedEntities.get(name.toLowerCase()) ?? entity);
}

function stripHtml(value = '') {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function csv(value) {
  const text = String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function normalizeTitle(value) {
  return stripHtml(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function fileName(url) {
  try {
    return decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '');
  } catch {
    return '';
  }
}

function videoId(url) {
  const match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?(?:[^#]*&)?v=))([A-Za-z0-9_-]{11})/i);
  return match?.[1] ?? null;
}

function extractLinks(html = '') {
  const links = [];
  for (const match of html.matchAll(/<a\b[^>]*\bhref=(['"])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi)) {
    const embeddedLabel = match[3].match(/\b(?:alt|title)=(['"])(.*?)\1/i)?.[2] ?? '';
    links.push({ href: decodeHtml(match[2]), text: stripHtml(match[3]) || stripHtml(embeddedLabel) });
  }
  for (const match of html.matchAll(/<(?:iframe|embed)\b[^>]*\bsrc=(['"])(.*?)\1/gi)) {
    links.push({ href: decodeHtml(match[2]), text: '' });
  }
  return links;
}

function canonicalUrl(value) {
  try {
    const url = new URL(value, 'https://unpoison.org/');
    url.hash = '';
    if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
    return url.toString();
  } catch {
    return value;
  }
}

function titleFromUrl(value) {
  try {
    const url = new URL(value, 'https://unpoison.org/');
    const part = decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() ?? url.hostname)
      .replace(/\.[a-z0-9]{2,5}$/i, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return part ? part.replace(/\b\w/g, (letter) => letter.toUpperCase()) : url.hostname;
  } catch {
    return value;
  }
}

const pageDecisions = {
  '370-2': ['rewrite_consolidate', '/', 'P0', 'in_progress', 'Keep the mission, vision, current work, media, webinars, partners and action routes, but split archive material into typed content.'],
  animals: ['migrate_rewrite', '/animals/', 'P1', 'not_started', 'Substantive current guide and campaign page. Preserve wildlife-poisoning guidance, rehabilitation contacts, owl webinar and rat-poison alternatives.'],
  'poison-free-city': ['migrate_consolidate', '/campaigns/pesticide-free-cape-town/', 'P0', 'in_progress', 'Prototype contains only part of the campaign. Preserve FAQ, participation routes, tools and source claims; redirect the legacy URL.'],
  'monthly-donations': ['bridge_then_migrate', '/donate/', 'P0', 'in_progress', 'Current prototype links back to WordPress. Verify PayFast, EFT, acknowledgements and recurring donation behaviour before replacing it.'],
  'debit-order': ['consolidate_review', '/donate/', 'P1', 'blocked_access', 'Verify whether the ThrivePay debit-order route is active and owned before consolidating or retiring it.'],
  contact: ['migrate', '/contact/', 'P0', 'not_started', 'Create a clear contact route and verify delivery destination, spam controls and privacy wording.'],
  stories: ['review_archive', '/stories/', 'P2', 'not_started', 'Review whether any real public stories exist and confirm consent/anonymisation before migration.'],
  'submit-a-story': ['bridge_then_migrate', '/report-an-incident/', 'P0', 'in_progress', 'Current prototype links back to WPForms. Replacement is blocked on POPIA, storage, notification and operational decisions.'],
  'our-work': ['migrate_consolidate', '/resources/', 'P0', 'in_progress', 'Only five resource records exist locally. Migrate and enrich the complete document archive with metadata and stable URLs.'],
  'education-tools': ['review_consolidate', '/resources/', 'P2', 'not_started', 'Assess useful tools individually; consolidate retained items into the evidence library rather than preserving the old page shell.'],
  'case-studies': ['retire_or_redirect', '/resources/', 'P3', 'candidate_retire', 'Appears empty or placeholder. Confirm inbound links before redirecting or returning 410.'],
  alternatives: ['rewrite_consolidate', '/resources/', 'P2', 'not_started', 'Retain useful safer-alternative material as guides/resources; do not preserve an empty placeholder page.'],
  demo: ['retire', '', 'P3', 'candidate_retire', 'Divi demo content unrelated to UnPoison. Remove from index and return 410 unless evidence requires a redirect.'],
  'coming-soon': ['retire', '', 'P3', 'candidate_retire', 'Legacy holding page. Remove from index and return 410.'],
};

const localResourceTitles = [
  'UnPoison’s Comment on SA’s Draft NBSAP 2026 – 2035',
  'UnPoison Comments on Biopesticide Regulatory Gaps in South Africa 01 May 2026',
  'UnPoison Comment on CoCT 26_27 Budget Request for Poison-Free Weed Control',
  'UnPoison Comment on Terbufos Ban notice',
  'UnPoison’s 2025 Highly Hazardous Pesticide Database_ South Africa_ JMPM criteria_GHS_ECHA.',
].map(normalizeTitle);

const localAssetFiles = new Set([
  'liana-mikah-PyJCcS09RTg-unsplash-scaled.jpg',
  'yellow-canary-on-its-perch-PU2Z65L.jpg',
  'No-Spray-Pilot-Pesticide-Free-Roads-2024.png',
  'UnPoison-Cape-Town.png',
]);

const titleCounts = new Map();
for (const item of media) {
  const title = normalizeTitle(item.title?.rendered);
  if (title) titleCounts.set(title, (titleCounts.get(title) ?? 0) + 1);
}

const videoTitles = {
  '58gekrMt7Jw': '#UnPoison Our Wine — Transition Roadmap for South African Wine Farmers',
  'yxWBprX6KmM': '#UnPoison Our Air — Agrichemical Spray Drift in South Africa',
  'S5eLo2fjfbk': 'UnPoison Our Owls & Raptors',
  'SzbsNBPVyUw': 'Calls for banning of toxic pesticides: Anna Shevel weighs in',
  'Z79S9Ff-Qz8': 'Chemical alert | Carte Blanche',
  'c1KjiM0Ujio': 'Dangers and use of organophosphate',
  'cSD7rlCKRqM': '#UnPoison Our Water',
  'ckDX2MCAilA': '#UnPoison Our Legislation — Agrichemical Policy Problems in South Africa',
  'ezVEzCmiXM4': 'How one scientist took on the chemical industry',
  'jW-bGsN_4Pk': 'Pesticides: An Expensive Business',
  '_C6aRP98-Ew': 'Demystifying Highly Hazardous Pesticides in South Africa',
  'm7AIwFStAQg': 'Calls for pesticide ban in schools: Anna Shevel shares thoughts',
  'qc1jjcGwESE': 'UnPoison Our City — Urban Pesticide Use, Exposure, Impacts, and Reduction',
  'ynwY2C5ikFY': 'Women on Farms — Pesticide Exposure of Women Farmworkers in Western Cape',
};

const rows = [];
const push = (row) => rows.push(row);

for (const page of pages) {
  const [action, destination, priority, status, notes] = pageDecisions[page.slug] ?? ['review', '', 'P2', 'not_started', 'No decision recorded.'];
  push({
    kind: 'page',
    source_id: page.id,
    source_url: page.link,
    title: stripHtml(page.title?.rendered),
    format: 'html',
    date: page.modified,
    action,
    destination,
    priority,
    status,
    notes,
  });
}

for (const post of posts) {
  push({
    kind: 'post',
    source_id: post.id,
    source_url: post.link,
    title: stripHtml(post.title?.rendered),
    format: 'html',
    date: post.modified,
    action: 'migrate_consolidate',
    destination: '/resources/pesticide-spray-drift-in-south-africa/',
    priority: 'P1',
    status: 'not_started',
    notes: 'Preserve the article and its report/download relationship; redirect the dated WordPress URL.',
  });
}

for (const item of media) {
  const title = stripHtml(item.title?.rendered);
  const normalized = normalizeTitle(title);
  const filename = fileName(item.source_url);
  const isDocument = !item.mime_type?.startsWith('image/');
  const represented = localAssetFiles.has(filename) || localResourceTitles.includes(normalized);
  const duplicate = (titleCounts.get(normalized) ?? 0) > 1;
  const notes = [];

  if (!item.alt_text && item.mime_type?.startsWith('image/')) notes.push('Missing media-library alt text.');
  if (duplicate) notes.push('Possible duplicate title; compare file hashes and usage before choosing a canonical asset.');
  if (represented) notes.push('Already represented in the prototype; original still needs rights/version review.');

  push({
    kind: isDocument ? 'document' : 'image',
    source_id: item.id,
    source_url: item.source_url,
    title: title || filename,
    format: item.mime_type,
    date: item.modified,
    action: isDocument ? (duplicate ? 'review_consolidate' : 'migrate') : (represented ? 'migrate_review' : 'review'),
    destination: isDocument ? '/resources/' : '',
    priority: isDocument ? 'P1' : (represented ? 'P0' : 'P2'),
    status: represented ? 'in_progress' : 'not_started',
    notes: notes.join(' '),
  });
}

const videoSources = new Map();
for (const source of [...pages, ...posts]) {
  for (const link of extractLinks(source.content?.rendered)) {
    const id = videoId(link.href);
    if (!id) continue;
    const current = videoSources.get(id) ?? new Set();
    current.add(source.link);
    videoSources.set(id, current);
  }
}

for (const [id, title] of Object.entries(videoTitles)) {
  push({
    kind: 'video',
    source_id: id,
    source_url: `https://www.youtube.com/watch?v=${id}`,
    title,
    format: 'youtube',
    date: '',
    action: 'migrate_reference',
    destination: '/resources/',
    priority: 'P1',
    status: 'not_started',
    notes: `Create a typed video resource with summary, speakers/date/topics, thumbnail provenance, direct link and privacy-enhanced click-to-load player. Referenced by: ${[...(videoSources.get(id) ?? [])].join(' ') || 'homepage markup'}`,
  });
}

const knownUrls = new Set([
  ...pages.map((item) => canonicalUrl(item.link)),
  ...posts.map((item) => canonicalUrl(item.link)),
  ...media.map((item) => canonicalUrl(item.source_url)),
  ...Object.keys(videoTitles).map((id) => canonicalUrl(`https://www.youtube.com/watch?v=${id}`)),
]);

const mediaDomains = [
  'agrinews.co.za',
  'businesslive.co.za',
  'capetalk.co.za',
  'dailymaverick.co.za',
  'ewn.co.za',
  'issuu.com',
  'mg.co.za',
  'mongabay.com',
  'news24.com',
  'omny.fm',
  'pan-international.org',
];

const references = new Map();
for (const source of [...pages, ...posts]) {
  for (const link of extractLinks(source.content?.rendered)) {
    if (!link.href || link.href.startsWith('#') || /^javascript:/i.test(link.href) || videoId(link.href)) continue;
    const href = canonicalUrl(link.href);
    if (knownUrls.has(href)) continue;

    const existing = references.get(href) ?? { href, labels: new Set(), sources: new Set() };
    if (link.text) existing.labels.add(link.text);
    existing.sources.add(source.link);
    references.set(href, existing);
  }
}

for (const reference of references.values()) {
  let url;
  try {
    url = new URL(reference.href, 'https://unpoison.org/');
  } catch {
    continue;
  }

  const hostname = url.hostname.replace(/^www\./, '');
  const label = [...reference.labels].find((value) => !/^screenshot\b/i.test(value)) ?? titleFromUrl(reference.href);
  const isForm = /(?:docs\.google\.com\/forms|forms\.gle)/i.test(reference.href);
  const isSocial = /(?:facebook\.com|instagram\.com|linkedin\.com)/i.test(reference.href);
  const isDocument = /\.(?:pdf|docx?)(?:$|\?)/i.test(reference.href);
  const isMediaCoverage = mediaDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`));
  const isInternal = hostname === 'unpoison.org';
  const isEmail = url.protocol === 'mailto:';

  let kind = 'partner_reference';
  let action = 'verify_reference';
  let destination = '/about/';
  let priority = 'P2';

  if (isForm) {
    kind = 'external_form';
    action = 'preserve_verify';
    destination = '/campaigns/pesticide-free-cape-town/';
    priority = 'P0';
  } else if (isSocial) {
    kind = 'social_link';
    action = 'preserve_verify';
    destination = '';
    priority = 'P1';
  } else if (isMediaCoverage) {
    kind = 'media_coverage';
    action = 'migrate_reference';
    destination = '/media/';
    priority = 'P1';
  } else if (isDocument) {
    kind = 'external_document';
    action = 'migrate_reference';
    destination = '/resources/';
    priority = 'P1';
  } else if (isInternal) {
    kind = 'internal_reference';
    action = 'review_redirect';
    destination = '';
    priority = 'P1';
  } else if (isEmail) {
    kind = 'contact_endpoint';
    action = 'preserve_verify';
    destination = '/contact/';
    priority = 'P0';
  }

  push({
    kind,
    source_id: '',
    source_url: reference.href,
    title: label,
    format: isDocument ? path.extname(url.pathname).slice(1).toUpperCase() : 'link',
    date: '',
    action,
    destination,
    priority,
    status: 'not_started',
    notes: `Referenced by: ${[...reference.sources].join(' ')}`,
  });
}

const integrations = [
  ['wpforms-172', 'Incident reporting form', 'WPForms', 'bridge_then_replace', '/report-an-incident/', 'P0', 'blocked_access', 'Export the form definition, entries count, notification recipients, confirmation, spam controls, uploads and retention rules. Never commit entries to Git.'],
  ['divi-contact', 'General contact form', 'Divi form', 'replace', '/contact/', 'P0', 'blocked_access', 'Confirm recipient, SMTP/delivery behaviour, spam controls and privacy wording before replacement.'],
  ['campaign-contact', 'Pesticide-Free City contact form', 'Divi form', 'replace_or_consolidate', '/campaigns/pesticide-free-cape-town/', 'P1', 'blocked_access', 'Confirm whether campaign messages go to a different team or inbox.'],
  ['newsletter', 'Homepage newsletter signup', 'Unknown provider', 'replace_or_retire', '/', 'P1', 'blocked_access', 'Identify provider, list ownership, consent wording, double opt-in and whether the list remains active.'],
  ['payfast', 'Once-off donation checkout', 'PayFast', 'bridge_then_replace', '/donate/', 'P0', 'blocked_access', 'Verify merchant ownership, fields, minimum amount, return/cancel/notify URLs, receipts and analytics without making a transaction.'],
  ['thrivepay', 'Debit-order mandate', 'ThrivePay', 'preserve_verify', '/donate/', 'P1', 'blocked_access', 'Confirm whether the mandate flow is active and who owns the account and donor data.'],
  ['ga4', 'Google Analytics property G-X6RM1QK6ER', 'GA4', 'review_reconfigure', '', 'P1', 'blocked_access', 'Confirm property ownership, privacy basis and required events before installing analytics on the replacement.'],
  ['aioseo', 'SEO metadata, schema and redirects', 'All in One SEO', 'export_migrate', '', 'P0', 'blocked_access', 'Export global and per-page metadata, canonical/noindex settings, organisation schema and redirects.'],
  ['search-console', 'Google Search Console property', 'Google Search Console', 'preserve_verify', '', 'P1', 'blocked_access', 'Confirm ownership and use it to validate redirects, indexing and post-launch errors.'],
];

for (const [id, title, format, action, destination, priority, status, notes] of integrations) {
  push({ kind: 'integration', source_id: id, source_url: '', title, format, date: '', action, destination, priority, status, notes });
}

const headers = ['kind', 'source_id', 'source_url', 'title', 'format', 'date', 'action', 'destination', 'priority', 'status', 'notes'];
const output = [headers.join(','), ...rows.map((row) => headers.map((header) => csv(row[header])).join(','))].join('\n') + '\n';

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output);

const summary = rows.reduce((counts, row) => {
  counts[row.kind] = (counts[row.kind] ?? 0) + 1;
  return counts;
}, {});

console.log(`Wrote ${rows.length} ledger rows to ${outputPath}`);
console.log(summary);
