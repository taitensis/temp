// REPLACE ENTIRE FILE with proper i18n system:

import type { Language } from './types';

export const languages = ['en', 'fr'] as const;
export const defaultLang: Language = 'fr';

export const translations = {
  en: {
    common: {
      search: 'Search',
      loading: 'Loading...',
      error: 'An error occurred',
      noResults: 'No results found',
      viewMore: 'View more',
      share: 'Share',
      print: 'Print',
      save: 'Save',
      saved: 'Saved',
      remove: 'Remove',
    },
    site: {
      name: 'My Favorite Recipes',
      tagline: 'Discover delicious homemade recipes',
      copyright: 'All rights reserved',
      madeWith: 'Made with Astro and Supabase',
    },
    nav: {
      home: 'Home',
      recipes: 'Recipes',
      categories: 'Categories',
      seasonal: 'Seasonal',
      about: 'About',
      profile: 'Profile',
      login: 'Login',
      logout: 'Logout',
    },
    filters: {
      title: 'Filters',
      search: 'Search recipes...',
      difficulty: 'Difficulty',
      difficultyOptions: {
        all: 'All difficulties',
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
      },
      time: 'Cooking time',
      maxTime: 'Maximum time (minutes)',
      categories: 'Categories',
      tags: 'Tags',
      season: 'Season',
      seasonOptions: {
        all: 'All seasons',
        spring: 'Spring',
        summer: 'Summer',
        autumn: 'Autumn',
        winter: 'Winter',
      },
      rating: 'Minimum rating',
      sortBy: 'Sort by',
      sortOptions: {
        newest: 'Newest',
        popular: 'Most popular',
        rating: 'Best rated',
        quickest: 'Quickest',
      },
      apply: 'Apply filters',
      reset: 'Reset',
    },
    recipe: {
      servings: 'servings',
      serving: 'serving',
      prepTime: 'Prep',
      cookTime: 'Cook',
      totalTime: 'Total',
      difficulty: 'Difficulty',
      ingredients: 'Ingredients',
      instructions: 'Instructions',
      nutrition: 'Nutrition per serving',
      nutritionFacts: {
        calories: 'Calories',
        protein: 'Protein',
        carbs: 'Carbs',
        fat: 'Fat',
        fiber: 'Fiber',
        sugar: 'Sugar',
        sodium: 'Sodium',
      },
      tips: 'Tips & Notes',
      source: 'Source',
      video: 'Watch video',
      rating: 'Rating',
      reviews: 'reviews',
      addReview: 'Add a review',
    },
    footer: {
      quickLinks: 'Quick Links',
      legal: 'Legal',
      contact: 'Contact',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      followUs: 'Follow us',
    },
    errors: {
      notFound: 'Page not found',
      recipeNotFound: 'Recipe not found',
      serverError: 'Server error',
      networkError: 'Network error',
      tryAgain: 'Try again',
      backHome: 'Back to home',
    },
  },
  fr: {
    common: {
      search: 'Rechercher',
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      noResults: 'Aucun résultat trouvé',
      viewMore: 'Voir plus',
      share: 'Partager',
      print: 'Imprimer',
      save: 'Sauvegarder',
      saved: 'Sauvegardé',
      remove: 'Supprimer',
    },
    site: {
      name: 'Mes Recettes Préférées',
      tagline: 'Découvrez de délicieuses recettes maison',
      copyright: 'Tous droits réservés',
      madeWith: 'Fait avec Astro et Supabase',
    },
    nav: {
      home: 'Accueil',
      recipes: 'Recettes',
      categories: 'Catégories',
      seasonal: 'Saisonnier',
      about: 'À propos',
      profile: 'Profil',
      login: 'Connexion',
      logout: 'Déconnexion',
    },
    filters: {
      title: 'Filtres',
      search: 'Rechercher des recettes...',
      difficulty: 'Difficulté',
      difficultyOptions: {
        all: 'Toutes difficultés',
        easy: 'Facile',
        medium: 'Moyen',
        hard: 'Difficile',
      },
      time: 'Temps de cuisson',
      maxTime: 'Temps maximum (minutes)',
      categories: 'Catégories',
      tags: 'Tags',
      season: 'Saison',
      seasonOptions: {
        all: 'Toutes saisons',
        spring: 'Printemps',
        summer: 'Été',
        autumn: 'Automne',
        winter: 'Hiver',
      },
      rating: 'Note minimale',
      sortBy: 'Trier par',
      sortOptions: {
        newest: 'Plus récent',
        popular: 'Plus populaire',
        rating: 'Mieux noté',
        quickest: 'Plus rapide',
      },
      apply: 'Appliquer les filtres',
      reset: 'Réinitialiser',
    },
    recipe: {
      servings: 'portions',
      serving: 'portion',
      prepTime: 'Préparation',
      cookTime: 'Cuisson',
      totalTime: 'Total',
      difficulty: 'Difficulté',
      ingredients: 'Ingrédients',
      instructions: 'Instructions',
      nutrition: 'Nutrition par portion',
      nutritionFacts: {
        calories: 'Calories',
        protein: 'Protéines',
        carbs: 'Glucides',
        fat: 'Lipides',
        fiber: 'Fibres',
        sugar: 'Sucre',
        sodium: 'Sodium',
      },
      tips: 'Astuces et Notes',
      source: 'Source',
      video: 'Voir la vidéo',
      rating: 'Note',
      reviews: 'avis',
      addReview: 'Ajouter un avis',
    },
    footer: {
      quickLinks: 'Liens Rapides',
      legal: 'Informations Légales',
      contact: 'Contact',
      terms: "Conditions d'utilisation",
      privacy: 'Confidentialité',
      followUs: 'Suivez-nous',
    },
    errors: {
      notFound: 'Page non trouvée',
      recipeNotFound: 'Recette non trouvée',
      serverError: 'Erreur serveur',
      networkError: 'Erreur réseau',
      tryAgain: 'Réessayer',
      backHome: "Retour à l'accueil",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function useTranslations(lang: Language) {
  return translations[lang];
}

export function t(lang: Language, path: string): string {
  const keys = path.split('.');
  let value: any = translations[lang];

  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      console.warn(`Translation missing: ${path} for ${lang}`);
      return path;
    }
  }

  return value;
}

// Helper for components
export function getLocalizedUrl(lang: Language, path: string): string {
  // Remove any existing language prefix
  const cleanPath = path.replace(/^\/(en|fr)/, '');
  return `/${lang}${cleanPath}`;
}

// Get alternate language
export function getAltLang(currentLang: Language): Language {
  return currentLang === 'en' ? 'fr' : 'en';
}
