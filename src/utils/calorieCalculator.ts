/**
 * Utility functions to calculate daily calorie needs based on user profile
 * Uses the Mifflin-St Jeor Equation for BMR calculation
 */

export interface UserProfile {
    weight: number; // in kg
    height: number; // in cm
    age: number;
    gender: 'male' | 'female' | 'other';
    activityLevel: string;
    goal: string;
}

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 * BMR is the number of calories required to keep your body functioning at rest
 */
export function calculateBMR(weight: number, height: number, age: number, gender: string): number {
    let bmr: number;

    if (gender === 'male') {
        // BMR (men) = 10 * weight(kg) + 6.25 * height(cm) - 5 * age + 5
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else if (gender === 'female') {
        // BMR (women) = 10 * weight(kg) + 6.25 * height(cm) - 5 * age  161
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    } else {
        // For 'other', use average of male and female
        const maleBMR = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        const femaleBMR = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        bmr = (maleBMR + femaleBMR) / 2;
    }

    return Math.round(bmr);
}

/**
 * Get activity multiplier based on activity level
 */
export function getActivityMultiplier(activityLevel: string): number {
    const multipliers: Record<string, number> = {
        'sedentary': 1.2,      // Little or no exercise
        'lightly_active': 1.375, // Light exercise 1-3 days/week
        'moderately_active': 1.55, // Moderate exercise 3-5 days/week  
        'very_active': 1.725,  // Hard exercise 6-7 days/week
        'extra_active': 1.9    // Very hard exercise, physical job
    };

    // Default to moderate if unknown
    return multipliers[activityLevel] || 1.55;
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 * TDEE = BMR * Activity Multiplier
 */
export function calculateTDEE(bmr: number, activityLevel: string): number {
    const multiplier = getActivityMultiplier(activityLevel);
    return Math.round(bmr * multiplier);
}

/**
 * Adjust caloriesfor goal
 * - Weight loss: Create 500 calorie deficit (~0.5kg/week loss)
 * - Muscle gain: Create 300 calorie surplus (~0.25kg/week gain)
 * - Maintenance: No adjustment
 */
export function adjustForGoal(tdee: number, goal: string): number {
    const adjustments: Record<string, number> = {
        'lose_weight': -500,     // Calorie deficit
        'lose_fat': -500,
        'gain_muscle': +300,     // Calorie surplus
        'build_muscle': +300,
        'maintain': 0,           // No change
        'maintenance': 0,
        'improve_endurance': -200, // Slight deficit
        'increase_strength': +200  // Slight surplus
    };

    const adjustment = adjustments[goal] || 0;
    const adjusted = tdee + adjustment;

    // Ensure minimum 1200 calories (safety threshold)
    return Math.max(adjusted, 1200);
}

/**
 * Main function to calculate recommended daily calorie goal
 */
export function calculateCalorieGoal(profile: UserProfile): number {
    const { weight, height, age, gender, activityLevel, goal } = profile;

    // Step 1: Calculate BMR
    const bmr = calculateBMR(weight, height, age, gender);

    // Step 2: Calculate TDEE
    const tdee = calculateTDEE(bmr, activityLevel);

    // Step 3: Adjust for goal
    const calorieGoal = adjustForGoal(tdee, goal);

    return calorieGoal;
}

/**
 * Get macronutrient breakdown based on goal
 * Returns percentage of calories from each macro
 */
export function getMacroBreakdown(goal: string): { protein: number; carbs: number; fat: number } {
    const breakdowns: Record<string, { protein: number; carbs: number; fat: number }> = {
        'lose_weight': { protein: 35, carbs: 35, fat: 30 }, // Higher protein to preserve muscle
        'lose_fat': { protein: 35, carbs: 35, fat: 30 },
        'gain_muscle': { protein: 30, carbs: 45, fat: 25 }, // Higher carbs for energy
        'build_muscle': { protein: 30, carbs: 45, fat: 25 },
        'maintain': { protein: 25, carbs: 45, fat: 30 },
        'maintenance': { protein: 25, carbs: 45, fat: 30 },
        'improve_endurance': { protein: 20, carbs: 55, fat: 25 }, // Higher carbs for endurance
        'increase_strength': { protein: 30, carbs: 40, fat: 30 }
    };

    return breakdowns[goal] || breakdowns['maintain'];
}

/**
 * Calculate grams of each macronutrient based on calorie goal
 * Protein & Carbs: 4 cal/gram, Fat: 9 cal/gram
 */
export function calculateMacros(calorieGoal: number, goal: string): {
    protein: number;
    carbs: number;
    fat: number;
} {
    const breakdown = getMacroBreakdown(goal);

    const proteinGrams = Math.round((calorieGoal * (breakdown.protein / 100)) / 4);
    const carbsGrams = Math.round((calorieGoal * (breakdown.carbs / 100)) / 4);
    const fatGrams = Math.round((calorieGoal * (breakdown.fat / 100)) / 9);

    return {
        protein: proteinGrams,
        carbs: carbsGrams,
        fat: fatGrams
    };
}
