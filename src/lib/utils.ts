import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(minutes: number | null): string {
  if (!minutes) return 'N/A';

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

export function formatServings(servings: number | null, lang: 'en' | 'fr'): string {
  if (!servings) return '';

  const word = lang === 'fr' ? 'portions' : 'servings';
  return `${servings} ${word}`;
}
