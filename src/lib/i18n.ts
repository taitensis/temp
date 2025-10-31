import type { Language } from './types';

export const languages = ['en', 'es', 'fr', 'nl'] as const;
export const defaultLang: Language = 'en';

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
      view: 'View',
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
      view: 'Vue',
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
  es: {
    // Spanish translations - copy from en for now, translate later
    common: {
      search: 'Buscar',
      loading: 'Cargando...',
      error: 'Ocurrió un error',
      noResults: 'No se encontraron resultados',
      viewMore: 'Ver más',
      share: 'Compartir',
      print: 'Imprimir',
      save: 'Guardar',
      saved: 'Guardado',
      remove: 'Eliminar',
      view: 'Vista',
    },
    site: {
      name: 'Mis Recetas Favoritas',
      tagline: 'Descubre deliciosas recetas caseras',
      copyright: 'Todos los derechos reservados',
      madeWith: 'Hecho con Astro y Supabase',
    },
    nav: {
      home: 'Inicio',
      recipes: 'Recetas',
      categories: 'Categorías',
      seasonal: 'Estacional',
      about: 'Acerca de',
      profile: 'Perfil',
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
    },
    filters: {
      title: 'Filtros',
      search: 'Buscar recetas...',
      difficulty: 'Dificultad',
      difficultyOptions: {
        all: 'Todas las dificultades',
        easy: 'Fácil',
        medium: 'Medio',
        hard: 'Difícil',
      },
      time: 'Tiempo de cocción',
      maxTime: 'Tiempo máximo (minutos)',
      categories: 'Categorías',
      tags: 'Etiquetas',
      season: 'Temporada',
      seasonOptions: {
        all: 'Todas las temporadas',
        spring: 'Primavera',
        summer: 'Verano',
        autumn: 'Otoño',
        winter: 'Invierno',
      },
      rating: 'Calificación mínima',
      sortBy: 'Ordenar por',
      sortOptions: {
        newest: 'Más reciente',
        popular: 'Más popular',
        rating: 'Mejor calificado',
        quickest: 'Más rápido',
      },
      apply: 'Aplicar filtros',
      reset: 'Restablecer',
    },
    recipe: {
      servings: 'porciones',
      serving: 'porción',
      prepTime: 'Preparación',
      cookTime: 'Cocción',
      totalTime: 'Total',
      difficulty: 'Dificultad',
      ingredients: 'Ingredientes',
      instructions: 'Instrucciones',
      nutrition: 'Nutrición por porción',
      nutritionFacts: {
        calories: 'Calorías',
        protein: 'Proteína',
        carbs: 'Carbohidratos',
        fat: 'Grasa',
        fiber: 'Fibra',
        sugar: 'Azúcar',
        sodium: 'Sodio',
      },
      tips: 'Consejos y Notas',
      source: 'Fuente',
      video: 'Ver video',
      rating: 'Calificación',
      reviews: 'reseñas',
      addReview: 'Añadir reseña',
    },
    footer: {
      quickLinks: 'Enlaces Rápidos',
      legal: 'Legal',
      contact: 'Contacto',
      terms: 'Términos de Servicio',
      privacy: 'Privacidad',
      followUs: 'Síguenos',
    },
    errors: {
      notFound: 'Página no encontrada',
      recipeNotFound: 'Receta no encontrada',
      serverError: 'Error del servidor',
      networkError: 'Error de red',
      tryAgain: 'Intentar de nuevo',
      backHome: 'Volver al inicio',
    },
  },
  nl: {
    // Dutch translations - copy from en for now, translate later
    common: {
      search: 'Zoeken',
      loading: 'Laden...',
      error: 'Er is een fout opgetreden',
      noResults: 'Geen resultaten gevonden',
      viewMore: 'Meer bekijken',
      share: 'Delen',
      print: 'Afdrukken',
      save: 'Opslaan',
      saved: 'Opgeslagen',
      remove: 'Verwijderen',
      view: 'Weergave',
    },
    site: {
      name: 'Mijn Favoriete Recepten',
      tagline: 'Ontdek heerlijke huisgemaakte recepten',
      copyright: 'Alle rechten voorbehouden',
      madeWith: 'Gemaakt met Astro en Supabase',
    },
    nav: {
      home: 'Home',
      recipes: 'Recepten',
      categories: 'Categorieën',
      seasonal: 'Seizoensgebonden',
      about: 'Over',
      profile: 'Profiel',
      login: 'Inloggen',
      logout: 'Uitloggen',
    },
    filters: {
      title: 'Filters',
      search: 'Recepten zoeken...',
      difficulty: 'Moeilijkheidsgraad',
      difficultyOptions: {
        all: 'Alle moeilijkheidsgraden',
        easy: 'Gemakkelijk',
        medium: 'Gemiddeld',
        hard: 'Moeilijk',
      },
      time: 'Kooktijd',
      maxTime: 'Maximale tijd (minuten)',
      categories: 'Categorieën',
      tags: 'Tags',
      season: 'Seizoen',
      seasonOptions: {
        all: 'Alle seizoenen',
        spring: 'Lente',
        summer: 'Zomer',
        autumn: 'Herfst',
        winter: 'Winter',
      },
      rating: 'Minimale beoordeling',
      sortBy: 'Sorteren op',
      sortOptions: {
        newest: 'Nieuwste',
        popular: 'Populairste',
        rating: 'Best beoordeeld',
        quickest: 'Snelste',
      },
      apply: 'Filters toepassen',
      reset: 'Resetten',
    },
    recipe: {
      servings: 'porties',
      serving: 'portie',
      prepTime: 'Voorbereiding',
      cookTime: 'Koken',
      totalTime: 'Totaal',
      difficulty: 'Moeilijkheidsgraad',
      ingredients: 'Ingrediënten',
      instructions: 'Instructies',
      nutrition: 'Voeding per portie',
      nutritionFacts: {
        calories: 'Calorieën',
        protein: 'Eiwit',
        carbs: 'Koolhydraten',
        fat: 'Vet',
        fiber: 'Vezels',
        sugar: 'Suiker',
        sodium: 'Natrium',
      },
      tips: 'Tips & Notities',
      source: 'Bron',
      video: 'Video bekijken',
      rating: 'Beoordeling',
      reviews: 'recensies',
      addReview: 'Recensie toevoegen',
    },
    footer: {
      quickLinks: 'Snelle Links',
      legal: 'Juridisch',
      contact: 'Contact',
      terms: 'Servicevoorwaarden',
      privacy: 'Privacy',
      followUs: 'Volg ons',
    },
    errors: {
      notFound: 'Pagina niet gevonden',
      recipeNotFound: 'Recept niet gevonden',
      serverError: 'Serverfout',
      networkError: 'Netwerkfout',
      tryAgain: 'Probeer opnieuw',
      backHome: 'Terug naar home',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function useTranslations(lang: Language) {
  return translations[lang];
}

export function t(lang: Language, path: string): string {
  const keys = path.split('.');
  let value: unknown = translations[lang];

  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      console.warn(`Translation missing: ${path} for ${lang}`);
      return path;
    }
  }

  if (typeof value === 'string') return value;

  console.warn(`Translation not a string: ${path} for ${lang}`);
  return path;
}

// Helper for components
export function getLocalizedUrl(lang: Language, path: string): string {
  // Remove any existing language prefix
  const cleanPath = path.replace(/^\/(en|es|fr|nl)/, '');
  return `/${lang}${cleanPath}`;
}

// Get alternate language (cycles through available languages)
export function getAltLang(currentLang: Language): Language {
  const currentIndex = languages.indexOf(currentLang);
  const nextIndex = (currentIndex + 1) % languages.length;
  return languages[nextIndex];
}
