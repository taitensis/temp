import type {
  FullLocalizedRecipe,
  Language,
  LocalizedIngredientWithDetails,
  LocalizedStepWithDetails,
  RecipeNutrition,
  TagWithTranslations,
  RecipeTimeWithDetails,
} from '@/lib/types';

// Types for the raw Supabase query result
// Note: These types match exactly what's selected in the Supabase query
interface RawIngredientTranslation {
  name: string;
  lang: 'en' | 'es' | 'fr' | 'nl'; // All languages from database
}

interface RawIngredient {
  id: string;
  name: string;
  created_at: string | null;
  ingredient_translations?: RawIngredientTranslation[];
}

interface RawRecipeIngredient {
  id: string;
  recipe_id: string | null;
  ingredient_id: string | null;
  quantity: number | null;
  unit: string | null;
  note: string | null;
  section: string | null;
  position: number | null;
  created_at: string | null;
  ingredient?: RawIngredient | null;
}

interface RawStepTranslation {
  instruction: string;
  lang: 'en' | 'es' | 'fr' | 'nl'; // All languages from database
}

interface RawRecipeStep {
  id: string;
  recipe_id: string | null;
  position: number;
  note: string | null;
  created_at: string | null;
  recipe_step_translations?: RawStepTranslation[];
}

interface RawRecipeNutrition {
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

interface RawTagTranslation {
  name: string;
  lang: 'en' | 'es' | 'fr' | 'nl'; // All languages from database
}

interface RawTag {
  id: string;
  name: string;
  created_at: string | null;
  tag_translations?: RawTagTranslation[];
}

interface RawRecipeTag {
  tag?: RawTag | null;
}

interface RawTime {
  id: string;
  name: string | null;
  created_at: string | null;
}

interface RawRecipeTime {
  id: string;
  recipe_id: string | null;
  times_id: string | null;
  minutes: number;
  created_at: string | null;
  time?: RawTime | null;
}

interface RawRecipeTranslation {
  title: string;
  description: string | null;
  slug: string;
  lang: 'en' | 'es' | 'fr' | 'nl'; // All languages from database
}

interface RawSupabaseRecipe {
  id: string;
  image_url: string | null;
  servings: number | null;
  serving_type: string | null;
  total_time: number | null;
  featured: boolean | null;
  recipe_translations?: RawRecipeTranslation[];
  recipe_ingredients?: RawRecipeIngredient[];
  recipe_steps?: RawRecipeStep[];
  recipe_nutrition?: RawRecipeNutrition | null;
  recipe_tags?: RawRecipeTag[];
  recipe_times?: RawRecipeTime[];
}

/**
 * Transform raw Supabase query result into a FullLocalizedRecipe
 * This function handles the complex nested structure from the database
 */
export function transformToFullLocalizedRecipe(
  data: RawSupabaseRecipe,
  lang: Language
): FullLocalizedRecipe {
  // Extract basic recipe info
  const recipe: FullLocalizedRecipe = {
    id: data.id,
    slug: data.recipe_translations?.[0]?.slug || '',
    image_url: data.image_url,
    servings: data.servings,
    serving_type: data.serving_type,
    total_time: data.total_time,
    featured: data.featured,
    lang,
    title: data.recipe_translations?.[0]?.title || '',
    description: data.recipe_translations?.[0]?.description || null,
    ingredients: [],
    steps: [],
    nutrition: null,
    tags: [],
    times: [],
  };

  // Transform ingredients
  if (data.recipe_ingredients && Array.isArray(data.recipe_ingredients)) {
    recipe.ingredients = data.recipe_ingredients
      .map((ri: RawRecipeIngredient): LocalizedIngredientWithDetails | null => {
        const ingredientTranslation = ri.ingredient?.ingredient_translations?.[0];
        if (!ingredientTranslation) return null;

        return {
          id: ri.id,
          recipe_id: ri.recipe_id,
          quantity: ri.quantity,
          unit: ri.unit,
          note: ri.note,
          section: ri.section,
          position: ri.position,
          created_at: ri.created_at,
          name: ingredientTranslation.name,
        };
      })
      .filter((item): item is LocalizedIngredientWithDetails => item !== null)
      .sort((a, b) => (a.position || 0) - (b.position || 0));
  }

  // Transform steps
  if (data.recipe_steps && Array.isArray(data.recipe_steps)) {
    recipe.steps = data.recipe_steps
      .map((rs: RawRecipeStep): LocalizedStepWithDetails | null => {
        const stepTranslation = rs.recipe_step_translations?.[0];
        if (!stepTranslation) return null;

        return {
          position: rs.position,
          instruction: stepTranslation.instruction,
          note: rs.note,
        };
      })
      .filter((item): item is LocalizedStepWithDetails => item !== null)
      .sort((a, b) => a.position - b.position);
  }

  // Transform nutrition
  if (data.recipe_nutrition) {
    recipe.nutrition = {
      id: data.recipe_nutrition.id,
      recipe_id: data.recipe_nutrition.recipe_id,
      calories: data.recipe_nutrition.calories,
      protein: data.recipe_nutrition.protein,
      carbs: data.recipe_nutrition.carbs,
      fat: data.recipe_nutrition.fat,
      saturated_fat: data.recipe_nutrition.saturated_fat,
      monounsaturated_fat: data.recipe_nutrition.monounsaturated_fat,
      polyunsaturated_fat: data.recipe_nutrition.polyunsaturated_fat,
      trans_fat: data.recipe_nutrition.trans_fat,
      fiber: data.recipe_nutrition.fiber,
      sugar: data.recipe_nutrition.sugar,
      sodium: data.recipe_nutrition.sodium,
      created_at: data.recipe_nutrition.created_at,
    } as RecipeNutrition;
  }

  // Transform tags
  if (data.recipe_tags && Array.isArray(data.recipe_tags)) {
    recipe.tags = data.recipe_tags
      .map((rt: RawRecipeTag): TagWithTranslations | null => {
        const tag = rt.tag;
        if (!tag) return null;

        const tagTranslation = tag.tag_translations?.[0];
        if (!tagTranslation) return null;

        return {
          id: tag.id,
          name: tagTranslation.name,
          created_at: tag.created_at,
          translations: [
            {
              id: '', // Not available from query
              tag_id: tag.id,
              name: tagTranslation.name,
              lang: tagTranslation.lang,
            },
          ],
        };
      })
      .filter((item): item is TagWithTranslations => item !== null);
  }

  // Transform times
  if (data.recipe_times && Array.isArray(data.recipe_times)) {
    recipe.times = data.recipe_times
      .map((rt: RawRecipeTime): RecipeTimeWithDetails | null => {
        if (!rt.time) return null;

        return {
          id: rt.id,
          recipe_id: rt.recipe_id,
          times_id: rt.times_id,
          minutes: rt.minutes,
          created_at: rt.created_at,
          time: rt.time,
        };
      })
      .filter((item): item is RecipeTimeWithDetails => item !== null);
  }

  return recipe;
}
