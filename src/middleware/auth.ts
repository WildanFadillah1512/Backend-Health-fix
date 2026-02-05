import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';

export interface AuthRequest extends Request {
    user?: {
        uid: string;
        email?: string;
    };
}

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized: No token provided' });
        return;
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
        };
        next();
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
