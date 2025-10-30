import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.type';
import type { Recipe, RecipeFilters, PaginatedResponse, ApiResult, Language } from './types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// FIX: Implement working filters
export async function getRecipes(
  filters?: RecipeFilters,
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<Recipe>> {
  try {
    let query = supabase
      .from('recipes')
      .select('*, recipe_nutrition(*), recipe_tags(tag_id)', { count: 'exact' });

    // Search filter
    if (filters?.search) {
      query = query.textSearch('title', filters.search, {
        type: 'websearch',
        config: 'english',
      });
    }

    // Difficulty filter (after adding to DB)
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

    // If filtering by tags, filter in JS (until we fix the query)
    let filteredData = data || [];
    if (filters?.tags?.length && data) {
      const { data: taggedRecipes } = await supabase
        .from('recipe_tags')
        .select('recipe_id')
        .in('tag_id', filters.tags);

      const recipeIds = new Set(taggedRecipes?.map((rt) => rt.recipe_id));
      filteredData = data.filter((r) => recipeIds.has(r.id));
    }

    return {
      data: filteredData,
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

// FIX: Optimize with single query
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
        recipe_translations!inner(title, description),
        recipe_nutrition(*),
        recipe_ingredients(
          *,
          ingredient:ingredients(
            *,
            ingredient_translations!inner(name)
          )
        ),
        recipe_steps(
          *,
          recipe_step_translations!inner(instruction)
        ),
        recipe_tags(
          tag:tags(
            *,
            tag_translations!inner(name)
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

// ADD: Increment view counter
export async function incrementRecipeViews(recipeId: string): Promise<void> {
  try {
    await supabase.rpc('increment_view_count', { recipe_id: recipeId });
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}

// ADD: User interactions
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
