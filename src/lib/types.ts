import type { Tables } from './database.type';

export type Language = 'en' | 'es' | 'fr' | 'nl';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type Recipe = Tables<'recipes'>;

// export interface Recipe extends Tables<'recipes'> {
//   difficulty?: Difficulty;  // After DB migration
//   prep_time?: number | null;
//   cook_time?: number | null;
//   rating?: number;
//   rating_count?: number;
//   view_count?: number;
//  }

export type Difficulty = 'easy' | 'medium' | 'hard';

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export type ApiResult<T> = { success: true; data: T } | { success: false; error: ApiError };

export interface RecipeTranslation {
  id: string;
  recipe_id: string | null;
  lang: Language;
  title: string;
  description: string | null;
}

export interface RecipeStep {
  id: string;
  recipe_id: string | null;
  position: number;
  instruction: string;
  note: string | null;
  created_at: string | null;
}

export interface RecipeStepTranslation {
  id: string;
  recipe_step_id: string | null;
  lang: Language;
  instruction: string;
}

export interface Ingredient {
  id: string;
  name: string;
  created_at: string | null;
}

export interface IngredientTranslation {
  id: string;
  ingredient_id: string | null;
  lang: Language;
  name: string;
}

export interface RecipeIngredient {
  id: string;
  recipe_id: string | null;
  ingredient_id: string | null;
  quantity: number | null;
  unit: string | null;
  note: string | null;
  section: string | null;
  position: number | null;
  created_at: string | null;
}

export interface RecipeNutrition {
  id: string;
  recipe_id: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  saturated_fat: number | null;
  monounsaturated_fat: number | null;
  polyunsaturated_fat: number | null;
  trans_fat: number | null;
  fiber: number | null;
  sugar: number | null;
  sodium: number | null;
  created_at: string | null;
}

export interface Tag {
  id: string;
  name: string;
  created_at: string | null;
}

export interface TagTranslation {
  id: string;
  tag_id: string | null;
  lang: Language;
  name: string;
}

export interface RecipeTag {
  id: string;
  recipe_id: string | null;
  tag_id: string | null;
  created_at: string | null;
}

export interface Time {
  id: string;
  name: string | null;
  created_at: string | null;
}

export interface RecipeTime {
  id: string;
  recipe_id: string | null;
  times_id: string | null;
  minutes: number;
  created_at: string | null;
}

export interface FullRecipe extends Recipe {
  translations?: RecipeTranslation[];
  steps?: RecipeStepWithTranslations[];
  ingredients?: RecipeIngredientWithDetails[];
  nutrition?: RecipeNutrition;
  tags?: TagWithTranslations[];
  times?: RecipeTimeWithDetails[];
}

export interface RecipeStepWithTranslations extends RecipeStep {
  translations?: RecipeStepTranslation[];
}

export interface RecipeIngredientWithDetails extends RecipeIngredient {
  ingredient?: Ingredient & {
    translations?: IngredientTranslation[];
  };
}

export interface TagWithTranslations extends Tag {
  translations?: TagTranslation[];
}

export interface RecipeTimeWithDetails extends RecipeTime {
  time?: Time;
}

// Fixed RecipeCard type to match actual data structure
export type RecipeCard = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image_url: string | null;
  season: string[] | null;
  total_time: number | null;
  featured: boolean | null;
  servings: number | null;
  calories: number | null;
  protein: number | null;
  tags?: Pick<Tag, 'id' | 'name'>[];
};

export interface VFullRecipe {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  servings: number | null;
  total_time: number | null;
  season: Season[] | null;
  image_url: string;
  featured: boolean;

  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  fiber: number | null;
  sugar: number | null;
  salt: number | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon?: string;
  recipe_count?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  avatar_url?: string;
  favorites?: string[]; // recipe IDs
}

export interface RecipeFilters {
  featured?: boolean;
  season?: Season;
  tags?: string[];
  categories?: string[];
  difficulty?: Difficulty;
  minRating?: number;
  maxTime?: number;
  minTime?: number;
  search?: string;
  lang?: Language;
  sortBy?: 'newest' | 'popular' | 'rating' | 'quickest';
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
}

export interface RecipeCardProps {
  recipe: RecipeCard | FullRecipe;
  variant?: 'hero' | 'default' | 'compact' | 'list';
  lang?: Language;
  showNutrition?: boolean;
}

export interface RecipeStepProps {
  step: RecipeStepWithTranslations;
  lang?: Language;
  showNotes?: boolean;
}

export interface IngredientListProps {
  ingredients: RecipeIngredientWithDetails[];
  lang?: Language;
  groupBySection?: boolean;
}

export interface RecipePathData {
  recipe_id: string;
  lang: Language;
  slug: string;
  title: string;
  description: string | null;
  image_url: string;
}

export interface FullLocalizedRecipe {
  id: string;
  slug: string;
  image_url: string | null;
  servings: number | null;
  serving_type: string | null;
  total_time: number | null;
  featured: boolean | null;

  lang: Language;
  title: string;
  description: string | null;

  ingredients: LocalizedIngredientWithDetails[];
  steps: LocalizedStepWithDetails[];
  nutrition: RecipeNutrition | null;
  tags: TagWithTranslations[];
  times: RecipeTimeWithDetails[];
}

export interface LocalizedIngredientWithDetails extends Omit<RecipeIngredient, 'ingredient_id'> {
  name: string;
  section: string | null;
  position: number | null;
}

export interface LocalizedStepWithDetails {
  position: number;
  instruction: string;
  note: string | null;
}

export type LocalizedRecipePath = {
  slug: string;
  recipe_id: string;
  lang: string;
};
