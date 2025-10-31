import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.type';
import type {
  RecipeCard,
  FullLocalizedRecipe,
  RecipeFilters,
  PaginatedResponse,
  ApiResult,
  Language,
  LocalizedRecipePath,
} from './types';
import { transformToFullLocalizedRecipe } from '@/lib/transform/transformToFullLocalizedRecipe';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

/**
 * Fetch recipes with filters and pagination
 */
export async function getRecipes(
  filters?: RecipeFilters,
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<RecipeCard>> {
  try {
    let query = supabase
      .from('recipes')
      .select(
        `
        id,
        image_url,
        season,
        total_time,
        featured,
        servings,
        recipe_translations!inner(slug, title, description, lang),
        recipe_nutrition(calories, protein)
      `,
        { count: 'exact' }
      )
      .eq('recipe_translations.lang', filters?.lang ?? 'en');

    // Search filter
    if (filters?.search) {
      query = query.ilike('recipe_translations.title', `%${filters.search}%`);
    }

    // Difficulty filter (when added to DB schema)
    if (filters?.difficulty) {
      query = query.eq('difficulty', filters.difficulty);
    }

    // Time filters
    if (filters?.maxTime) {
      query = query.lte('total_time', filters.maxTime);
    }
    if (filters?.minTime) {
      query = query.gte('total_time', filters.minTime);
    }

    // Featured filter
    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }

    // Season filter
    if (filters?.season) {
      query = query.contains('season', [filters.season]);
    }

    // Sorting
    switch (filters?.sortBy) {
      case 'popular':
        query = query.order('view_count', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      case 'quickest':
        query = query.order('total_time', { ascending: true });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    // If filtering by tags, filter in JS (until we add proper join)
    let filteredData = data || [];
    if (filters?.tags?.length && data) {
      const { data: taggedRecipes } = await supabase
        .from('recipe_tags')
        .select('recipe_id')
        .in('tag_id', filters.tags);

      const recipeIds = new Set(taggedRecipes?.map((rt) => rt.recipe_id));
      filteredData = data.filter((r) => recipeIds.has(r.id));
    }

    // Transform data to RecipeCard format
    const mappedData: RecipeCard[] = filteredData.map((r) => {
      const translation = Array.isArray(r.recipe_translations)
        ? r.recipe_translations[0]
        : r.recipe_translations;
      const nutrition = Array.isArray(r.recipe_nutrition)
        ? r.recipe_nutrition[0]
        : r.recipe_nutrition;

      return {
        id: r.id,
        slug: translation?.slug || '',
        title: translation?.title || '',
        description: translation?.description || null,
        image_url: r.image_url,
        servings: r.servings,
        total_time: r.total_time,
        featured: r.featured,
        season: r.season,
        calories: nutrition?.calories ?? null,
        protein: nutrition?.protein ?? null,
      };
    });

    return {
      data: mappedData,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
      error: null,
    };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return {
      data: [],
      pagination: { page, limit, total: 0, totalPages: 0 },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch a single recipe with all localized details
 */
export async function getFullLocalizedRecipe(
  recipeId: string,
  lang: Language
): Promise<FullLocalizedRecipe | null> {
  try {
    // Single optimized query
    const { data, error } = await supabase
      .from('recipes')
      .select(
        `
        *,
        recipe_translations!inner(title, description, slug, lang),
        recipe_nutrition(*),
        recipe_ingredients(
          *,
          ingredient:ingredients(
            *,
            ingredient_translations!inner(name, lang)
          )
        ),
        recipe_steps(
          *,
          recipe_step_translations!inner(instruction, lang)
        ),
        recipe_tags(
          tag:tags(
            *,
            tag_translations!inner(name, lang)
          )
        ),
        recipe_times(
          *,
          time:times(*)
        )
      `
      )
      .eq('id', recipeId)
      .eq('recipe_translations.lang', lang)
      .eq('recipe_ingredients.ingredient.ingredient_translations.lang', lang)
      .eq('recipe_steps.recipe_step_translations.lang', lang)
      .eq('recipe_tags.tag.tag_translations.lang', lang)
      .single();

    if (error) throw error;
    if (!data) return null;

    // Transform the data
    return transformToFullLocalizedRecipe(data, lang);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

/**
 * Increment view count for a recipe
 */
export async function incrementRecipeViews(recipeId: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('increment_view_count', { recipe_id: recipeId });
    if (error) {
      console.warn('View count increment function not available:', error.message);
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}

/**
 * Toggle favorite status for a user
 */
export async function toggleFavorite(
  recipeId: string,
  userId: string
): Promise<ApiResult<boolean>> {
  try {
    const { data: existing } = await supabase
      .from('user_favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('recipe_id', recipeId)
      .single();

    if (existing) {
      await supabase.from('user_favorites').delete().eq('id', existing.id);
      return { success: true, data: false };
    } else {
      await supabase.from('user_favorites').insert({ user_id: userId, recipe_id: recipeId });
      return { success: true, data: true };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'FAVORITE_ERROR',
        message: 'Failed to toggle favorite',
        details: error,
      },
    };
  }
}

/**
 * Get all localized recipe paths for static site generation
 */
export async function getLocalizedRecipePaths(): Promise<LocalizedRecipePath[]> {
  const { data, error } = await supabase
    .from('recipe_translations')
    .select('recipe_id, slug, lang');

  if (error) {
    console.error('Error fetching localized recipe paths:', error);
    return [];
  }

  return (
    data
      ?.filter((t) => t.recipe_id !== null)
      .map((t) => ({
        recipe_id: t.recipe_id as string,
        slug: t.slug,
        lang: t.lang as Language,
      })) || []
  );
}
