import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../uploads');

        // Create uploads directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename: timestamp-userid-original
        const { uid } = (req as any).user;
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const filename = `${timestamp}-${uid}${ext}`;
        cb(null, filename);
    }
});

// File filter - only allow images
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

/**
 * Upload profile photo
 * POST /api/upload/profile
 */
router.post('/profile', authenticate, upload.single('photo'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { uid } = (req as any).user;
        const photoUrl = `/uploads/${req.file.filename}`;

        // Update user avatarUrl in database
        await prisma.user.update({
            where: { firebaseUid: uid },
            data: { avatarUrl: photoUrl }
        });

        await prisma.$disconnect();

        res.json({
            success: true,
            photoUrl,
            filename: req.file.filename,
            size: req.file.size
        });
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
});

/**
 * Upload progress photo
 * POST /api/upload/progress-photo
 */
router.post('/progress-photo', authenticate, upload.single('photo'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Construct the file URL
        // In production, this would be a full URL with your domain
        const photoUrl = `/uploads/${req.file.filename}`;

        res.json({
            success: true,
            photoUrl,
            filename: req.file.filename,
            size: req.file.size
        });
    } catch (error) {
        console.error('Error uploading progress photo:', error);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
});

/**
 * Upload meal image
 * POST /api/upload/meal-image
 */
router.post('/meal-image', authenticate, upload.single('photo'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Construct the file URL
        const photoUrl = `/uploads/${req.file.filename}`;

        res.json({
            success: true,
            photoUrl,
            filename: req.file.filename,
            size: req.file.size
        });
    } catch (error) {
        console.error('Error uploading meal image:', error);
        res.status(500).json({ error: 'Failed to upload photo' });
    }
});

/**
 * Delete uploaded file
 * DELETE /api/upload/:filename
 */
router.delete('/:filename', authenticate, async (req: Request, res: Response) => {
    try {
        const { filename } = req.params;

        // Type guard: ensure filename is string, not string[]
        const fileToDelete = Array.isArray(filename) ? filename[0] : filename;
        const filePath = path.join(__dirname, '../../uploads', fileToDelete);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Delete the file
        fs.unlinkSync(filePath);

        res.json({ success: true, message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
});

export default router;
