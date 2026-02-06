import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Get All Foods (System Foods + User's Custom Foods)
export const getFoods = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.uid;

        const foods = await prisma.food.findMany({
            where: {
                OR: [
                    { isSystemFood: true },
                    { createdBy: userId }
                ]
            },
            orderBy: { name: 'asc' }
        });
        res.json(foods);
    } catch (error) {
        console.error('Failed to fetch foods:', error);
        res.status(500).json({ error: 'Failed to fetch foods' });
    }
};

// Search Foods (Simpler Server-Side Search)
export const searchFoods = async (req: AuthRequest, res: Response) => {
    const query = req.query.q as string;
    if (!query) {
        res.json([]);
        return;
    }

    try {
        const userId = req.user?.uid;

        const foods = await prisma.food.findMany({
            where: {
                AND: [
                    {
                        name: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        OR: [
                            { isSystemFood: true },
                            { createdBy: userId }
                        ]
                    }
                ]
            },
            take: 20
        });
        res.json(foods);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'Search failed' });
    }
};

// Create Custom Food
export const createCustomFood = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.uid;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { name, calories, protein, carbs, fat, image } = req.body;

        if (!name || !calories) {
            return res.status(400).json({ error: 'Name and calories required' });
        }

        const food = await prisma.food.create({
            data: {
                name,
                calories: parseInt(calories),
                protein: parseFloat(protein) || 0,
                carbs: parseFloat(carbs) || 0,
                fat: parseFloat(fat) || 0,
                image: image || null,
                isSystemFood: false,
                createdBy: userId
            }
        });

        res.json(food);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create food' });
    }
};

// Get User's Custom Foods Only
export const getUserFoods = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.uid;

        const foods = await prisma.food.findMany({
            where: {
                OR: [
                    { isSystemFood: true },
                    { createdBy: userId }
                ]
            },
            orderBy: { name: 'asc' }
        });

        res.json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch foods' });
    }
};

