import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const achievementsData = [
    // Workout Milestones
    {
        title: "First Step",
        description: "Complete your first workout",
        icon: "🎯",
        requirement: "Complete 1 workout",
        category: "workout"
    },
    {
        title: "Getting Started",
        description: "Complete 5 workouts",
        icon: "💪",
        requirement: "Complete 5 workouts",
        category: "workout"
    },
    {
        title: "Dedicated",
        description: "Complete 10 workouts",
        icon: "🔥",
        requirement: "Complete 10 workouts",
        category: "workout"
    },
    {
        title: "Committed",
        description: "Complete 25 workouts",
        icon: "⭐",
        requirement: "Complete 25 workouts",
        category: "workout"
    },
    {
        title: "Fitness Enthusiast",
        description: "Complete 50 workouts",
        icon: "🏆",
        requirement: "Complete 50 workouts",
        category: "workout"
    },
    {
        title: "Century Club",
        description: "Complete 100 workouts",
        icon: "💯",
        requirement: "Complete 100 workouts",
        category: "workout"
    },
    {
        title: "Fitness Legend",
        description: "Complete 250 workouts",
        icon: "👑",
        requirement: "Complete 250 workouts",
        category: "workout"
    },

    // Streak Achievements
    {
        title: "Consistency King",
        description: "3-day workout streak",
        icon: "🔥",
        requirement: "Complete workouts 3 days in a row",
        category: "streak"
    },
    {
        title: "Week Warrior",
        description: "7-day workout streak",
        icon: "⚡",
        requirement: "Complete workouts 7 days in a row",
        category: "streak"
    },
    {
        title: "Fortnight Fighter",
        description: "14-day workout streak",
        icon: "💥",
        requirement: "Complete workouts 14 days in a row",
        category: "streak"
    },
    {
        title: "Monthly Master",
        description: "30-day workout streak",
        icon: "🌟",
        requirement: "Complete workouts 30 days in a row",
        category: "streak"
    },
    {
        title: "Unstoppable",
        description: "60-day workout streak",
        icon: "🚀",
        requirement: "Complete workouts 60 days in a row",
        category: "streak"
    },
    {
        title: "Beast Mode",
        description: "100-day workout streak",
        icon: "🦾",
        requirement: "Complete workouts 100 days in a row",
        category: "streak"
    },

    // Calorie Achievements
    {
        title: "Calorie Crusher",
        description: "Burn 1,000 total calories",
        icon: "🔥",
        requirement: "Burn 1,000 calories total",
        category: "calories"
    },
    {
        title: "Fat Burner",
        description: "Burn 5,000 total calories",
        icon: "💪",
        requirement: "Burn 5,000 calories total",
        category: "calories"
    },
    {
        title: "Kilojoule King",
        description: "Burn 10,000 total calories",
        icon: "👑",
        requirement: "Burn 10,000 calories total",
        category: "calories"
    },
    {
        title: "Inferno",
        description: "Burn 25,000 total calories",
        icon: "🌋",
        requirement: "Burn 25,000 calories total",
        category: "calories"
    },
    {
        title: "Phoenix Rising",
        description: "Burn 50,000 total calories",
        icon: "🔥",
        requirement: "Burn 50,000 calories total",
        category: "calories"
    },

    // Category Diversity
    {
        title: "Well Rounded",
        description: "Try all workout categories",
        icon: "🎨",
        requirement: "Complete at least one workout from each category",
        category: "diversity"
    },
    {
        title: "Strength Master",
        description: "Complete 20 strength workouts",
        icon: "💪",
        requirement: "Complete 20 strength workouts",
        category: "diversity"
    },
    {
        title: "Cardio Champion",
        description: "Complete 20 cardio workouts",
        icon: "❤️",
        requirement: "Complete 20 cardio workouts",
        category: "diversity"
    },
    {
        title: "Core Crusher",
        description: "Complete 20 core workouts",
        icon: "🎯",
        requirement: "Complete 20 core workouts",
        category: "diversity"
    },
    {
        title: "Flexibility Guru",
        description: "Complete 20 flexibility workouts",
        icon: "🧘",
        requirement: "Complete 20 flexibility workouts",
        category: "diversity"
    },
    {
        title: "HIIT Hero",
        description: "Complete 20 HIIT workouts",
        icon: "⚡",
        requirement: "Complete 20 HIIT workouts",
        category: "diversity"
    },

    // Program Achievements
    {
        title: "Program Starter",
        description: "Enroll in your first program",
        icon: "📚",
        requirement: "Enroll in a workout program",
        category: "program"
    },
    {
        title: "Program Graduate",
        description: "Complete your first program",
        icon: "🎓",
        requirement: "Complete an entire workout program",
        category: "program"
    },
    {
        title: "Program Collector",
        description: "Complete 3 different programs",
        icon: "🏅",
        requirement: "Complete 3 workout programs",
        category: "program"
    },

    // Social & Gamification
    {
        title: "Level Up",
        description: "Reach Level 5",
        icon: "⬆️",
        requirement: "Reach user level 5",
        category: "social"
    },
    {
        title: "Elite Status",
        description: "Reach Level 10",
        icon: "💎",
        requirement: "Reach user level 10",
        category: "social"
    },
    {
        title: "Premium Member",
        description: "Join HealthFit Premium",
        icon: "👑",
        requirement: "Subscribe to premium",
        category: "social"
    },
    {
        title: "Early Bird",
        description: "Complete a workout before 7 AM",
        icon: "🌅",
        requirement: "Complete workout before 7 AM",
        category: "social"
    },
    {
        title: "Night Owl",
        description: "Complete a workout after 10 PM",
        icon: "🌙",
        requirement: "Complete workout after 10 PM",
        category: "social"
    }
];

export async function seedAchievements() {
    console.log('🌱 Seeding achievements...');

    for (const achievement of achievementsData) {
        // Check if achievement exists by title
        const existing = await prisma.achievement.findFirst({
            where: { title: achievement.title }
        });

        if (!existing) {
            await prisma.achievement.create({
                data: achievement
            });
        }
    }

    console.log(`✅ Seeded ${achievementsData.length} achievements`);
}
