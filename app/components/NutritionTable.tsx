import type { Nutrition } from "../lib/types";

interface NutritionTableProps {
  nutrition?: Nutrition;
}

export default function NutritionTable({ nutrition }: NutritionTableProps) {
  if (!nutrition) return null;

  const nutrients = [
    {
      label: "Calories",
      value: `${nutrition.calories_per_serving} kcal`,
      bold: true,
    },
    { label: "Protein", value: `${nutrition.protein_g}g` },
    { label: "Carbohydrates", value: `${nutrition.carbs_g}g` },
    { label: "Fat", value: `${nutrition.fat_g}g` },
    { label: "Fiber", value: `${nutrition.fiber_g}g` },
    { label: "Sugar", value: `${nutrition.sugar_g}g` },
    { label: "Sodium", value: `${nutrition.sodium_mg}mg` },
  ];

  return (
    <section className="rounded-xl border bg-card/50 p-6 space-y-4">
      <h3 className="font-semibold text-lg">Nutrition</h3>
      <p className="text-xs text-muted-foreground mb-4">Values per serving</p>

      <div className="space-y-3">
        {nutrients.map((item) => (
          <div
            key={item.label}
            className="flex justify-between items-center text-sm"
          >
            <span
              className={
                item.bold
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }
            >
              {item.label}
            </span>
            <span className="font-medium font-mono">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
