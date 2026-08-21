import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { prisma } from '../repository/index.js';
import { authenticateToken, AuthRequest } from '../Config/auth.js';

const routes = Router();

// Configure multer for video uploads
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/videos';
        fs.mkdir(uploadDir, { recursive: true }, (err) => {
            cb(null, uploadDir);
        });
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const videoUpload = multer({
    storage: videoStorage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB max
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only video files are allowed.'));
        }
    }
});

// Get all published videos (public)
routes.get('/', async (req, res) => {
    try {
        const videos = await prisma.video.findMany({
            where: { published: true },
            orderBy: { created_at: 'desc' }
        });
        res.json(videos);
    } catch (error) {
        console.error('Get videos error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all videos including unpublished (admin)
routes.get('/admin', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const videos = await prisma.video.findMany({
            orderBy: { created_at: 'desc' }
        });
        res.json(videos);
    } catch (error) {
        console.error('Get admin videos error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Upload video (admin only)
routes.post('/upload', authenticateToken, videoUpload.single('video'), async (req: AuthRequest, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No video file provided' });
            return;
        }

        const { title, description, project_id, experience_id } = req.body;

        const video = await prisma.video.create({
            data: {
                title: title || req.file.originalname,
                description: description || null,
                file_url: `/uploads/videos/${req.file.filename}`,
                file_key: req.file.filename,
                file_size: req.file.size,
                mime_type: req.file.mimetype,
                project_id: project_id || null,
                experience_id: experience_id || null,
                user_id: req.userId!,
                published: false
            }
        });

        res.status(201).json(video);
    } catch (error) {
        console.error('Upload video error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update video metadata (admin only)
routes.put('/:video_id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const { video_id } = req.params;
        const { title, description, published, project_id, experience_id } = req.body;

        const video = await prisma.video.update({
            where: { id: video_id },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(published !== undefined && { published }),
                ...(project_id !== undefined && { project_id }),
                ...(experience_id !== undefined && { experience_id })
            }
        });

        res.json(video);
    } catch (error) {
        console.error('Update video error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete video (admin only)
routes.delete('/:video_id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const { video_id } = req.params;

        const video = await prisma.video.findUnique({ where: { id: video_id } });
        if (!video) {
            res.status(404).json({ error: 'Video not found' });
            return;
        }

        // Delete file from disk
        if (video.file_url) {
            const filePath = path.join('.', video.file_url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await prisma.video.delete({ where: { id: video_id } });

        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error('Delete video error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { routes as videoRoutes };
