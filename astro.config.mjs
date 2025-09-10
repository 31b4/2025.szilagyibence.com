// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Custom domain for production
  site: 'https://szilagyibence.com',
  // Important for custom-domain (GitHub Pages with CNAME): keep at root
  base: '/',
  integrations: [tailwind(), sitemap()],
  i18n: {
    locales: ['en', 'hu', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
