// Run with: npx tsx export-db-sample.ts

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.type';
import { writeFileSync } from 'fs';
import { config } from 'dotenv';

// Load environment variables from .env file
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

// List of all tables in your database
const tables = [
  'admins',
  'categories',
  'category_translations',
  'ingredients',
  'ingredient_translations',
  'recipe_categories',
  'recipe_ingredients',
  'recipe_nutrition',
  'recipe_ratings',
  'recipe_step_translations',
  'recipe_steps',
  'recipe_tags',
  'recipe_times',
  'recipe_translations',
  'recipes',
  'tag_translations',
  'tags',
  'times',
  'user_favorites',
];

async function exportSampleData() {
  console.log('📊 Exporting sample data from all tables...\n');

  const results: Record<string, any> = {};

  for (const table of tables) {
    console.log(`Fetching ${table}...`);

    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' })
        .limit(3);

      if (error) {
        console.error(`  ❌ Error: ${error.message}`);
        results[table] = { error: error.message, count: 0, sample: [] };
      } else {
        console.log(`  ✅ Found ${count} rows (showing ${data?.length || 0})`);
        results[table] = {
          count,
          sample: data || [],
          columns: data && data.length > 0 ? Object.keys(data[0]) : [],
        };
      }
    } catch (err) {
      console.error(`  ❌ Exception: ${err}`);
      results[table] = { error: String(err), count: 0, sample: [] };
    }
  }

  // Save to file
  const outputPath = './database-sample.json';
  writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Saved to ${outputPath}`);

  // Print summary
  console.log('\n📈 SUMMARY:');
  console.log('═'.repeat(60));

  for (const [table, data] of Object.entries(results)) {
    const status = data.error ? '❌' : '✅';
    const count = data.count || 0;
    const cols = data.columns?.length || 0;
    console.log(`${status} ${table.padEnd(30)} ${count} rows, ${cols} columns`);
  }

  // Print important findings
  console.log('\n🔍 KEY FINDINGS:');
  console.log('═'.repeat(60));

  const recipesCount = results.recipes?.count || 0;
  const translationsCount = results.recipe_translations?.count || 0;
  const stepsCount = results.recipe_steps?.count || 0;
  const stepTransCount = results.recipe_step_translations?.count || 0;

  console.log(`Recipes: ${recipesCount}`);
  console.log(`Recipe translations: ${translationsCount}`);
  console.log(`Recipe steps: ${stepsCount}`);
  console.log(`Step translations: ${stepTransCount}`);

  if (recipesCount > 0 && translationsCount === 0) {
    console.log('\n⚠️  WARNING: You have recipes but NO translations!');
    console.log('   → This is why no recipes are showing on your site.');
    console.log('   → You need to add recipe_translations entries.');
  }

  if (stepsCount > 0 && stepTransCount === 0) {
    console.log('\n⚠️  WARNING: You have steps but NO step translations!');
  }

  // Check for language distribution
  if (translationsCount > 0) {
    console.log('\n🌐 LANGUAGE DISTRIBUTION:');
    const langs = results.recipe_translations?.sample?.map((t: any) => t.lang) || [];
    const uniqueLangs = [...new Set(langs)];
    console.log(`   Languages in sample: ${uniqueLangs.join(', ') || 'none'}`);
  }

  console.log('\n✅ Done! Check database-sample.json for full details.');
}

exportSampleData().catch(console.error);
