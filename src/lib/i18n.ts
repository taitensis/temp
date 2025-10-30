import { getRelativeLocaleUrl } from 'astro:i18n';

export function getAlternateLanguageUrl(currentLang: 'en' | 'fr', currentPath: string): string {
  const targetLang = currentLang === 'en' ? 'fr' : 'en';

  // Remove current language prefix
  const pathWithoutLang = currentPath.replace(`/${currentLang}`, '');

  // Build new URL with target language
  return getRelativeLocaleUrl(targetLang, pathWithoutLang || '/');
}

export const translations = {
  en: {
    filterRecipes: 'Filter Recipes',
    filterOptions: 'Filter Options',
    search: 'Search',
    // ...
  },
  fr: {
    filterRecipes: 'Filtrer les Recettes',
    filterOptions: 'Options de Filtrage',
    search: 'Rechercher',
    // ...
  },
} as const;

export function t(lang: 'en' | 'fr', key: keyof (typeof translations)['en']) {
  return translations[lang][key];
}
