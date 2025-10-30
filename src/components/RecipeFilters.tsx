import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import useSearchP

export default function RecipeFilters({ lang }: RecipeFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    difficulty: searchParams.get('difficulty') || '',
    maxTime: searchParams.get('maxTime') || '',
    tags: searchParams.getAll('tags'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.difficulty) params.set('difficulty', filters.difficulty);
    if (filters.maxTime) params.set('maxTime', filters.maxTime);
    filters.tags.forEach(tag => params.append('tags', tag));
    
    setSearchParams(params);
  };

interface RecipeFiltersProps {
  lang: 'fr' | 'en';
}

export default function RecipeFilters({ lang }: RecipeFiltersProps) {
  const t = {
    searchPlaceholder:
      lang === 'fr' ? 'Nom de la recette ou ingrédient...' : 'Recipe name or ingredient...',
    difficultyLabel: lang === 'fr' ? 'Difficulté' : 'Difficulty',
    timeLabel: lang === 'fr' ? 'Temps Max. (minutes)' : 'Max Time (minutes)',
    seasonLabel: lang === 'fr' ? 'Saison' : 'Season',
    tagsLabel: lang === 'fr' ? 'Tags & Catégories' : 'Tags & Categories',
    applyButton: lang === 'fr' ? 'Rechercher' : 'Search',
  };

  const tags = [
    { id: '1', name: lang === 'fr' ? 'Végétarien' : 'Vegetarian' },
    { id: '2', name: lang === 'fr' ? 'Sans Gluten' : 'Gluten-Free' },
    { id: '3', name: lang === 'fr' ? 'Rapide' : 'Quick' },
    { id: '4', name: lang === 'fr' ? 'Dessert' : 'Dessert' },
    { id: '5', name: lang === 'fr' ? 'Plat Principal' : 'Main Dish' },
  ];

  const difficulties = [
    { value: 'easy', label: lang === 'fr' ? 'Facile' : 'Easy' },
    { value: 'medium', label: lang === 'fr' ? 'Moyen' : 'Medium' },
    { value: 'hard', label: lang === 'fr' ? 'Difficile' : 'Hard' },
  ];

  return (
    <form className="space-y-6">
      {/* Search Input */}
      <div className="space-y-2">
        <Label htmlFor="search">{t.searchPlaceholder}</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="search" name="search" placeholder={t.searchPlaceholder} className="pl-9" />
        </div>
      </div>

      {/* Difficulty Select */}
      <div className="space-y-2">
        <Label htmlFor="difficulty">{t.difficultyLabel}</Label>
        <Select name="difficulty">
          <SelectTrigger id="difficulty">
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

      {/* Max Time Input */}
      <div className="space-y-2">
        <Label htmlFor="maxTime">{t.timeLabel}</Label>
        <div className="flex items-center space-x-2">
          <Input id="maxTime" name="maxTime" type="number" placeholder="60" min="5" max="240" />
          <span className="text-sm text-muted-foreground">
            {lang === 'fr' ? 'minutes' : 'minutes'}
          </span>
        </div>
      </div>

      {/* Tags Checkboxes */}
      <div className="space-y-3">
        <Label>{t.tagsLabel}</Label>
        <div className="flex flex-col space-y-2 max-h-52 overflow-y-auto pr-2">
          {tags.map((tag) => (
            <div key={tag.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={`tag-${tag.id}`}
                name="tags"
                value={tag.id}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor={`tag-${tag.id}`} className="font-normal cursor-pointer">
                {tag.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button - Desktop only */}
      <div className="hidden lg:block pt-2">
        <Button type="submit" className="w-full">
          {t.applyButton}
        </Button>
      </div>
    </form>
  );
}
