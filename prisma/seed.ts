

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

async function main() {
    console.log('Start seeding...');
    const url = process.env.DATABASE_URL;
    console.log('DB URL defined:', !!url);
    // Do not log the actual URL to avoid leaking secrets, but log length/prefix if needed.
    if (!url) {
        console.error('DATABASE_URL is not defined!');
        throw new Error('DATABASE_URL missing');
    }

    for (const w of WORKOUTS) {
        console.log(`Upserting workout with id: ${w.id}`);

        try {
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
                    isActive: true,
                    isPremium: false
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
                    isActive: true,
                    isPremium: false
                }
            });

            // Handle exercises
            await prisma.exercise.deleteMany({
                where: { workoutId: workout.id }
            });

            console.log(`Creating ${w.exercises.length} exercises for workout ${w.id}...`);

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
        } catch (innerError: any) {
            console.error(`Failed to seed workout ${w.id}`);
            console.error('Error details:', innerError);
            throw innerError;
        }
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
