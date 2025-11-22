import { notFound } from "next/navigation";
import { mockRecipes } from "../../lib/mockRecipes";
import RecipeHeader from "@/app/components/RecipeHeader";
import IngredientsSection from "@/app/components/IngredientsSection";
import StepsSection from "@/app/components/StepsSection";
import NutritionTable from "@/app/components/NutritionTable";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const recipe = mockRecipes.find((recipe) => recipe.slug === slug);
  if (!recipe) {
    notFound();
  }

  return (
    <>
      <section className="w-full bg-muted/30 py-12 border-b border-border/50">
        <div className="container py-12 md:py-16 max-w-5xl">
          <RecipeHeader
            title={recipe.title}
            imgUrl={recipe.imageUrl}
            serving={recipe.servings}
            time={recipe.time}
            tags={recipe.tags}
            description={recipe.description}
          />
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-10">
                <div className="p-6 bg-card rounded-xl border shadow-sm">
                  <IngredientsSection ingredientGroups={recipe.ingredients} />
                </div>
                <div className="opacity-80 text-sm">
                  <NutritionTable nutrition={recipe.nutrition} />
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="prose max-w-none">
                <StepsSection steps={recipe.steps} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
