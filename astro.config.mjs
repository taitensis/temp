import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://taitensis.github.io',
  base: '/nourriture-quotidienne', // repo

  i18n: {
    locales: ['en', 'es', 'fr', 'nl'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },

  // Output mode for GitHub Pages
  output: 'static',

  // Build configuration
  build: {
    assets: '_assets', // Keeps assets organized
  },

  // Image optimization
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
