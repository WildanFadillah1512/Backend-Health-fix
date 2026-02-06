import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const chat = async (req: AuthRequest, res: Response) => {
    try {
        const { message } = req.body;
        const { uid } = req.user!;

        if (!process.env.GROQ_API_KEY) {
            res.status(500).json({ error: 'AI service not configured (Missing API Key)' });
            return;
        }

        // 1. Get user to link session
        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // 2. Find or Create Active Session (For simplicity, monthly or single active session)
        // Check if there is a session created today, otherwise create new
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let session = await prisma.chatSession.findFirst({
            where: {
                userId: user.id,
                startedAt: { gte: today }
            }
        });

        if (!session) {
            session = await prisma.chatSession.create({
                data: {
                    userId: user.id,
                    title: `Chat ${new Date().toLocaleDateString()}`
                }
            });
        }

        // 3. Save User Message
        await prisma.chatMessage.create({
            data: {
                sessionId: session.id,
                sender: 'user',
                text: message
            }
        });

        // 4. Call Groq API
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful, motivating, and knowledgeable AI fitness coach. Help the user with workouts, nutrition, and wellness advice. Keep responses concise and encouraging.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();
        const aiMessageText = data.choices[0]?.message?.content || "I couldn't generate a response.";

        // 5. Save AI Response
        await prisma.chatMessage.create({
            data: {
                sessionId: session.id,
                sender: 'ai',
                text: aiMessageText
            }
        });

        res.json({ text: aiMessageText });

    } catch (error: any) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ error: 'Failed to communicate with AI Coach', details: error.message });
    }
};

export const syncChat = async (req: AuthRequest, res: Response) => {
    try {
        const { messages } = req.body; // Array of { text, sender, timestamp }
        const { uid } = req.user!;

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.json({ synced: 0 });
        }

        const user = await prisma.user.findUnique({ where: { firebaseUid: uid } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let syncedCount = 0;

        for (const msg of messages) {
            const msgDate = new Date(msg.timestamp);
            const dateKey = new Date(msgDate);
            dateKey.setHours(0, 0, 0, 0);

            // Find session for that day
            let session = await prisma.chatSession.findFirst({
                where: {
                    userId: user.id,
                    startedAt: {
                        gte: dateKey,
                        lt: new Date(dateKey.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            });

            if (!session) {
                session = await prisma.chatSession.create({
                    data: {
                        userId: user.id,
                        title: `Chat ${msgDate.toLocaleDateString()}`,
                        startedAt: msgDate
                    }
                });
            }

            // Create message (trusting frontend content)
            await prisma.chatMessage.create({
                data: {
                    sessionId: session.id,
                    sender: msg.sender,
                    text: msg.text,
                    timestamp: msgDate
                }
            });
            syncedCount++;
        }

        res.json({ synced: syncedCount });

    } catch (error: any) {
        console.error('AI Sync Error:', error);
        res.status(500).json({ error: 'Failed to sync chat' });
    }
};
