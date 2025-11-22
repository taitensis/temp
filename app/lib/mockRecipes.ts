import type { Recipe } from "@/app/lib/types";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    slug: "classic-tomato-pasta",
    title: "Classic Tomato Pasta",
    description:
      "A simple and comforting Italian pasta with a rich tomato sauce.",
    imageUrl: "https://placehold.co/600x400.png",
    difficulty: 1,
    servings: { amount: 4 },
    time: {
      prepTime: 15,
      cookTime: 25,
      totalTime: 40,
    },
    ingredients: [
      {
        name: "Sauce",
        items: [
          { name: "Olive oil", amount: "2 tablespoons" },
          { name: "Garlic cloves, minced", amount: "2" },
          { name: "Tomatoes, crushed", amount: "400 grams" },
          { name: "Salt", amount: "1 teaspoon" },
        ],
      },
      {
        name: "Pasta",
        items: [{ name: "Spaghetti", amount: "350 grams" }],
      },
    ],
    steps: [
      {
        position: 1,
        instruction: "Heat olive oil and sauté garlic until fragrant.",
      },
      { position: 2, instruction: "Add tomatoes and simmer for 20 minutes." },
      {
        position: 3,
        instruction: "Cook pasta according to package instructions.",
      },
      { position: 4, instruction: "Combine pasta with sauce and serve warm." },
    ],
    tags: [
      { name: "Italian", slug: "italian" },
      { name: "Pasta", slug: "pasta" },
    ],
    seasons: [{ name: "summer", slug: "summer" }],
    nutrition: {
      calories_per_serving: 420,
      carbs_g: 65,
      fat_g: 8,
      protein_g: 12,
      sugar_g: 9,
      fiber_g: 4,
      sodium_mg: 630,
    },
  },
  {
    id: "2",
    slug: "vegan-buddha-bowl",
    title: "Vegan Buddha Bowl",
    description:
      "A nourishing bowl with quinoa, roasted vegetables, and tahini dressing.",
    imageUrl: "https://placehold.co/600x400.png",
    difficulty: 1,
    servings: { amount: 2 },
    time: {
      prepTime: 20,
      cookTime: 30,
      totalTime: 50,
    },
    ingredients: [
      {
        name: "Base",
        items: [{ name: "Quinoa, uncooked", amount: "150 grams" }],
      },
      {
        name: "Roasted vegetables",
        items: [
          { name: "Sweet potato, cubed", amount: "1" },
          { name: "Broccoli florets", amount: "200 grams" },
        ],
      },
      {
        name: "Dressing",
        items: [
          { name: "Tahini", amount: "2 tablespoons" },
          { name: "Lemon juice", amount: "1 tablespoon" },
        ],
      },
    ],
    steps: [
      {
        position: 1,
        instruction: "Roast sweet potato and broccoli for 25–30 minutes.",
      },
      { position: 2, instruction: "Cook quinoa in water until fluffy." },
      { position: 3, instruction: "Combine dressing ingredients and whisk." },
      { position: 4, instruction: "Assemble bowl and drizzle with dressing." },
    ],
    tags: [
      { name: "Vegan", slug: "vegan" },
      { name: "Healthy", slug: "healthy" },
    ],
    seasons: [{ name: "fall", slug: "fall" }],
    nutrition: {
      calories_per_serving: 520,
      carbs_g: 72,
      fat_g: 18,
      protein_g: 14,
      sugar_g: 10,
      fiber_g: 9,
      sodium_mg: 410,
    },
  },
  {
    id: "3",
    slug: "chicken-curry",
    title: "Chicken Curry",
    description: "A mild curry with tender chicken pieces and fragrant spices.",
    imageUrl: "https://placehold.co/600x400.png",
    difficulty: 2,
    servings: { amount: 4 },
    time: {
      prepTime: 20,
      cookTime: 35,
      totalTime: 55,
    },
    ingredients: [
      {
        name: "Curry",
        items: [
          { name: "Chicken breast, diced", amount: "500 grams" },
          { name: "Onion, chopped", amount: "1" },
          { name: "Coconut milk", amount: "400 ml" },
          { name: "Curry powder", amount: "2 tablespoons" },
        ],
      },
    ],
    steps: [
      { position: 1, instruction: "Sauté onions until soft." },
      { position: 2, instruction: "Add chicken and cook until browned." },
      {
        position: 3,
        instruction: "Stir in curry powder, add coconut milk, and simmer.",
      },
    ],
    tags: [{ name: "Asian", slug: "asian" }],
    seasons: [{ name: "winter", slug: "winter" }],
    nutrition: {
      calories_per_serving: 610,
      carbs_g: 18,
      fat_g: 38,
      protein_g: 44,
      sugar_g: 6,
      fiber_g: 3,
      sodium_mg: 580,
    },
  },
  {
    id: "4",
    slug: "shakshuka",
    title: "Shakshuka",
    description:
      "Eggs poached in a spiced tomato and pepper sauce — quick, warming, and satisfying.",
    imageUrl: "https://placehold.co/600x400.png",
    difficulty: 1,
    servings: { amount: 2 },
    time: { prepTime: 10, cookTime: 20, totalTime: 30 },
    ingredients: [
      {
        name: "Sauce",
        items: [
          { name: "Olive oil", amount: "1 tablespoon" },
          { name: "Onion, sliced", amount: "1 medium" },
          { name: "Red bell pepper, diced", amount: "1" },
          { name: "Canned tomatoes", amount: "400 grams" },
          { name: "Paprika", amount: "1 teaspoon" },
          { name: "Cumin", amount: "½ teaspoon" },
        ],
      },
      {
        name: "Finish",
        items: [
          { name: "Eggs, large", amount: "4", notes: "see Note" },
          { name: "Fresh parsley, chopped", amount: "5 grams" },
        ],
      },
    ],
    steps: [
      {
        position: 1,
        instruction: "Heat oil and sauté onion and pepper until soft.",
      },
      {
        position: 2,
        instruction: "Add spices and tomatoes; simmer until sauce thickens.",
      },
      {
        position: 3,
        instruction:
          "Make wells and crack eggs into the sauce; cover and cook until eggs set.",
      },
      {
        position: 4,
        instruction: "Scatter parsley and serve with crusty bread.",
      },
    ],
    tags: [
      { name: "Breakfast", slug: "breakfast" },
      { name: "Vegetarian", slug: "vegetarian" },
    ],
    seasons: [
      { name: "spring", slug: "spring" },
      { name: "summer", slug: "summer" },
    ],
    nutrition: {
      calories_per_serving: 360,
      carbs_g: 28,
      fat_g: 18,
      protein_g: 18,
      sugar_g: 9,
      fiber_g: 5,
      sodium_mg: 540,
    },
  },
  {
    id: "5",
    slug: "banana-bread",
    title: "Banana Bread",
    description:
      "Moist banana bread with a hint of cinnamon — a great use for overripe bananas.",
    imageUrl: "https://placehold.co/600x400.png",
    difficulty: 1,
    servings: { amount: 8 },
    time: { prepTime: 15, cookTime: 60, totalTime: 75 },
    ingredients: [
      {
        items: [
          { name: "Ripe bananas, mashed", amount: "3 (about 300 g)" },
          { name: "All‑purpose flour", amount: "250 grams" },
          { name: "Sugar", amount: "100 grams" },
          { name: "Butter, melted", amount: "80 grams" },
          { name: "Eggs, large", amount: "2" },
          { name: "Baking powder", amount: "1 teaspoon" },
          { name: "Cinnamon", amount: "1 teaspoon" },
        ],
      },
    ],
    steps: [
      { position: 1, instruction: "Preheat oven to 175°C (350°F)." },
      {
        position: 2,
        instruction: "Mix mashed bananas with butter, sugar and eggs.",
      },
      {
        position: 3,
        instruction:
          "Fold in dry ingredients until just combined and pour into a loaf tin.",
      },
      {
        position: 4,
        instruction:
          "Bake 55–65 minutes until a skewer comes out clean; cool before slicing.",
      },
    ],
    tags: [
      { name: "Baking", slug: "baking" },
      { name: "Snack", slug: "snack" },
    ],
    seasons: [
      { name: "fall", slug: "fall" },
      { name: "winter", slug: "winter" },
    ],
    nutrition: {
      calories_per_serving: 260,
      carbs_g: 36,
      fat_g: 10,
      protein_g: 4,
      sugar_g: 16,
      fiber_g: 2,
      sodium_mg: 120,
    },
  },
  {
    id: "6",
    slug: "beef-stew",
    title: "Beef Stew",
    description:
      "Hearty slow‑cooked beef stew with root vegetables and red wine.",
    imageUrl: "https://placehold.co/600x400.png",
    difficulty: 2,
    servings: { amount: 6 },
    time: { prepTime: 25, cookTime: 150, totalTime: 175 },
    ingredients: [
      {
        name: "Stew",
        items: [
          { name: "Beef chuck, cubed", amount: "1200 grams" },
          { name: "Carrots, chopped", amount: "300 grams" },
          { name: "Onion, large, chopped", amount: "1" },
          { name: "Red wine", amount: "250 ml" },
          { name: "Beef stock", amount: "800 ml" },
          { name: "Bay leaf", amount: "1" },
        ],
      },
    ],
    steps: [
      { position: 1, instruction: "Brown beef in batches and set aside." },
      {
        position: 2,
        instruction:
          "Sauté onion, add wine to deglaze, then return beef to the pot.",
      },
      {
        position: 3,
        instruction:
          "Add stock, carrots and bay leaf; simmer gently for 2–3 hours until tender.",
      },
      {
        position: 4,
        instruction:
          "Adjust seasoning and serve with mashed potatoes or crusty bread.",
      },
    ],
    tags: [
      { name: "Dinner", slug: "dinner" },
      { name: "Comfort Food", slug: "comfort-food" },
    ],
    seasons: [{ name: "winter", slug: "winter" }],
    nutrition: {
      calories_per_serving: 720,
      carbs_g: 25,
      fat_g: 36,
      protein_g: 55,
      sugar_g: 6,
      fiber_g: 4,
      sodium_mg: 680,
    },
  },
  {
    id: "7",
    slug: "miso-soup",
    title: "Miso Soup with Tofu and Wakame",
    description:
      "A light Japanese soup made with dashi, miso paste, tofu and wakame seaweed.",
    imageUrl: "https://placehold.co/600x400.png",
    difficulty: 1,
    servings: { amount: 2 },
    time: { prepTime: 5, cookTime: 5, totalTime: 10 },
    ingredients: [
      {
        items: [
          { name: "Dashi (stock)", amount: "600 ml" },
          { name: "Miso paste", amount: "2 tablespoons" },
          { name: "Silken tofu, cubed", amount: "150 grams" },
          { name: "Wakame, rehydrated", amount: "5 grams" },
          { name: "Spring onion, chopped", amount: "1" },
        ],
      },
    ],
    steps: [
      {
        position: 1,
        instruction: "Bring dashi to a gentle simmer; remove from heat.",
      },
      {
        position: 2,
        instruction:
          "Dissolve miso in a little hot dashi, return to pot and add tofu and wakame.",
      },
      {
        position: 3,
        instruction:
          "Heat briefly without boiling, garnish with spring onion and serve.",
      },
    ],
    tags: [
      { name: "Soup", slug: "soup" },
      { name: "Japanese", slug: "japanese" },
    ],
    seasons: [
      { name: "winter", slug: "winter" },
      { name: "spring", slug: "spring" },
    ],
    nutrition: {
      calories_per_serving: 80,
      carbs_g: 6,
      fat_g: 3,
      protein_g: 7,
      sugar_g: 1,
      fiber_g: 1,
      sodium_mg: 900,
    },
  },
  {
    id: "8",
    slug: "lemon-tart",
    title: "Lemon Tart",
    description:
      "Tangy lemon curd in a crisp shortcrust pastry — bright and elegant dessert.",
    imageUrl: "https://placehold.co/600x400.png",
    difficulty: 2,
    servings: { amount: 8 },
    time: { prepTime: 25, cookTime: 30, chillTime: 120, totalTime: 175 },
    ingredients: [
      {
        name: "Crust",
        items: [
          { name: "All‑purpose flour", amount: "200 grams" },
          { name: "Butter, cold", amount: "100 grams" },
          { name: "Sugar", amount: "30 grams" },
          { name: "Egg yolk", amount: "1" },
        ],
      },
      {
        name: "Filling",
        items: [
          { name: "Eggs", amount: "3" },
          { name: "Sugar", amount: "150 grams" },
          { name: "Lemon juice", amount: "100 ml (about 3 lemons)" },
          { name: "Butter, cubed", amount: "60 grams" },
        ],
      },
    ],
    steps: [
      {
        position: 1,
        instruction:
          "Blind‑bake the pastry shell at 180°C for 15 minutes then remove weights and bake 10 minutes more.",
      },
      {
        position: 2,
        instruction:
          "Whisk eggs with sugar, stir in lemon juice and strain into a saucepan.",
      },
      {
        position: 3,
        instruction:
          "Cook gently, stirring, until slightly thickened then whisk in butter until smooth.",
      },
      {
        position: 4,
        instruction: "Pour into shell, chill until set, and serve.",
      },
    ],
    tags: [
      { name: "Dessert", slug: "dessert" },
      { name: "Baking", slug: "baking" },
    ],
    seasons: [
      { name: "spring", slug: "spring" },
      { name: "summer", slug: "summer" },
    ],
    nutrition: {
      calories_per_serving: 380,
      carbs_g: 45,
      fat_g: 19,
      protein_g: 5,
      sugar_g: 28,
      fiber_g: 1,
      sodium_mg: 150,
    },
  },
];
