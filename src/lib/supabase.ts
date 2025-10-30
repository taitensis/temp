import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.type';

import type {
  FullLocalizedRecipe,
  RecipePathData,
  Language,
  RecipeNutrition,
  LocalizedIngredientWithDetails,
  LocalizedStepWithDetails,
  RecipeTimeWithDetails,
  TagWithTranslations,
  Recipe,
  RecipeCard,
} from './types';

// --- client init ---
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Erreur : Une ou plusieurs variables environnement sont manquantes pour Supabase. Veuillez vérifier votre configuration.'
  );
}
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

/** fetch all recipes (with filtering capabilities) */
export async function getRecipes(filters?: {
  category?: string;
  tags?: string[];
  limit?: number;
}): Promise<Recipe[]> {
  let query = supabase.from('recipes').select('*').order('created_at', { ascending: false });

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Une erreur est survenue lors de la récupération des recettes :', error);
    throw new Error(
      `Une erreur est survenue lors de la récupération des recettes: ${error.message}`
    );
  }

  return data || [];
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching recipe by slug ${slug}:`, error);
      return null;
    }

    return data;
  } catch (err) {
    console.error(`Exception in getRecipeBySlug:`, err);
    return null;
  }
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const pattern = `%${query}%`;
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .or(`title.ilike.${pattern},description.ilike.${pattern}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Une erreur est survenue lors de la recherche des recettes :', error);
    throw new Error(`Une erreur est survenue lors de la recherche des recettes: ${error.message}`);
  }

  return data || [];
}

export async function getRecipesBySeason(season: string): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .contains('season', [season])
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

// --- i18n and routing func ---

// used by getStaticPaths to generate localised paths
export async function getLocalizedRecipePaths(): Promise<RecipePathData[]> {
  const { data, error } = await supabase.from('recipes').select(`
      id,
      slug,
      image_url,
      recipe_translations (
        lang,
        title,
        description
      )
    `);

  if (error) {
    console.error('Erreur lors de la récupération des chemins localisés:', error);
    return [];
  }

  const pathsData: RecipePathData[] = [];

  for (const recipe of data) {
    if (recipe.recipe_translations && Array.isArray(recipe.recipe_translations)) {
      for (const translation of recipe.recipe_translations) {
        pathsData.push({
          recipe_id: recipe.id,
          lang: translation.lang as Language,
          slug: recipe.slug,
          title: translation.title,
          description: translation.description,
          image_url: recipe.image_url,
        });
      }
    }
  }

  return pathsData;
}

// fetch all details of a said recipe for a specifc id and language

export async function getFullLocalizedRecipe(
  recipeId: string,
  lang: Language
): Promise<FullLocalizedRecipe | null> {
  // 1. main request
  const { data: baseData, error: baseError } = await supabase
    .from('recipes')
    .select(
      `
      *, 
      recipe_translations!inner(title, description, lang), 
      recipe_nutrition (*), 
      recipe_times!inner(minutes, time:times!inner(name))
    `
    )
    .eq('id', recipeId)
    .eq('recipe_translations.lang', lang)
    .limit(1)
    .maybeSingle();

  if (baseError) throw baseError;
  if (!baseData) return null;

  const translation = baseData.recipe_translations[0];
  const nutrition = baseData.recipe_nutrition ? baseData.recipe_nutrition[0] : null;

  // 2. fetch translated ingredients
  const { data: ingredientsData, error: ingredientsError } = await supabase
    .from('recipe_ingredients')
    .select(
      `
      quantity,
      unit,
      section,
      note,
      position,
      ingredient:ingredients!inner(
          ingredient_translations!inner(name, lang)
      )
    `
    )
    .eq('recipe_id', recipeId)
    .order('position', { ascending: true });

  if (ingredientsError) throw ingredientsError;

  const localizedIngredients: LocalizedIngredientWithDetails[] = (ingredientsData || []).map(
    (item) => {
      const ingredientName =
        item.ingredient.ingredient_translations.find((t) => t.lang === lang)?.name ||
        item.ingredient.ingredient_translations[0]?.name ||
        'Unknown Ingredient';

      return {
        quantity: item.quantity,
        unit: item.unit,
        section: item.section,
        note: item.note,
        position: item.position,
        name: ingredientName,
      } as LocalizedIngredientWithDetails;
    }
  );

  // 3. fetch translated steps
  const { data: stepsData, error: stepsError } = await supabase
    .from('recipe_steps')
    .select(
      `
      position,
      note,
      recipe_step_translations!inner(instruction, lang)
    `
    )
    .eq('recipe_id', recipeId)
    .eq('recipe_step_translations.lang', lang)
    .order('position', { ascending: true });

  if (stepsError) throw stepsError;

  const localizedSteps: LocalizedStepWithDetails[] = (stepsData || []).map((item) => ({
    position: item.position,
    instruction: item.recipe_step_translations[0]?.instruction || 'Untranslated Instruction',
    note: item.note,
  }));

  // 4. fetch translated tags
  const { data: tagsData, error: tagsError } = await supabase
    .from('recipe_tags')
    .select(
      `
      tag:tags!inner(
        id,
        tag_translations!inner(name, lang)
      )
    `
    )
    .eq('recipe_id', recipeId);

  if (tagsError) throw tagsError;

  const localizedTags: TagWithTranslations[] = (tagsData || []).map((item) => {
    const tagName =
      item.tag.tag_translations.find((t) => t.lang === lang)?.name ||
      item.tag.tag_translations[0]?.name ||
      'Untranslated Tag';

    return {
      id: item.tag.id,
      name: tagName,
      translations: item.tag.tag_translations,
    } as TagWithTranslations;
  });

  // 5. final output
  const fullRecipe: FullLocalizedRecipe = {
    // 'recipes' table
    id: baseData.id,
    slug: baseData.slug,
    image_url: baseData.image_url,
    servings: baseData.servings,
    serving_type: baseData.serving_type,
    total_time: baseData.total_time,
    featured: baseData.featured,

    // translated fields
    lang: lang,
    title: translation.title,
    description: translation.description,

    // content
    ingredients: localizedIngredients,
    steps: localizedSteps,
    nutrition: nutrition as RecipeNutrition | null,
    tags: localizedTags,
    times: baseData.recipe_times as RecipeTimeWithDetails[],
  };

  return fullRecipe;
}

export function mapRecipeToCard(recipe: Recipe): RecipeCard {
  return {
    id: recipe.id,
    title: recipe.title,
    slug: recipe.slug,
    description: recipe.description,
    image_url: recipe.image_url || '',
    total_time: recipe.total_time,
    servings: recipe.servings,
    featured: recipe.featured || false,
    tags: [], // Fetch separately if needed
  };
}

export async function getRecipesPaginated(
  page: number = 1,
  limit: number = 12,
  filters?: RecipeFilters
): Promise<PaginatedResponse<Recipe>> {
  const offset = (page - 1) * limit;

  let query = supabase
    .from('recipes')
    .select('*, count', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  // Apply filters...

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    data: data || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
    error: null,
  };
}
