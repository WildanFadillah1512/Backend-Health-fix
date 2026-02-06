
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPrograms = async (req: AuthRequest, res: Response) => {
    try {
        const programs = await prisma.workoutProgram.findMany({
            include: { workouts: true }
        });
        res.json(programs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch programs' });
    }
};

export const getProgram = async (req: AuthRequest, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const program = await prisma.workoutProgram.findUnique({
            where: { id },
            include: { workouts: { include: { workout: true } } }
        });
        if (!program) return res.status(404).json({ error: 'Program not found' });
        res.json(program);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch program' });
    }
};
