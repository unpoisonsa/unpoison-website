import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const outputDirectory = 'dist';
const files = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(filePath);
    else files.push(filePath);
  }
}

if (!existsSync(outputDirectory)) {
  console.error('The dist directory does not exist. Run npm run build first.');
  process.exit(1);
}

walk(outputDirectory);

const htmlFiles = files.filter((file) => file.endsWith('.html'));
const unresolved = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1].split(/[?#]/)[0];
    if (href === '/' || href.startsWith('/images/') || href.startsWith('/fonts/') || href.startsWith('/_astro/')) continue;

    const target = path.join(outputDirectory, href.replace(/^\//, ''));
    const resolves = existsSync(target)
      || (href.endsWith('/') && existsSync(path.join(target, 'index.html')))
      || existsSync(`${target}.html`);

    if (!resolves) unresolved.push(`${file}: ${href}`);
  }
}

if (unresolved.length > 0) {
  console.error(`Found ${unresolved.length} unresolved internal link(s):\n${unresolved.join('\n')}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files; all internal links resolve.`);
