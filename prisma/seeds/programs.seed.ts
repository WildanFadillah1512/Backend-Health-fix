import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const programsData = [
    {
        title: "Beginner Full Body Challenge",
        description: "4-week program designed for beginners to build overall strength and endurance. Perfect for those starting their fitness journey.",
        duration: 4, // weeks
        difficulty: "Beginner",
        goal: "Build Foundation",
        isPremium: false,
        schedule: [
            // Week 1
            { week: 1, day: 1, category: "Full Body" },
            { week: 1, day: 3, category: "Cardio" },
            { week: 1, day: 5, category: "Full Body" },
            // Week 2
            { week: 2, day: 1, category: "Full Body" },
            { week: 2, day: 3, category: "Core" },
            { week: 2, day: 5, category: "Cardio" },
            // Week 3
            { week: 3, day: 1, category: "Strength" },
            { week: 3, day: 3, category: "Cardio" },
            { week: 3, day: 5, category: "Full Body" },
            // Week 4
            { week: 4, day: 1, category: "Strength" },
            { week: 4, day: 3, category: "Core" },
            { week: 4, day: 5, category: "Full Body" }
        ]
    },
    {
        title: "Fat Burn Accelerator",
        description: "6-week high-intensity program focused on maximum calorie burn and fat loss. Combines HIIT and strength training.",
        duration: 6,
        difficulty: "Intermediate",
        goal: "Lose Weight",
        isPremium: false,
        schedule: [
            // Week 1
            { week: 1, day: 1, category: "HIIT" },
            { week: 1, day: 2, category: "Strength" },
            { week: 1, day: 4, category: "Cardio" },
            { week: 1, day: 6, category: "HIIT" },
            // Week 2
            { week: 2, day: 1, category: "HIIT" },
            { week: 2, day: 2, category: "Cardio" },
            { week: 2, day: 4, category: "Strength" },
            { week: 2, day: 6, category: "HIIT" },
            // Week 3-6 similar pattern
            { week: 3, day: 1, category: "HIIT" },
            { week: 3, day: 3, category: "Cardio" },
            { week: 3, day: 5, category: "HIIT" },
            { week: 4, day: 1, category: "HIIT" },
            { week: 4, day: 3, category: "Strength" },
            { week: 4, day: 5, category: "Cardio" },
            { week: 5, day: 1, category: "HIIT" },
            { week: 5, day: 3, category: "HIIT" },
            { week: 5, day: 5, category: "Cardio" },
            { week: 6, day: 1, category: "HIIT" },
            { week: 6, day: 3, category: "Strength" },
            { week: 6, day: 5, category: "HIIT" }
        ]
    },
    {
        title: "Muscle Builder Pro",
        description: "8-week intensive program for building lean muscle mass. Focus on progressive overload and compound movements.",
        duration: 8,
        difficulty: "Intermediate",
        goal: "Gain Muscle",
        isPremium: true,
        schedule: [
            // Week 1
            { week: 1, day: 1, category: "Strength" },
            { week: 1, day: 2, category: "Strength" },
            { week: 1, day: 4, category: "Strength" },
            { week: 1, day: 5, category: "Core" },
            // Week 2
            { week: 2, day: 1, category: "Strength" },
            { week: 2, day: 2, category: "Strength" },
            { week: 2, day: 4, category: "Strength" },
            { week: 2, day: 5, category: "Flexibility" },
            // Weeks 3-8 similar pattern
            { week: 3, day: 1, category: "Strength" },
            { week: 3, day: 3, category: "Strength" },
            { week: 3, day: 5, category: "Strength" },
            { week: 4, day: 1, category: "Strength" },
            { week: 4, day: 3, category: "Strength" },
            { week: 4, day: 5, category: "Core" },
            { week: 5, day: 1, category: "Strength" },
            { week: 5, day: 3, category: "Strength" },
            { week: 5, day: 5, category: "Strength" },
            { week: 6, day: 1, category: "Strength" },
            { week: 6, day: 3, category: "Strength" },
            { week: 6, day: 5, category: "Flexibility" },
            { week: 7, day: 1, category: "Strength" },
            { week: 7, day: 3, category: "Strength" },
            { week: 7, day: 5, category: "Strength" },
            { week: 8, day: 1, category: "Strength" },
            { week: 8, day: 3, category: "Strength" },
            { week: 8, day: 5, category: "Full Body" }
        ]
    },
    {
        title: "30-Day HIIT Challenge",
        description: "Intense 4-week challenge featuring daily HIIT workouts. Build endurance and torch calories.",
        duration: 4,
        difficulty: "Advanced",
        goal: "Lose Weight",
        isPremium: false,
        schedule: [
            // Week 1 -Daily HIIT
            { week: 1, day: 1, category: "HIIT" },
            { week: 1, day: 2, category: "HIIT" },
            { week: 1, day: 3, category: "Cardio" },
            { week: 1, day: 4, category: "HIIT" },
            { week: 1, day: 5, category: "HIIT" },
            { week: 1, day: 6, category: "Core" },
            // Week 2
            { week: 2, day: 1, category: "HIIT" },
            { week: 2, day: 2, category: "HIIT" },
            { week: 2, day: 3, category: "Cardio" },
            { week: 2, day: 4, category: "HIIT" },
            { week: 2, day: 5, category: "HIIT" },
            { week: 2, day: 6, category: "Flexibility" },
            // Week 3
            { week: 3, day: 1, category: "HIIT" },
            { week: 3, day: 2, category: "HIIT" },
            { week: 3, day: 3, category: "HIIT" },
            { week: 3, day: 4, category: "Core" },
            { week: 3, day: 5, category: "HIIT" },
            { week: 3, day: 6, category: "HIIT" },
            // Week 4
            { week: 4, day: 1, category: "HIIT" },
            { week: 4, day: 2, category: "HIIT" },
            { week: 4, day: 3, category: "HIIT" },
            { week: 4, day: 4, category: "Cardio" },
            { week: 4, day: 5, category: "HIIT" },
            { week: 4, day: 6, category: "HIIT" }
        ]
    },
    {
        title: "Core Strength Intensive",
        description: "4-week program dedicated to building a strong, defined core. Mix of stability, strength, and endurance exercises.",
        duration: 4,
        difficulty: "Intermediate",
        goal: "Build Muscle",
        isPremium: false,
        schedule: [
            // Week 1
            { week: 1, day: 1, category: "Core" },
            { week: 1, day: 3, category: "Core" },
            { week: 1, day: 5, category: "Flexibility" },
            // Week 2
            { week: 2, day: 1, category: "Core" },
            { week: 2, day: 3, category: "Core" },
            { week: 2, day: 5, category: "Core" },
            // Week 3
            { week: 3, day: 1, category: "Core" },
            { week: 3, day: 3, category: "Core" },
            { week: 3, day: 5, category: "Flexibility" },
            // Week 4
            { week: 4, day: 1, category: "Core" },
            { week: 4, day: 3, category: "Core" },
            { week: 4, day: 5, category: "Core" }
        ]
    },
    {
        title: "Endurance Runner's Plan",
        description: "6-week program to build cardiovascular endurance and running stamina. Perfect for preparing for a 5K or 10K.",
        duration: 6,
        difficulty: "Intermediate",
        goal: "Improve Endurance",
        isPremium: true,
        schedule: [
            // Week 1
            { week: 1, day: 1, category: "Cardio" },
            { week: 1, day: 3, category: "Cardio" },
            { week: 1, day: 5, category: "Flexibility" },
            // Week 2
            { week: 2, day: 1, category: "Cardio" },
            { week: 2, day: 3, category: "Cardio" },
            { week: 2, day: 5, category: "Core" },
            // Week 3
            { week: 3, day: 1, category: "Cardio" },
            { week: 3, day: 3, category: "Cardio" },
            { week: 3, day: 5, category: "Strength" },
            // Week 4
            { week: 4, day: 1, category: "Cardio" },
            { week: 4, day: 3, category: "Cardio" },
            { week: 4, day: 5, category: "Cardio" },
            // Week 5
            { week: 5, day: 1, category: "Cardio" },
            { week: 5, day: 3, category: "Cardio" },
            { week: 5, day: 5, category: "Flexibility" },
            // Week 6
            { week: 6, day: 1, category: "Cardio" },
            { week: 6, day: 3, category: "Cardio" },
            { week: 6, day: 5, category: "Cardio" }
        ]
    },
    {
        title: "Total Body Transformation",
        description: "12-week comprehensive program combining strength, cardio, and flexibility. Complete body transformation.",
        duration: 12,
        difficulty: "Advanced",
        goal: "Overall Fitness",
        isPremium: true,
        schedule: [
            // Weeks 1-3: Foundation
            { week: 1, day: 1, category: "Full Body" },
            { week: 1, day: 2, category: "Cardio" },
            { week: 1, day: 4, category: "Strength" },
            { week: 1, day: 5, category: "Core" },
            { week: 2, day: 1, category: "Strength" },
            { week: 2, day: 2, category: "HIIT" },
            { week: 2, day: 4, category: "Full Body" },
            { week: 2, day: 5, category: "Flexibility" },
            { week: 3, day: 1, category: "Strength" },
            { week: 3, day: 2, category: "Cardio" },
            { week: 3, day: 4, category: "HIIT" },
            { week: 3, day: 5, category: "Core" },
            // Weeks 4-8: Build
            { week: 4, day: 1, category: "Strength" },
            { week: 4, day: 3, category: "HIIT" },
            { week: 4, day: 5, category: "Strength" },
            { week: 5, day: 1, category: "HIIT" },
            { week: 5, day: 3, category: "Strength" },
            { week: 5, day: 5, category: "Cardio" },
            { week: 6, day: 1, category: "Strength" },
            { week: 6, day: 3, category: "HIIT" },
            { week: 6, day: 5, category: "Core" },
            { week: 7, day: 1, category: "Strength" },
            { week: 7, day: 3, category: "Cardio" },
            { week: 7, day: 5, category: "HIIT" },
            { week: 8, day: 1, category: "Full Body" },
            { week: 8, day: 3, category: "HIIT" },
            { week: 8, day: 5, category: "Strength" },
            // Weeks 9-12: Peak
            { week: 9, day: 1, category: "Strength" },
            { week: 9, day: 3, category: "HIIT" },
            { week: 9, day: 5, category: "Strength" },
            { week: 10, day: 1, category: "HIIT" },
            { week: 10, day: 3, category: "Strength" },
            { week: 10, day: 5, category: "Full Body" },
            { week: 11, day: 1, category: "Strength" },
            { week: 11, day: 3, category: "HIIT" },
            { week: 11, day: 5, category: "Cardio" },
            { week: 12, day: 1, category: "Full Body" },
            { week: 12, day: 3, category: "HIIT" },
            { week: 12, day: 5, category: "Strength" }
        ]
    }
];

export async function seedPrograms() {
    console.log('🌱 Seeding workout programs...');

    for (const programData of programsData) {
        const { schedule, ...programInfo } = programData;

        // Check if program exists
        const existingProgram = await prisma.workoutProgram.findFirst({
            where: { title: programInfo.title }
        });

        const program = existingProgram || await prisma.workoutProgram.create({
            data: programInfo
        });

        console.log(`  📋 Created program: ${program.title}`);

        // Link workouts to the program
        for (const day of schedule) {
            // Find a workout matching the category and difficulty
            const workout = await prisma.workout.findFirst({
                where: {
                    category: day.category,
                    difficulty: programInfo.difficulty,
                    isActive: true
                }
            });

            if (workout) {
                // Check if link exists
                const existingLink = await prisma.programWorkout.findFirst({
                    where: {
                        programId: program.id,
                        weekNumber: day.week,
                        dayNumber: day.day
                    }
                });

                if (!existingLink) {
                    await prisma.programWorkout.create({
                        data: {
                            programId: program.id,
                            workoutId: workout.id,
                            weekNumber: day.week,
                            dayNumber: day.day
                        }
                    });
                }
            } else {
                console.warn(`  ⚠️  No ${day.category} workout found for ${programInfo.difficulty} difficulty`);
            }
        }
    }

    console.log(`✅ Seeded ${programsData.length} workout programs`);
}
