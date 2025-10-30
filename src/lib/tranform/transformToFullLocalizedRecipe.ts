import type {
  FullLocalizedRecipe,
  FullRecipe,
  Language,
  LocalizedIngredientWithDetails,
  LocalizedStepWithDetails,
  RecipeNutrition,
  TagWithTranslations,
  RecipeTimeWithDetails,
} from '@/lib/types';

export function transformToFullLocalizedRecipe(
  recipe: FullRecipe,
  lang: Language
): FullLocalizedRecipe {
  const translation = recipe.translations?.find((t) => t.lang === lang);

  const ingredients: LocalizedIngredientWithDetails[] =
    recipe.ingredients?.map((i) => {
      const name =
        i.ingredient?.translations?.find((t) => t.lang === lang)?.name ?? i.ingredient?.name ?? '';
      return {
        id: i.id,
        recipe_id: i.recipe_id,
        quantity: i.quantity,
        unit: i.unit,
        note: i.note,
        section: i.section,
        position: i.position,
        created_at: i.created_at,
        name,
      };
    }) ?? [];

  const steps: LocalizedStepWithDetails[] =
    recipe.steps?.map((s) => {
      const instruction =
        s.translations?.find((t) => t.lang === lang)?.instruction ?? s.instruction;
      return {
        position: s.position,
        instruction,
        note: s.note,
      };
    }) ?? [];

  const tags: TagWithTranslations[] = recipe.tags ?? [];
  const times: RecipeTimeWithDetails[] = recipe.times ?? [];
  const nutrition: RecipeNutrition | null = recipe.nutrition ?? null;

  return {
    id: recipe.id,
    slug: recipe.slug,
    image_url: recipe.image_url ?? '',
    servings: recipe.servings,
    serving_type: recipe.serving_type ?? null,
    total_time: recipe.total_time,
    featured: recipe.featured ?? false,

    lang,
    title: translation?.title ?? recipe.title,
    description: translation?.description ?? recipe.description,

    ingredients,
    steps,
    nutrition,
    tags,
    times,
  };
}
