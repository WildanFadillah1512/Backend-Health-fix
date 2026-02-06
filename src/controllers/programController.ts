
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

export const enrollInProgram = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;
        const { programId } = req.body;

        // Get Prisma user
        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if already enrolled
        const existing = await prisma.userProgram.findFirst({
            where: {
                userId: user.id,
                programId
            }
        });

        if (existing) {
            return res.status(400).json({ error: 'Already enrolled in this program' });
        }

        // Create enrollment
        const enrollment = await prisma.userProgram.create({
            data: {
                userId: user.id,
                programId,
                startDate: new Date(),
                currentWeek: 1
            },
            include: {
                program: true
            }
        });

        res.json(enrollment);
    } catch (error) {
        console.error('Enrollment error:', error);
        res.status(500).json({ error: 'Failed to enroll in program' });
    }
};

export const getUserEnrollments = async (req: AuthRequest, res: Response) => {
    try {
        const { uid } = req.user!;

        // Get Prisma user
        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const enrollments = await prisma.userProgram.findMany({
            where: { userId: user.id },
            include: { program: true },
            orderBy: { startDate: 'desc' }
        });

        res.json(enrollments);
    } catch (error) {
        console.error('Get enrollments error:', error);
        res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
};
