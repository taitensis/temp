import {
  getRelativeLocaleUrl,
  getAbsoluteLocaleUrl,
  getRelativeLocaleUrlList,
  getAbsoluteLocaleUrlList,
  getLocaleByPath,
} from 'astro:i18n';
import type { Language } from './types';

const CONFIG = {
  base: '/nourriture-quotidienne',
  locales: ['en', 'fr'] as const,
  defaultLocale: 'en' as Language,
} as const;

export function getLanguageSwitchUrl(currentPath: string, targetLang: Language): string {
  const pathWithoutLocale = extractPathWithoutLocale(currentPath);
  return getRelativeLocaleUrl(targetLang, pathWithoutLocale);
}

export function extractPathWithoutLocale(currentPath: string): string {
  // Remove base path if present
  let path = currentPath;
  if (CONFIG.base && path.startsWith(CONFIG.base)) {
    path = path.slice(CONFIG.base.length);
  }

  // Remove leading slash for processing
  path = path.replace(/^\//, '');

  // Remove locale prefix (e.g., 'en/', 'fr/')
  const localePattern = new RegExp(`^(${CONFIG.locales.join('|')})(/|$)`);
  path = path.replace(localePattern, '');

  // Remove trailing slash
  path = path.replace(/\/$/, '');

  return path;
}

export function getCurrentLocale(currentPath: string): Language | null {
  // Remove base path if present
  let path = currentPath;
  if (CONFIG.base && path.startsWith(CONFIG.base)) {
    path = path.slice(CONFIG.base.length);
  }

  // Extract locale from the start of the path
  const match = path.match(/^\/(en|fr)/);
  return match ? (match[1] as Language) : null;
}

export function getAllLocaleUrls(currentPath: string): Array<{ locale: Language; url: string }> {
  const pathWithoutLocale = extractPathWithoutLocale(currentPath);
  const urls = getRelativeLocaleUrlList(pathWithoutLocale);

  return CONFIG.locales.map((locale, index) => ({
    locale,
    url: urls[index],
  }));
}

export function getAllAbsoluteLocaleUrls(
  currentPath: string
): Array<{ locale: Language; url: string }> {
  const pathWithoutLocale = extractPathWithoutLocale(currentPath);
  const urls = getAbsoluteLocaleUrlList(pathWithoutLocale);

  return CONFIG.locales.map((locale, index) => ({
    locale,
    url: urls[index],
  }));
}

export function buildLocalizedUrl(locale: Language, path: string = ''): string {
  return getRelativeLocaleUrl(locale, path);
}

export function buildAbsoluteLocalizedUrl(locale: Language, path: string = ''): string {
  return getAbsoluteLocaleUrl(locale, path);
}

export function isLocaleHomepage(currentPath: string): boolean {
  const pathWithoutLocale = extractPathWithoutLocale(currentPath);
  return pathWithoutLocale === '' || pathWithoutLocale === '/';
}

export function getDefaultLocaleUrl(path: string = ''): string {
  return getRelativeLocaleUrl(CONFIG.defaultLocale, path);
}

export function normalizePath(path: string): string {
  return (
    '/' +
    path
      .split('/')
      .filter((segment) => segment !== '')
      .join('/')
  );
}

export function isSupportedLocale(locale: string): locale is Language {
  return CONFIG.locales.includes(locale as Language);
}

export function getAlternateLocale(currentLocale: Language): Language {
  return CONFIG.locales.find((locale) => locale !== currentLocale) ?? CONFIG.defaultLocale;
}

// Re-export useful Astro i18n functions for convenience
export {
  getRelativeLocaleUrl,
  getAbsoluteLocaleUrl,
  getRelativeLocaleUrlList,
  getAbsoluteLocaleUrlList,
  getLocaleByPath,
};
