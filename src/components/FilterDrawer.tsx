import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { SlidersHorizontal, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import type { Language, Difficulty } from '@/lib/types';

interface FilterDrawerProps {
  lang: Language;
  initialValues?: {
    search?: string;
    difficulty?: Difficulty;
    maxTime?: number;
    tags?: string[];
  };
  categories?: Array<{ id: string; name: string }>;
  tags?: Array<{ id: string; name: string }>;
}

// Translations object for React component
const translations = {
  en: {
    trigger: 'Filter Recipes',
    title: 'Filter Options',
    description: 'Refine your recipe search.',
    apply: 'Apply Filters',
    searchPlaceholder: 'Recipe name or ingredient...',
    difficultyLabel: 'Difficulty',
    timeLabel: 'Max Time (minutes)',
    tagsLabel: 'Tags & Categories',
    minutes: 'minutes',
    difficulties: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    },
  },
  fr: {
    trigger: 'Filtrer les Recettes',
    title: 'Options de Filtrage',
    description: 'Affinez votre recherche de recettes.',
    apply: 'Appliquer les Filtres',
    searchPlaceholder: 'Nom de la recette ou ingrédient...',
    difficultyLabel: 'Difficulté',
    timeLabel: 'Temps Max. (minutes)',
    tagsLabel: 'Tags & Catégories',
    minutes: 'minutes',
    difficulties: {
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile',
    },
  },
  es: {
    trigger: 'Filtrar Recetas',
    title: 'Opciones de Filtrado',
    description: 'Refina tu búsqueda de recetas.',
    apply: 'Aplicar Filtros',
    searchPlaceholder: 'Nombre de receta o ingrediente...',
    difficultyLabel: 'Dificultad',
    timeLabel: 'Tiempo Máx. (minutos)',
    tagsLabel: 'Etiquetas y Categorías',
    minutes: 'minutos',
    difficulties: {
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
    },
  },
  nl: {
    trigger: 'Filter Recepten',
    title: 'Filteropties',
    description: 'Verfijn je receptzoektocht.',
    apply: 'Filters Toepassen',
    searchPlaceholder: 'Receptnaam of ingrediënt...',
    difficultyLabel: 'Moeilijkheidsgraad',
    timeLabel: 'Max. Tijd (minuten)',
    tagsLabel: 'Tags & Categorieën',
    minutes: 'minuten',
    difficulties: {
      easy: 'Makkelijk',
      medium: 'Gemiddeld',
      hard: 'Moeilijk',
    },
  },
};

export default function FilterDrawer({
  lang,
  initialValues,
  categories = [],
  tags = [],
}: FilterDrawerProps) {
  const t = translations[lang] || translations.en;

  const [filters, setFilters] = useState({
    search: initialValues?.search || '',
    difficulty: initialValues?.difficulty || '',
    maxTime: initialValues?.maxTime?.toString() || '',
    tags: initialValues?.tags || ([] as string[]),
  });

  // Read from URL on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    setFilters({
      search: params.get('search') || '',
      difficulty: params.get('difficulty') || '',
      maxTime: params.get('maxTime') || '',
      tags: params.getAll('tags'),
    });
  }, []);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.difficulty) params.set('difficulty', filters.difficulty);
    if (filters.maxTime) params.set('maxTime', filters.maxTime);
    filters.tags.forEach((tag) => params.append('tags', tag));

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.location.href = newUrl;
  };

  const handleInputChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagChange = (tagId: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      tags: checked ? [...prev.tags, tagId] : prev.tags.filter((t) => t !== tagId),
    }));
  };

  const difficulties: Array<{ value: Difficulty; label: string }> = [
    { value: 'easy', label: t.difficulties.easy },
    { value: 'medium', label: t.difficulties.medium },
    { value: 'hard', label: t.difficulties.hard },
  ];

  return (
    <div className="lg:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {t.trigger}
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm overflow-y-auto max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>{t.title}</DrawerTitle>
              <DrawerDescription>{t.description}</DrawerDescription>
            </DrawerHeader>

            <div className="p-4 space-y-4">
              <div className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="drawer-search">{t.searchPlaceholder}</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="drawer-search"
                      name="search"
                      placeholder={t.searchPlaceholder}
                      className="pl-9"
                      value={filters.search}
                      onChange={(e) => handleInputChange('search', e.target.value)}
                    />
                  </div>
                </div>

                {/* Difficulty */}
                <div className="space-y-2">
                  <Label htmlFor="drawer-difficulty">{t.difficultyLabel}</Label>
                  <Select
                    name="difficulty"
                    value={filters.difficulty}
                    onValueChange={(value) => handleInputChange('difficulty', value)}
                  >
                    <SelectTrigger id="drawer-difficulty">
                      <SelectValue placeholder={t.difficultyLabel} />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((d) => (
                        <SelectItem key={d.value} value={d.value}>
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Max Time */}
                <div className="space-y-2">
                  <Label htmlFor="drawer-maxTime">{t.timeLabel}</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="drawer-maxTime"
                      name="maxTime"
                      type="number"
                      placeholder="60"
                      min="5"
                      max="240"
                      value={filters.maxTime}
                      onChange={(e) => handleInputChange('maxTime', e.target.value)}
                    />
                    <span className="text-sm text-muted-foreground">{t.minutes}</span>
                  </div>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="space-y-3">
                    <Label>{t.tagsLabel}</Label>
                    <div className="flex flex-col space-y-2 max-h-52 overflow-y-auto pr-2">
                      {tags.map((tag) => (
                        <div key={tag.id} className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id={`drawer-tag-${tag.id}`}
                            name="tags"
                            value={tag.id}
                            checked={filters.tags.includes(tag.id)}
                            onChange={(e) => handleTagChange(tag.id, e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label
                            htmlFor={`drawer-tag-${tag.id}`}
                            className="font-normal cursor-pointer"
                          >
                            {tag.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button onClick={handleApplyFilters}>{t.apply}</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
