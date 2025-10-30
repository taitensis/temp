import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Language } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(minutes: number | null | undefined): string {
  if (!minutes || minutes <= 0) return '—';

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

export function formatServings(servings: number | null, lang: 'en' | 'fr'): string {
  if (!servings) return '';

  const word = lang === 'fr' ? 'portions' : 'servings';
  return `${servings} ${word}`;
}

export function formatDate(date: string | Date, lang: Language): string {
  const d = new Date(date);
  return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRating(rating: number | null): string {
  if (!rating) return '—';
  return `${rating.toFixed(1)} ★`;
}

export function getDifficultyColor(difficulty?: string): string {
  switch (difficulty) {
    case 'easy':
      return 'text-green-600';
    case 'medium':
      return 'text-yellow-600';
    case 'hard':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
