import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import type { Language, RecipeFilters as Filters, Difficulty, Season } from '@/lib/types';

type SortByOption = 'newest' | 'popular' | 'rating' | 'quickest';

interface RecipeFiltersProps {
  lang: Language;
  initialFilters?: Partial<Filters>;
  onFiltersChange?: (filters: Filters) => void;
  categories?: Array<{ id: string; name: string }>;
  tags?: Array<{ id: string; name: string }>;
}

// Translations object for React component (can't use server-side useTranslations)
const translations = {
  en: {
    search: 'Search recipes...',
    sortBy: 'Sort by',
    title: 'Filters',
    difficulty: 'Difficulty',
    time: 'Cooking Time',
    season: 'Season',
    categories: 'Categories',
    tags: 'Tags',
    rating: 'Min Rating',
    apply: 'Apply',
    reset: 'Reset',
    sortOptions: {
      newest: 'Newest',
      popular: 'Most Popular',
      rating: 'Highest Rated',
      quickest: 'Quickest',
    },
    difficultyOptions: {
      all: 'All difficulties',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    },
    seasonOptions: {
      all: 'All seasons',
      spring: 'Spring',
      summer: 'Summer',
      autumn: 'Autumn',
      winter: 'Winter',
    },
  },
  fr: {
    search: 'Rechercher des recettes...',
    sortBy: 'Trier par',
    title: 'Filtres',
    difficulty: 'Difficulté',
    time: 'Temps de cuisson',
    season: 'Saison',
    categories: 'Catégories',
    tags: 'Étiquettes',
    rating: 'Note min.',
    apply: 'Appliquer',
    reset: 'Réinitialiser',
    sortOptions: {
      newest: 'Plus récent',
      popular: 'Plus populaire',
      rating: 'Mieux noté',
      quickest: 'Plus rapide',
    },
    difficultyOptions: {
      all: 'Toutes les difficultés',
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile',
    },
    seasonOptions: {
      all: 'Toutes les saisons',
      spring: 'Printemps',
      summer: 'Été',
      autumn: 'Automne',
      winter: 'Hiver',
    },
  },
  es: {
    search: 'Buscar recetas...',
    sortBy: 'Ordenar por',
    title: 'Filtros',
    difficulty: 'Dificultad',
    time: 'Tiempo de cocción',
    season: 'Temporada',
    categories: 'Categorías',
    tags: 'Etiquetas',
    rating: 'Calificación mín.',
    apply: 'Aplicar',
    reset: 'Restablecer',
    sortOptions: {
      newest: 'Más reciente',
      popular: 'Más popular',
      rating: 'Mejor calificado',
      quickest: 'Más rápido',
    },
    difficultyOptions: {
      all: 'Todas las dificultades',
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
    },
    seasonOptions: {
      all: 'Todas las temporadas',
      spring: 'Primavera',
      summer: 'Verano',
      autumn: 'Otoño',
      winter: 'Invierno',
    },
  },
  nl: {
    search: 'Recepten zoeken...',
    sortBy: 'Sorteren op',
    title: 'Filters',
    difficulty: 'Moeilijkheidsgraad',
    time: 'Kooktijd',
    season: 'Seizoen',
    categories: 'Categorieën',
    tags: 'Tags',
    rating: 'Min. beoordeling',
    apply: 'Toepassen',
    reset: 'Resetten',
    sortOptions: {
      newest: 'Nieuwste',
      popular: 'Populairste',
      rating: 'Hoogst beoordeeld',
      quickest: 'Snelste',
    },
    difficultyOptions: {
      all: 'Alle moeilijkheidsgraden',
      easy: 'Makkelijk',
      medium: 'Gemiddeld',
      hard: 'Moeilijk',
    },
    seasonOptions: {
      all: 'Alle seizoenen',
      spring: 'Lente',
      summer: 'Zomer',
      autumn: 'Herfst',
      winter: 'Winter',
    },
  },
};

export default function RecipeFilters({
  lang,
  initialFilters = {},
  categories = [],
  tags = [],
  onFiltersChange,
}: RecipeFiltersProps) {
  const t = translations[lang] || translations.en;

  const [filters, setFilters] = useState<Filters>({
    search: '',
    difficulty: undefined,
    maxTime: undefined,
    minTime: undefined,
    season: undefined,
    categories: [],
    tags: [],
    sortBy: 'newest',
    minRating: undefined,
    ...initialFilters,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Sync with URL params (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const sortParam = params.get('sort') as SortByOption | null;

    const urlFilters: Partial<Filters> = {
      search: params.get('search') || undefined,
      difficulty: (params.get('difficulty') as Difficulty) || undefined,
      maxTime: params.get('maxTime') ? parseInt(params.get('maxTime')!) : undefined,
      minTime: params.get('minTime') ? parseInt(params.get('minTime')!) : undefined,
      season: (params.get('season') as Season) || undefined,
      categories: params.getAll('category'),
      tags: params.getAll('tag'),
      sortBy: sortParam ?? 'newest',
      minRating: params.get('rating') ? parseFloat(params.get('rating')!) : undefined,
    };

    setFilters((prev) => ({ ...prev, ...urlFilters }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, String(value));
      }
    });

    if (onFiltersChange) {
      onFiltersChange(filters);
    } else {
      window.location.href = `${window.location.pathname}?${params.toString()}`;
    }
  };

  const resetFilters = () => {
    const defaultFilters: Filters = {
      search: '',
      difficulty: undefined,
      maxTime: undefined,
      minTime: undefined,
      season: undefined,
      categories: [],
      tags: [],
      sortBy: 'newest',
      minRating: undefined,
    };

    setFilters(defaultFilters);

    if (onFiltersChange) {
      onFiltersChange(defaultFilters);
    } else {
      window.location.href = window.location.pathname;
    }
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== '' && (!Array.isArray(v) || v.length > 0) && v !== 'newest'
  ).length;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t.search}
          value={filters.search || ''}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          className="pl-9 pr-10"
        />
        {filters.search && (
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Sort Options */}
      <Select
        value={filters.sortBy}
        onValueChange={(value: SortByOption) => setFilters((prev) => ({ ...prev, sortBy: value }))}
      >
        <SelectTrigger>
          <SelectValue placeholder={t.sortBy} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">{t.sortOptions.newest}</SelectItem>
          <SelectItem value="popular">{t.sortOptions.popular}</SelectItem>
          <SelectItem value="rating">{t.sortOptions.rating}</SelectItem>
          <SelectItem value="quickest">{t.sortOptions.quickest}</SelectItem>
        </SelectContent>
      </Select>

      {/* Expandable Filters */}
      <div className="border-t pt-4">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium w-full"
        >
          <Filter className="h-4 w-4" />
          {t.title}
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4 pt-2">
          {/* Difficulty */}
          <div>
            <Label>{t.difficulty}</Label>
            <Select
              value={filters.difficulty || ''}
              onValueChange={(value: '' | Difficulty) =>
                setFilters((prev) => ({
                  ...prev,
                  difficulty: value === '' ? undefined : value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t.difficultyOptions.all} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t.difficultyOptions.all}</SelectItem>
                <SelectItem value="easy">{t.difficultyOptions.easy}</SelectItem>
                <SelectItem value="medium">{t.difficultyOptions.medium}</SelectItem>
                <SelectItem value="hard">{t.difficultyOptions.hard}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Range */}
          <div>
            <Label>{t.time}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                min="0"
                max="480"
                value={filters.minTime || ''}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minTime: e.target.value ? parseInt(e.target.value) : undefined,
                  }))
                }
                className="w-20"
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max"
                min="0"
                max="480"
                value={filters.maxTime || ''}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxTime: e.target.value ? parseInt(e.target.value) : undefined,
                  }))
                }
                className="w-20"
              />
              <span className="text-sm text-muted-foreground">min</span>
            </div>
          </div>

          {/* Season */}
          <div>
            <Label>{t.season}</Label>
            <Select
              value={filters.season || ''}
              onValueChange={(value: '' | Season) =>
                setFilters((prev) => ({
                  ...prev,
                  season: value === '' ? undefined : value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t.seasonOptions.all} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t.seasonOptions.all}</SelectItem>
                <SelectItem value="spring">{t.seasonOptions.spring}</SelectItem>
                <SelectItem value="summer">{t.seasonOptions.summer}</SelectItem>
                <SelectItem value="autumn">{t.seasonOptions.autumn}</SelectItem>
                <SelectItem value="winter">{t.seasonOptions.winter}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <Label>{t.categories}</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories?.includes(category.id) || false}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [...(filters.categories || []), category.id]
                          : filters.categories?.filter((c) => c !== category.id) || [];
                        setFilters((prev) => ({ ...prev, categories: newCategories }));
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <Label>{t.tags}</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const isSelected = filters.tags?.includes(tag.id) || false;
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => {
                        const newTags = isSelected
                          ? filters.tags?.filter((t) => t !== tag.id) || []
                          : [...(filters.tags || []), tag.id];
                        setFilters((prev) => ({ ...prev, tags: newTags }));
                      }}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted-foreground/20'
                      }`}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Rating */}
          <div>
            <Label>
              {t.rating}: {filters.minRating || 0} ★
            </Label>
            <Slider
              value={[filters.minRating || 0]}
              onValueChange={([value]) =>
                setFilters((prev) => ({
                  ...prev,
                  minRating: value > 0 ? value : undefined,
                }))
              }
              min={0}
              max={5}
              step={0.5}
              className="mt-2"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button type="submit" className="flex-1">
              {t.apply}
            </Button>
            <Button type="button" variant="outline" onClick={resetFilters}>
              {t.reset}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
