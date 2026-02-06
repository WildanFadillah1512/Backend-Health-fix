import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic Health Check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'HealthFit API is running' });
});

import userRoutes from './routes/userRoutes';
import workoutRoutes from './routes/workoutRoutes';
import mealRoutes from './routes/mealRoutes';
import notificationRoutes from './routes/notificationRoutes';
import aiRoutes from './routes/aiRoutes';
import foodRoutes from './routes/foodRoutes';
import achievementRoutes from './routes/achievementRoutes';
import recommendationRoutes from './routes/recommendationRoutes';
import waterRoutes from './routes/waterRoutes';
import sleepRoutes from './routes/sleepRoutes';
import measurementRoutes from './routes/measurementRoutes';
import programRoutes from './routes/programRoutes';
import recipeRoutes from './routes/recipeRoutes';

// Routes
app.use('/api/user', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/measurements', measurementRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/recipes', recipeRoutes);

// Initialize Scheduler
import { initScheduler } from './services/scheduler';
initScheduler();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
