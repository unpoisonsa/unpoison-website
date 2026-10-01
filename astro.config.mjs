import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Attaching a custom domain in Netlify changes URL before DNS is switched.
// Keep the temporary site out of search results until the launch is explicit.
const liveDomainEnabled = process.env.CONTEXT === 'production' && process.env.INDEX_SITE === 'true';
const isDeployPreview = ['deploy-preview', 'branch-deploy'].includes(process.env.CONTEXT);
const deployUrl = liveDomainEnabled
  ? 'https://unpoison.org'
  : isDeployPreview
    ? (process.env.DEPLOY_PRIME_URL ?? 'https://unpoison.netlify.app')
    : 'https://unpoison.netlify.app';

export default defineConfig({
  site: deployUrl,
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
