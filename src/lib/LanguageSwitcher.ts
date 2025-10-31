import { getLanguageSwitchUrl, getAlternateLocale } from './path-handling';
import type { Language } from './types';

export function getLanguageSwitcherUrl(currentPath: string, targetLang: Language): string {
  return getLanguageSwitchUrl(currentPath, targetLang);
}

export function getAlternateLanguageUrl(currentPath: string, currentLang: Language): string {
  const alternateLang = getAlternateLocale(currentLang);
  return getLanguageSwitchUrl(currentPath, alternateLang);
}

// Re-export for convenience
export { getAlternateLocale } from './path-handling';
