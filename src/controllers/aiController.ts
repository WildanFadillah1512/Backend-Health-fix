import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';

export const chat = async (req: AuthRequest, res: Response) => {
    try {
        const { message } = req.body;

        if (!process.env.GROQ_API_KEY) {
            res.status(500).json({ error: 'AI service not configured (Missing API Key)' });
            return;
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile', // Updated to supported model
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
        const aiMessage = data.choices[0]?.message?.content || "I couldn't generate a response.";

        res.json({ text: aiMessage });

    } catch (error: any) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ error: 'Failed to communicate with AI Coach', details: error.message });
    }
};
