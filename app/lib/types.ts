export type Ingredient = {
  name: string;
  amount: string;
  density?: number;
  notes?: string;
};

export type IngredientGroup = {
  name?: string;
  items: Ingredient[];
};

export type Step = {
  position: number;
  instruction: string;
  note?: string;
};

export type Time = {
  prepTime?: number;
  cookTime?: number;
  restTime?: number;
  marinateTime?: number;
  chillTime?: number;
  risingTime?: number;
  totalTime?: number;
};

export type Serving = {
  amount: number;
  note?: string;
};

export type Tag = {
  name: string;
  slug: string;
};

export type Season = {
  name: "spring" | "summer" | "fall" | "winter";
  slug: string;
};

export type Nutrition = {
  calories_per_serving: number;
  carbs_g: number;
  fat_g: number;
  protein_g: number;
  sugar_g: number;
  fiber_g: number;
  sodium_mg: number;
};

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl: string;
  difficulty?: 1 | 2 | 3;
  servings: Serving;
  time?: Time;
  ingredients: IngredientGroup[];
  steps: Step[];
  note?: string;
  tags: Tag[];
  seasons: Season[];
  nutrition?: Nutrition;
};
