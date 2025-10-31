// migrate-to-translations.ts
// This script migrates existing data from main tables to translation tables
// Run with: npx tsx migrate-to-translations.ts

import { createClient } from '@supabase/supabase-js';
import type { Database } from './src/lib/database.type';
import { config } from 'dotenv';

config();

const supabaseUrl = 'https://svdffsmhynmgggwypumm.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2ZGZmc21oeW5tZ2dnd3lwdW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MjA4NTcsImV4cCI6MjA3NTQ5Njg1N30.UmYpjfrOtVa4rBlq5H36tZz57CXN-OJWis5cdr1SaXo';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Make sure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are in your .env file');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Helper function to create a slug from a title
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Translation mappings for common terms
const ingredientTranslations: Record<string, { en: string; fr: string; es: string; nl: string }> = {
  flour: { en: 'flour', fr: 'farine', es: 'harina', nl: 'bloem' },
  water: { en: 'water', fr: 'eau', es: 'agua', nl: 'water' },
  yeast: { en: 'yeast', fr: 'levure', es: 'levadura', nl: 'gist' },
  salt: { en: 'salt', fr: 'sel', es: 'sal', nl: 'zout' },
  'olive oil': { en: 'olive oil', fr: "huile d'olive", es: 'aceite de oliva', nl: 'olijfolie' },
  sugar: { en: 'sugar', fr: 'sucre', es: 'azúcar', nl: 'suiker' },
  butter: { en: 'butter', fr: 'beurre', es: 'mantequilla', nl: 'boter' },
  egg: { en: 'egg', fr: 'œuf', es: 'huevo', nl: 'ei' },
  milk: { en: 'milk', fr: 'lait', es: 'leche', nl: 'melk' },
  cheese: { en: 'cheese', fr: 'fromage', es: 'queso', nl: 'kaas' },
  tomato: { en: 'tomato', fr: 'tomate', es: 'tomate', nl: 'tomaat' },
  onion: { en: 'onion', fr: 'oignon', es: 'cebolla', nl: 'ui' },
  garlic: { en: 'garlic', fr: 'ail', es: 'ajo', nl: 'knoflook' },
  basil: { en: 'basil', fr: 'basilic', es: 'albahaca', nl: 'basilicum' },
  pepper: { en: 'pepper', fr: 'poivre', es: 'pimienta', nl: 'peper' },
};

const tagTranslations: Record<string, { en: string; fr: string; es: string; nl: string }> = {
  italian: { en: 'Italian', fr: 'Italien', es: 'Italiano', nl: 'Italiaans' },
  vegetarian: { en: 'Vegetarian', fr: 'Végétarien', es: 'Vegetariano', nl: 'Vegetarisch' },
  vegan: { en: 'Vegan', fr: 'Végétalien', es: 'Vegano', nl: 'Veganistisch' },
  quick: { en: 'Quick', fr: 'Rapide', es: 'Rápido', nl: 'Snel' },
  easy: { en: 'Easy', fr: 'Facile', es: 'Fácil', nl: 'Makkelijk' },
  healthy: { en: 'Healthy', fr: 'Sain', es: 'Saludable', nl: 'Gezond' },
  'comfort food': {
    en: 'Comfort Food',
    fr: 'Cuisine réconfortante',
    es: 'Comida reconfortante',
    nl: 'Comfortfood',
  },
};

async function migrateRecipeTranslations() {
  console.log('\n📝 1. Migrating recipes to recipe_translations...');

  const { data: recipes } = await supabase.from('recipes').select('id, title, description');

  if (!recipes?.length) {
    console.log('  ⚠️  No recipes found');
    return;
  }

  console.log(`  Found ${recipes.length} recipes to migrate`);

  const recipeTranslations = recipes.flatMap((recipe) => [
    {
      recipe_id: recipe.id,
      lang: 'en' as const,
      title: recipe.title || 'Untitled Recipe',
      description: recipe.description,
      slug: slugify(recipe.title || 'untitled-recipe'),
    },
    {
      recipe_id: recipe.id,
      lang: 'fr' as const,
      title: recipe.title || 'Recette sans titre',
      description: recipe.description,
      slug: slugify(recipe.title || 'recette-sans-titre'),
    },
    {
      recipe_id: recipe.id,
      lang: 'es' as const,
      title: recipe.title || 'Receta sin título',
      description: recipe.description,
      slug: slugify(recipe.title || 'receta-sin-titulo'),
    },
    {
      recipe_id: recipe.id,
      lang: 'nl' as const,
      title: recipe.title || 'Recept zonder titel',
      description: recipe.description,
      slug: slugify(recipe.title || 'recept-zonder-titel'),
    },
  ]);

  const { error } = await supabase.from('recipe_translations').insert(recipeTranslations);

  if (error) {
    console.error('  ❌ Error:', error.message);
  } else {
    console.log(`  ✅ Migrated ${recipeTranslations.length} recipe translations`);
  }
}

async function migrateStepTranslations() {
  console.log('\n📝 2. Migrating recipe_steps to recipe_step_translations...');

  const { data: steps } = await supabase.from('recipe_steps').select('id, instruction');

  if (!steps?.length) {
    console.log('  ⚠️  No steps found');
    return;
  }

  console.log(`  Found ${steps.length} steps to migrate`);

  const stepTranslations = steps.flatMap((step) => [
    {
      recipe_step_id: step.id,
      lang: 'en' as const,
      instruction: step.instruction || 'No instruction',
    },
    {
      recipe_step_id: step.id,
      lang: 'fr' as const,
      instruction: step.instruction || "Pas d'instruction",
    },
    {
      recipe_step_id: step.id,
      lang: 'es' as const,
      instruction: step.instruction || 'Sin instrucción',
    },
    {
      recipe_step_id: step.id,
      lang: 'nl' as const,
      instruction: step.instruction || 'Geen instructie',
    },
  ]);

  const { error } = await supabase.from('recipe_step_translations').insert(stepTranslations);

  if (error) {
    console.error('  ❌ Error:', error.message);
  } else {
    console.log(`  ✅ Migrated ${stepTranslations.length} step translations`);
  }
}

async function migrateIngredientTranslations() {
  console.log('\n📝 3. Migrating ingredients to ingredient_translations...');

  const { data: ingredients } = await supabase.from('ingredients').select('id, name');

  if (!ingredients?.length) {
    console.log('  ⚠️  No ingredients found');
    return;
  }

  console.log(`  Found ${ingredients.length} ingredients to migrate`);

  const ingredientTranslationsList = ingredients.flatMap((ingredient) => {
    const nameLower = ingredient.name.toLowerCase();
    const trans = ingredientTranslations[nameLower];

    return [
      {
        ingredient_id: ingredient.id,
        lang: 'en' as const,
        name: trans?.en || ingredient.name,
      },
      {
        ingredient_id: ingredient.id,
        lang: 'fr' as const,
        name: trans?.fr || ingredient.name,
      },
      {
        ingredient_id: ingredient.id,
        lang: 'es' as const,
        name: trans?.es || ingredient.name,
      },
      {
        ingredient_id: ingredient.id,
        lang: 'nl' as const,
        name: trans?.nl || ingredient.name,
      },
    ];
  });

  const { error } = await supabase
    .from('ingredient_translations')
    .insert(ingredientTranslationsList);

  if (error) {
    console.error('  ❌ Error:', error.message);
  } else {
    console.log(`  ✅ Migrated ${ingredientTranslationsList.length} ingredient translations`);

    const translatedCount = ingredients.filter(
      (i) => ingredientTranslations[i.name.toLowerCase()]
    ).length;
    console.log(`  ℹ️  ${translatedCount} ingredients have proper translations`);
    console.log(`  ℹ️  ${ingredients.length - translatedCount} ingredients kept original name`);
  }
}

async function migrateTagTranslations() {
  console.log('\n📝 4. Migrating tags to tag_translations...');

  const { data: tags } = await supabase.from('tags').select('id, name');

  if (!tags?.length) {
    console.log('  ⚠️  No tags found');
    return;
  }

  console.log(`  Found ${tags.length} tags to migrate`);

  const tagTranslationsList = tags.flatMap((tag) => {
    const nameLower = tag.name.toLowerCase();
    const trans = tagTranslations[nameLower];

    return [
      {
        tag_id: tag.id,
        lang: 'en' as const,
        name: trans?.en || tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
      },
      {
        tag_id: tag.id,
        lang: 'fr' as const,
        name: trans?.fr || tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
      },
      {
        tag_id: tag.id,
        lang: 'es' as const,
        name: trans?.es || tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
      },
      {
        tag_id: tag.id,
        lang: 'nl' as const,
        name: trans?.nl || tag.name.charAt(0).toUpperCase() + tag.name.slice(1),
      },
    ];
  });

  const { error } = await supabase.from('tag_translations').insert(tagTranslationsList);

  if (error) {
    console.error('  ❌ Error:', error.message);
  } else {
    console.log(`  ✅ Migrated ${tagTranslationsList.length} tag translations`);

    const translatedCount = tags.filter((t) => tagTranslations[t.name.toLowerCase()]).length;
    console.log(`  ℹ️  ${translatedCount} tags have proper translations`);
  }
}

async function main() {
  console.log('🚀 MIGRATION: Moving data to translation tables');
  console.log('════════════════════════════════════════════════\n');
  console.log('This will migrate existing data from:');
  console.log('  • recipes.title/description → recipe_translations');
  console.log('  • recipe_steps.instruction → recipe_step_translations');
  console.log('  • ingredients.name → ingredient_translations');
  console.log('  • tags.name → tag_translations');
  console.log('\n⚠️  Note: Original columns will be kept for now.');
  console.log('   You can remove them later if needed.\n');

  await migrateRecipeTranslations();
  await migrateStepTranslations();
  await migrateIngredientTranslations();
  await migrateTagTranslations();

  console.log('\n════════════════════════════════════════════════');
  console.log('✅ Migration complete!');
  console.log('\n🔍 Verify the migration:');
  console.log('   npx tsx export-db-sample.ts');
  console.log('\n🌐 Test your site:');
  console.log('   npm run dev');
  console.log('   http://localhost:4321/nourriture-quotidienne/en/');
  console.log('\n💡 Next steps:');
  console.log('   • Manually improve French/Spanish/Dutch translations in Supabase');
  console.log(
    '   • Optionally drop old columns (title, description, instruction) from main tables'
  );
}

main().catch(console.error);
