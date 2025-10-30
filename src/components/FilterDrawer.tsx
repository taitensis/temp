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
import { SlidersHorizontal } from 'lucide-react';
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

interface FilterDrawerProps {
  lang: 'fr' | 'en';
  initialValues?: {
    search?: string;
    difficulty?: string;
    maxTime?: string;
    tags?: string[];
  };
}

export default function FilterDrawer({ lang, initialValues }: FilterDrawerProps) {
  const [filters, setFilters] = useState({
    search: initialValues?.search || '',
    difficulty: initialValues?.difficulty || '',
    maxTime: initialValues?.maxTime || '',
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

  const t = {
    trigger: lang === 'fr' ? 'Filtrer les Recettes' : 'Filter Recipes',
    title: lang === 'fr' ? 'Options de Filtrage' : 'Filter Options',
    description:
      lang === 'fr' ? 'Affinez votre recherche de recettes.' : 'Refine your recipe search.',
    apply: lang === 'fr' ? 'Appliquer les Filtres' : 'Apply Filters',
    searchPlaceholder:
      lang === 'fr' ? 'Nom de la recette ou ingrédient...' : 'Recipe name or ingredient...',
    difficultyLabel: lang === 'fr' ? 'Difficulté' : 'Difficulty',
    timeLabel: lang === 'fr' ? 'Temps Max. (minutes)' : 'Max Time (minutes)',
    tagsLabel: lang === 'fr' ? 'Tags & Catégories' : 'Tags & Categories',
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
    <div className="lg:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {t.trigger}
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm overflow-y-auto">
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
                    <span className="text-sm text-muted-foreground">
                      {lang === 'fr' ? 'minutes' : 'minutes'}
                    </span>
                  </div>
                </div>

                {/* Tags */}
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
