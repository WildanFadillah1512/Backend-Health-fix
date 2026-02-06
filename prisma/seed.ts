

import * as dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const WORKOUTS = [
    // STRENGTH
    {
        id: 'str-1',
        title: 'Full Body Power',
        description: 'Compound movements to build total body strength and muscle mass.',
        category: 'Strength',
        difficulty: 'Intermediate',
        duration: 45,
        calories: 350,
        icon: 'barbell',
        exercises: [
            { id: 'e1', name: 'Push Ups', sets: 3, reps: '12-15', rest: 60, order: 1 },
            { id: 'e2', name: 'Bodyweight Squats', sets: 3, reps: '15-20', rest: 60, order: 2 },
            { id: 'e3', name: 'Lunges', sets: 3, reps: '12 each', rest: 60, order: 3 },
            { id: 'e4', name: 'Plank Shoulder Taps', sets: 3, reps: '20', rest: 45, order: 4 },
            { id: 'e5', name: 'Glute Bridges', sets: 3, reps: '15', rest: 45, order: 5 },
        ]
    },
    {
        id: 'str-2',
        title: 'Upper Body Sculpt',
        description: 'Focus on chest, shoulders, back, and arms definition.',
        category: 'Strength',
        difficulty: 'Advanced',
        duration: 50,
        calories: 400,
        icon: 'barbell',
        exercises: [
            { id: 'u1', name: 'Diamond Push Ups', sets: 4, reps: '10-12', rest: 75, order: 1 },
            { id: 'u2', name: 'Tricep Dips', sets: 3, reps: '12-15', rest: 60, order: 2 },
            { id: 'u3', name: 'Pike Push Ups', sets: 3, reps: '10', rest: 60, order: 3 },
            { id: 'u4', name: 'Superman Hold', sets: 3, duration: 45, rest: 45, order: 4 },
            { id: 'u5', name: 'Doorframe Rows', sets: 3, reps: '12', rest: 60, order: 5 },
        ]
    },

    // CARDIO
    {
        id: 'car-1',
        title: 'HIIT Burner',
        description: 'High intensity interval training to maximize calorie burn in short time.',
        category: 'Cardio',
        difficulty: 'Advanced',
        duration: 25,
        calories: 300,
        icon: 'flash',
        exercises: [
            { id: 'c1', name: 'Jumping Jacks', sets: 3, duration: 45, rest: 15, order: 1 },
            { id: 'c2', name: 'Burpees', sets: 3, duration: 40, rest: 20, order: 2 },
            { id: 'c3', name: 'Mountain Climbers', sets: 3, duration: 45, rest: 15, order: 3 },
            { id: 'c4', name: 'High Knees', sets: 3, duration: 45, rest: 15, order: 4 },
            { id: 'c5', name: 'Jump Squats', sets: 3, duration: 30, rest: 30, order: 5 },
        ]
    },
    {
        id: 'car-2',
        title: 'Steady State Cardio',
        description: 'Consistent movement to improve endurance and heart health.',
        category: 'Cardio',
        difficulty: 'Beginner',
        duration: 40,
        calories: 350,
        icon: 'heart',
        exercises: [
            { id: 's1', name: 'March in Place', sets: 1, duration: 300, rest: 0, order: 1 },
            { id: 's2', name: 'Step Touches', sets: 1, duration: 300, rest: 0, order: 2 },
            { id: 's3', name: 'Arm Circles & March', sets: 1, duration: 300, rest: 0, order: 3 },
            { id: 's4', name: 'Knee Lifts', sets: 1, duration: 300, rest: 0, order: 4 },
        ]
    },

    // CORE
    {
        id: 'core-1',
        title: 'Core Blaster',
        description: 'Targeted abs and obliques workout for a strong midsection.',
        category: 'Core',
        difficulty: 'Intermediate',
        duration: 20,
        calories: 150,
        icon: 'shield',
        exercises: [
            { id: 'cr1', name: 'Crunches', sets: 3, reps: '20', rest: 30, order: 1 },
            { id: 'cr2', name: 'Leg Raises', sets: 3, reps: '15', rest: 30, order: 2 },
            { id: 'cr3', name: 'Russian Twists', sets: 3, reps: '20 each', rest: 30, order: 3 },
            { id: 'cr4', name: 'Bicycle Crunches', sets: 3, reps: '20 each', rest: 30, order: 4 },
            { id: 'cr5', name: 'Plank Hold', sets: 1, duration: 90, rest: 0, order: 5 },
        ]
    },

    // FLEXIBILITY
    {
        id: 'flex-1',
        title: 'Morning Mobility',
        description: 'Gentle stretching routine to wake up the body and improve range of motion.',
        category: 'Flexibility',
        difficulty: 'Beginner',
        duration: 15,
        calories: 80,
        icon: 'body',
        exercises: [
            { id: 'f1', name: 'Neck Rolls', sets: 1, duration: 60, rest: 10, order: 1 },
            { id: 'f2', name: 'Arm Circles', sets: 1, duration: 60, rest: 10, order: 2 },
            { id: 'f3', name: 'Torso Twists', sets: 1, duration: 60, rest: 10, order: 3 },
            { id: 'f4', name: 'Hip Circles', sets: 1, duration: 60, rest: 10, order: 4 },
            { id: 'f5', name: 'Forward Fold', sets: 1, duration: 60, rest: 10, order: 5 },
        ]
    },
    {
        id: 'flex-2',
        title: 'Post-Workout Stretch',
        description: 'Cool down routine to prevent stiffness and aid recovery.',
        category: 'Flexibility',
        difficulty: 'Beginner',
        duration: 10,
        calories: 50,
        icon: 'body',
        exercises: [
            { id: 'p1', name: 'Quad Stretch', sets: 1, duration: 30, rest: 10, order: 1 },
            { id: 'p2', name: 'Hamstring Stretch', sets: 1, duration: 30, rest: 10, order: 2 },
            { id: 'p3', name: 'Chest Opener', sets: 1, duration: 30, rest: 10, order: 3 },
            { id: 'p4', name: 'Child\'s Pose', sets: 1, duration: 60, rest: 0, order: 4 },
        ]
    }
];



const FOODS = [
    { id: '1', name: 'Oatmeal & Berries', calories: 320, protein: 12, carbs: 45, fat: 6, image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500' },
    { id: '2', name: 'Grilled Chicken Salad', calories: 450, protein: 40, carbs: 12, fat: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500' },
    { id: '3', name: 'Salmon & Quinoa', calories: 520, protein: 35, carbs: 40, fat: 22, image: 'https://images.unsplash.com/photo-1467003909585-2f8a7270028d?w=500' },
    { id: '4', name: 'Greek Yogurt Bowl', calories: 280, protein: 15, carbs: 30, fat: 8, image: 'https://images.unsplash.com/photo-1488477181946-6428a02917aa?w=500' },
    { id: '5', name: 'Avocado Toast', calories: 340, protein: 10, carbs: 32, fat: 18, image: 'https://images.unsplash.com/photo-1588137372308-15f75323a399?w=500' },
    { id: '6', name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.3, image: 'https://images.unsplash.com/photo-1571771896612-41604a4e4328?w=500' },
    { id: '7', name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500' },
    { id: '8', name: 'Boiled Egg', calories: 70, protein: 6, carbs: 0.6, fat: 5, image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500' },
    { id: '9', name: 'Protein Shake', calories: 150, protein: 25, carbs: 5, fat: 2, image: 'https://images.unsplash.com/photo-1542526369-0245a443c217?w=500' },
    { id: '10', name: 'Almonds (30g)', calories: 170, protein: 6, carbs: 6, fat: 15, image: 'https://images.unsplash.com/photo-1508061253366-f7da39e6807e?w=500' }
];

const ACHIEVEMENTS = [
    // Workout Milestones
    {
        id: 'ach-first-workout',
        title: 'First Steps',
        description: 'Complete your first workout',
        icon: 'fitness',
        requirement: '1 workout completed',
        category: 'Workout'
    },
    {
        id: 'ach-5-workouts',
        title: 'Week Warrior',
        description: 'Complete 5 workouts',
        icon: 'trophy',
        requirement: '5 workouts completed',
        category: 'Workout'
    },
    {
        id: 'ach-10-workouts',
        title: 'Committed',
        description: 'Complete 10 workouts',
        icon: 'medal',
        requirement: '10 workouts completed',
        category: 'Workout'
    },
    {
        id: 'ach-20-workouts',
        title: 'Month Master',
        description: 'Complete 20 workouts',
        icon: 'star',
        requirement: '20 workouts completed',
        category: 'Workout'
    },
    {
        id: 'ach-50-workouts',
        title: 'Fitness Legend',
        description: 'Complete 50 workouts',
        icon: 'ribbon',
        requirement: '50 workouts completed',
        category: 'Workout'
    },
    // Streak Achievements
    {
        id: 'ach-3-day-streak',
        title: 'On Fire',
        description: '3 day workout streak',
        icon: 'flame',
        requirement: '3 consecutive days',
        category: 'Streak'
    },
    {
        id: 'ach-7-day-streak',
        title: 'Unstoppable',
        description: '7 day workout streak',
        icon: 'flame',
        requirement: '7 consecutive days',
        category: 'Streak'
    },
    // Nutrition Achievements
    {
        id: 'ach-first-meal-log',
        title: 'Nutrition Beginner',
        description: 'Log your first meal',
        icon: 'restaurant',
        requirement: '1 meal logged',
        category: 'Nutrition'
    },
    {
        id: 'ach-30-meals',
        title: 'Meal Tracker',
        description: 'Log 30 meals',
        icon: 'nutrition',
        requirement: '30 meals logged',
        category: 'Nutrition'
    },
    // Hydration Achievements
    {
        id: 'ach-2500ml-water',
        title: 'Hydration Hero',
        description: 'Drink 2500ml water in a day',
        icon: 'water',
        requirement: '2500ml in one day',
        category: 'Hydration'
    }
];

// Combine the loops in main or add after workouts
async function main() {
    console.log('Start seeding...');
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL missing');

    // --- WORKOUTS ---
    for (const w of WORKOUTS) {
        console.log(`Upserting workout ${w.id}`);
        const workout = await prisma.workout.upsert({
            where: { id: w.id },
            update: {
                title: w.title,
                description: w.description,
                category: w.category,
                difficulty: w.difficulty,
                duration: w.duration,
                calories: w.calories,
                icon: w.icon,
            },
            create: {
                id: w.id,
                title: w.title,
                description: w.description,
                category: w.category,
                difficulty: w.difficulty,
                duration: w.duration,
                calories: w.calories,
                icon: w.icon,
                isActive: true
            }
        });

        await prisma.exercise.deleteMany({ where: { workoutId: workout.id } });

        for (const e of w.exercises) {
            await prisma.exercise.create({
                data: {
                    id: e.id,
                    workoutId: workout.id,
                    name: e.name,
                    sets: e.sets,
                    reps: e.reps,
                    duration: e.duration,
                    rest: e.rest,
                    order: e.order
                }
            });
        }
    }

    // --- FOODS ---
    console.log('Seeding Foods...');
    for (const f of FOODS) {
        await prisma.food.upsert({
            where: { id: f.id },
            update: {
                name: f.name,
                calories: f.calories,
                protein: f.protein,
                carbs: f.carbs,
                fat: f.fat,
                image: f.image,
                isSystemFood: true
            },
            create: {
                id: f.id,
                name: f.name,
                calories: f.calories,
                protein: f.protein,
                carbs: f.carbs,
                fat: f.fat,
                image: f.image,
                isSystemFood: true,
                createdBy: null
            }
        });
    }

    // --- ACHIEVEMENTS ---
    console.log('Seeding Achievements...');
    for (const ach of ACHIEVEMENTS) {
        await prisma.achievement.upsert({
            where: { id: ach.id },
            update: {},
            create: ach
        });
    }

    // --- SEED PROGRAMS ---
    console.log('Seeding Programs...');
    const PROGRAMS = [
        {
            id: 'prog-1',
            title: 'Fat Loss Beginner',
            description: '4-week program to burn fat and build stamina.',
            duration: 4, // weeks
            difficulty: 'Beginner',
            goal: 'lose_weight',
            isPremium: false,
            thumbnailUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500'
        },
        {
            id: 'prog-2',
            title: 'Muscle Builder',
            description: 'Hypertrophy focused program for muscle gain.',
            duration: 8,
            difficulty: 'Intermediate',
            goal: 'build_muscle',
            isPremium: true,
            thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500'
        }
    ];

    for (const prog of PROGRAMS) {
        await prisma.workoutProgram.upsert({
            where: { id: prog.id },
            update: {},
            create: prog
        });
    }

    // --- SEED RECIPES ---
    console.log('Seeding Recipes...');
    const RECIPES = [
        {
            id: 'rec-1',
            title: 'Oatmeal & Berries',
            description: 'Healthy energy boosting breakfast.',
            calories: 350,
            protein: 12,
            carbs: 60,
            fat: 6,
            imageUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500',
            ingredients: JSON.stringify(['Oats', 'Blueberries', 'Honey', 'Milk']),
            instructions: 'Boil milk, add oats, top with berries.',
            isPremium: false
        },
        {
            id: 'rec-2',
            title: 'Grilled Chicken Salad',
            description: 'High protein low carb lunch.',
            calories: 450,
            protein: 40,
            carbs: 10,
            fat: 20,
            imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
            ingredients: JSON.stringify(['Chicken Breast', 'Lettuce', 'Olive Oil', 'Tomatoes']),
            instructions: 'Grill chicken, toss salad.',
            isPremium: false
        },
        {
            id: 'rec-3',
            title: 'Keto Avocado Smoothie',
            description: 'Perfect for keto diet.',
            calories: 300,
            protein: 5,
            carbs: 8,
            fat: 25,
            imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
            ingredients: JSON.stringify(['Avocado', 'Spinach', 'Almond Milk', 'Stevia']),
            instructions: 'Blend all ingredients.',
            isPremium: true
        }
    ];

    for (const rec of RECIPES) {
        await prisma.recipe.upsert({
            where: { id: rec.id },
            update: {},
            create: rec
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error('Fatal error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
