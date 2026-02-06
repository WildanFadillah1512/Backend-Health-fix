
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRecipes = async (req: AuthRequest, res: Response) => {
    try {
        const recipes = await prisma.recipe.findMany();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
};

export const getRecipe = async (req: AuthRequest, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const recipe = await prisma.recipe.findUnique({ where: { id } });
        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipe' });
    }
};
