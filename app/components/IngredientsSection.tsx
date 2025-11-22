import type { Ingredient, IngredientGroup } from "../lib/types";
import { Typography } from "@/components/ui/typography";

export function IngredientItem({ ingredient }: { ingredient: Ingredient }) {
  return (
    <li className="flex items-start gap-2 py-1">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />

      <div className="text-sm md:text-base">
        <span className="font-medium">{ingredient.amount}</span>{" "}
        <span>{ingredient.name}</span>
        {ingredient.notes && (
          <span className="text-muted-foreground italic ml-1">
            ({ingredient.notes})
          </span>
        )}
      </div>
    </li>
  );
}

export default function IngredientsSection({
  ingredientGroups,
}: {
  ingredientGroups: IngredientGroup[];
}) {
  if (!ingredientGroups || ingredientGroups.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b">
        <Typography variant="h2">Ingredients</Typography>
      </div>

      <div className="space-y-6">
        {ingredientGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.name && (
              <h4 className="font-bold text-primary uppercase tracking-wider text-xs mb-3">
                {group.name}
              </h4>
            )}
            <ul className="space-y-2">
              {group.items.map((item, itemIndex) => (
                <IngredientItem key={itemIndex} ingredient={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
