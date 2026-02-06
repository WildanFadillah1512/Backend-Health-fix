import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const recipesData = [
    // Breakfast
    {
        title: "Protein Power Smoothie Bowl",
        description: "High-protein breakfast bowl with berries, banana, and granola",
        calories: 350,
        protein: 28.0,
        carbs: 45.0,
        fat: 8.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "1 scoop vanilla protein powder",
            "1 frozen banana",
            "1/2 cup mixed berries",
            "1/2 cup Greek yogurt",
            "1/4 cup granola",
            "1 tbsp chia seeds",
            "1/2 cup almond milk"
        ]),
        instructions: JSON.stringify([
            "Blend protein powder, banana, berries, yogurt, and almond milk until smooth",
            "Pour into bowl",
            "Top with granola and chia seeds",
            "Serve immediately"
        ]),
        isPremium: false
    },
    {
        title: "Oatmeal Energy Bowl",
        description: "Steel-cut oats with nuts, fruits, and honey for sustained energy",
        calories: 380,
        protein: 12.0,
        carbs: 58.0,
        fat: 11.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "1 cup steel-cut oats",
            "2 cups water",
            "1 tbsp honey",
            "1/4 cup mixed nuts",
            "1/2 banana sliced",
            "1 tbsp peanut butter",
            "Cinnamon to taste"
        ]),
        instructions: JSON.stringify([
            "Cook oats in water according to package",
            "Transfer to bowl",
            "Top with nuts, banana, peanut butter, and honey",
            "Sprinkle with cinnamon"
        ]),
        isPremium: false
    },
    {
        title: "Egg White Veggie Scramble",
        description: "Low-fat high-protein breakfast with colorful vegetables",
        calories: 220,
        protein: 24.0,
        carbs: 15.0,
        fat: 6.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "6 egg whites",
            "1/2 cup spinach",
            "1/4 cup bell peppers diced",
            "1/4 cup mushrooms",
            "2 tbsp onions diced",
            "1 tsp olive oil",
            "Salt and pepper to taste"
        ]),
        instructions: JSON.stringify([
            "Heat olive oil in pan",
            "Sauté vegetables until soft",
            "Add egg whites and scramble",
            "Season with salt and pepper",
            "Serve hot"
        ]),
        isPremium: false
    },
    {
        title: "Avocado Toast Deluxe",
        description: "Whole grain toast with mashed avocado, eggs, and tomatoes",
        calories: 420,
        protein: 18.0,
        carbs: 38.0,
        fat: 22.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "2 slices whole grain bread",
            "1 ripe avocado",
            "2 eggs",
            "Cherry tomatoes halved",
            "Salt, pepper, red pepper flakes",
            "Lemon juice"
        ]),
        instructions: JSON.stringify([
            "Toast bread slices",
            "Mash avocado with lemon juice, salt, and pepper",
            "Spread avocado on toast",
            "Top with fried/poached eggs",
            "Garnish with tomatoes and red pepper flakes"
        ]),
        isPremium: true
    },
    {
        title: "Greek Yogurt Parfait",
        description: "Layered parfait with Greek yogurt, berries, and nuts",
        calories: 285,
        protein: 22.0,
        carbs: 35.0,
        fat: 7.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "1 cup Greek yogurt",
            "1/2 cup mixed berries",
            "1/4 cup granola",
            "2 tbsp walnuts chopped",
            "1 tbsp honey"
        ]),
        instructions: JSON.stringify([
            "Layer yogurt in glass or bowl",
            "Add berries",
            "Sprinkle granola and walnuts",
            "Drizzle with honey",
            "Repeat layers if desired"
        ]),
        isPremium: false
    },

    // Lunch & Dinner
    {
        title: "Grilled Chicken Quinoa Bowl",
        description: "Balanced meal with grilled chicken, quinoa, and roasted vegetables",
        calories: 520,
        protein: 42.0,
        carbs: 48.0,
        fat: 16.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "6 oz grilled chicken breast",
            "1 cup cooked quinoa",
            "1 cup roasted vegetables (broccoli, carrots, bell peppers)",
            "2 tbsp tahini dressing",
            "Fresh herbs"
        ]),
        instructions: JSON.stringify([
            "Grill chicken and slice",
            "Cook quinoa according to package",
            "Roast vegetables at 400°F for 20 minutes",
            "Assemble bowl with quinoa, chicken, and vegetables",
            "Drizzle with tahini dressing and garnish with herbs"
        ]),
        isPremium: false
    },
    {
        title: "Salmon with Sweet Potato",
        description: "Omega-3 rich salmon with roasted sweet potato and asparagus",
        calories: 485,
        protein: 38.0,
        carbs: 42.0,
        fat: 18.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "6 oz salmon fillet",
            "1 medium sweet potato",
            "1 cup asparagus",
            "2 tsp olive oil",
            "Lemon, garlic, herbs",
            "Salt and pepper"
        ]),
        instructions: JSON.stringify([
            "Preheat oven to 400°F",
            "Cut sweet potato into cubes and toss with 1 tsp oil",
            "Roast sweet potato for 25 minutes",
            "Season salmon with lemon, garlic, salt, pepper",
            "Bake salmon and asparagus for 12-15 minutes",
            "Serve together"
        ]),
        isPremium: true
    },
    {
        title: "Turkey Chili Power Bowl",
        description: "Lean ground turkey chili packed with beans and vegetables",
        calories: 410,
        protein: 36.0,
        carbs: 45.0,
        fat: 10.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "8 oz lean ground turkey",
            "1 can black beans",
            "1 can diced tomatoes",
            "1 cup bell peppers",
            "1 cup onions",
            "2 tbsp chili powder",
            "Cumin, garlic powder",
            "Optional: Greek yogurt, avocado"
        ]),
        instructions: JSON.stringify([
            "Brown ground turkey in large pot",
            "Add onions and peppers, cook until soft",
            "Add tomatoes, beans, and spices",
            "Simmer for 20-30 minutes",
            "Serve with optional toppings"
        ]),
        isPremium: false
    },
    {
        title: "Shrimp Stir-Fry",
        description: "Quick and healthy shrimp stir-fry with colorful vegetables",
        calories: 340,
        protein: 32.0,
        carbs: 28.0,
        fat: 11.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "8 oz shrimp peeled",
            "2 cups mixed vegetables (broccoli, snap peas, carrots)",
            "1/2 cup brown rice cooked",
            "2 tbsp soy sauce",
            "1 tbsp sesame oil",
            "Ginger and garlic minced",
            "Green onions"
        ]),
        instructions: JSON.stringify([
            "Heat sesame oil in wok or large pan",
            "Stir-fry vegetables until crisp-tender",
            "Add shrimp, ginger, and garlic",
            "Cook until shrimp are pink",
            "Add soy sauce",
            "Serve over brown rice and garnish with green onions"
        ]),
        isPremium: false
    },
    {
        title: "Lean Beef Burrito Bowl",
        description: "Mexican-inspired bowl with lean beef, beans, and fresh toppings",
        calories: 540,
        protein: 40.0,
        carbs: 55.0,
        fat: 16.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "6 oz lean ground beef",
            "1/2 cup black beans",
            "1/2 cup brown rice",
            "1/4 cup corn",
            "Lettuce, tomatoes, onions",
            "2 tbsp salsa",
            "1 tbsp guacamole",
            "Taco seasoning"
        ]),
        instructions: JSON.stringify([
            "Cook ground beef with taco seasoning",
            "Prepare rice according to package",
            "Warm black beans",
            "Assemble bowl with rice as base",
            "Top with beef, beans, corn, and fresh vegetables",
            "Add salsa and guacamole"
        ]),
        isPremium: false
    },
    {
        title: "Tofu Buddha Bowl",
        description: "Plant-based protein bowl with crispy tofu and nutrient-dense vegetables",
        calories: 445,
        protein: 22.0,
        carbs: 52.0,
        fat: 18.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "8 oz firm tofu pressed and cubed",
            "1 cup cooked quinoa",
            "1 cup roasted chickpeas",
            "Kale, shredded carrots, edamame",
            "2 tbsp peanut sauce",
            "Sesame seeds"
        ]),
        instructions: JSON.stringify([
            "Press tofu and cut into cubes",
            "Bake tofu at 400°F for 25 minutes until crispy",
            "Roast chickpeas with spices",
            "Massage kale with lemon juice",
            "Assemble bowl with quinoa, tofu, chickpeas, and vegetables",
            "Drizzle with peanut sauce and sprinkle sesame seeds"
        ]),
        isPremium: true
    },

    // Snacks
    {
        title: "Protein Energy Balls",
        description: "No-bake protein balls with dates, nuts, and chocolate",
        calories: 180,
        protein: 8.0,
        carbs: 22.0,
        fat: 7.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "1 cup dates pitted",
            "1/2 cup almonds",
            "2 tbsp protein powder",
            "2 tbsp cocoa powder",
            "1 tbsp chia seeds",
            "2 tbsp almond butter"
        ]),
        instructions: JSON.stringify([
            "Blend all ingredients in food processor",
            "Roll into 1-inch balls",
            "Refrigerate for 30 minutes",
            "Store in airtight container",
            "Makes 12 balls (serving = 3 balls)"
        ]),
        isPremium: false
    },
    {
        title: "Apple Almond Butter Slices",
        description: "Simple and satisfying snack with fiber and healthy fats",
        calories: 195,
        protein: 6.0,
        carbs: 25.0,
        fat: 9.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "1 medium apple sliced",
            "2 tbsp almond butter",
            "Cinnamon to sprinkle",
            "Optional: granola for crunch"
        ]),
        instructions: JSON.stringify([
            "Slice apple into rounds or wedges",
            "Spread almond butter on each slice",
            "Sprinkle with cinnamon",
            "Top with granola if desired",
            "Enjoy immediately"
        ]),
        isPremium: false
    },
    {
        title: "Cottage Cheese Fruit Bowl",
        description: "High-protein snack with cottage cheese and fresh fruits",
        calories: 220,
        protein: 18.0,
        carbs: 28.0,
        fat: 4.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "1 cup low-fat cottage cheese",
            "1/2 cup mixed berries",
            "1/4 cup pineapple chunks",
            "1 tbsp honey",
            "Fresh mint leaves"
        ]),
        instructions: JSON.stringify([
            "Scoop cottage cheese into bowl",
            "Top with berries and pineapple",
            "Drizzle with honey",
            "Garnish with mint",
            "Serve chilled"
        ]),
        isPremium: false
    },
    {
        title: "Hummus Veggie Platter",
        description: "Nutrient-rich vegetables with homemade or store-bought hummus",
        calories: 165,
        protein: 7.0,
        carbs: 20.0,
        fat: 7.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "1/3 cup hummus",
            "Carrot sticks",
            "Cucumber slices",
            "Bell pepper strips",
            "Cherry tomatoes",
            "Celery sticks"
        ]),
        instructions: JSON.stringify([
            "Prepare all vegetables by cutting into sticks or slices",
            "Arrange on plate",
            "Serve with hummus for dipping",
            "Store leftovers separately"
        ]),
        isPremium: false
    },

    // Post-Workout
    {
        title: "Chocolate Banana Protein Shake",
        description: "Quick post-workout shake for muscle recovery",
        calories: 310,
        protein: 30.0,
        carbs: 38.0,
        fat: 5.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "1 scoop chocolate protein powder",
            "1 banana",
            "1 cup skim milk",
            "1 tbsp cocoa powder",
            "Ice cubes",
            "Optional: 1 tsp peanut butter"
        ]),
        instructions: JSON.stringify([
            "Add all ingredients to blender",
            "Blend until smooth and creamy",
            "Add more milk if too thick",
            "Drink within 30 minutes post-workout"
        ]),
        isPremium: false
    },
    {
        title: "Peanut Butter Banana Toast",
        description: "Perfect balance of carbs and protein for post-workout recovery",
        calories: 340,
        protein: 14.0,
        carbs: 45.0,
        fat: 12.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "2 slices whole wheat bread",
            "2 tbsp peanut butter",
            "1 banana sliced",
            "Honey drizzle",
            "Chia seeds"
        ]),
        instructions: JSON.stringify([
            "Toast bread slices",
            "Spread peanut butter on toast",
            "Layer banana slices on top",
            "Drizzle with honey",
            "Sprinkle chia seeds",
            "Eat immediately after workout"
        ]),
        isPremium: false
    },
    {
        title: "Recovery Rice Bowl",
        description: "Carb and protein-rich bowl for optimal muscle recovery",
        calories: 580,
        protein: 38.0,
        carbs: 72.0,
        fat: 12.0,
        imageUrl: null,
        ingredients: JSON.stringify([
            "1 cup white rice cooked",
            "6 oz grilled chicken",
            "1/2 cup sweet corn",
            "1/2 avocado sliced",
            "Soy sauce",
            "Green onions"
        ]),
        instructions: JSON.stringify([
            "Cook rice according to package",
            "Grill and slice chicken",
            "Assemble bowl with rice as base",
            "Top with chicken, corn, and avocado",
            "Drizzle with soy sauce",
            "Garnish with green onions",
            "Consume within 2 hours post-workout"
        ]),
        isPremium: true
    }
];

export async function seedRecipes() {
    console.log('🌱 Seeding recipes...');

    for (const recipe of recipesData) {
        // Check if recipe exists by title
        const existing = await prisma.recipe.findFirst({
            where: { title: recipe.title }
        });

        if (!existing) {
            await prisma.recipe.create({
                data: recipe
            });
        }
    }

    console.log(`✅ Seeded ${recipesData.length} recipes`);
}
