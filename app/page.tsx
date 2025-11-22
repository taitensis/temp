import RecipeCard from "./components/RecipeCard";
import { mockRecipes } from "./lib/mockRecipes";
import { Typography } from "@/components/ui/typography";

export default function Home() {
  return (
    <>
      <section className="w-full bg-muted/20 py-12 md:py-20">
        <div className="container flex flex-col gap-6 text-center max-w-3xl">
          <Typography variant="h1">Homepage</Typography>
          <Typography variant="body" className="text-lg text-muted-foreground">
            A warm welcome to my recipes website where you&apos;ll find my
            favourite recipes that I have found online, customed or even
            created. I hope you&apos;ll like some of &apos;em!
          </Typography>
        </div>
      </section>

      <section className="w-full py-12">
        <div className="container space-y-8">
          <Typography variant="h2">My current fav&apos;</Typography>
          <div
            id="mock-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {mockRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                title={recipe.title}
                slug={recipe.slug}
                imgUrl={recipe.imageUrl}
                description={recipe.description}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
