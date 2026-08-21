import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../repository/index.js';
import { generateToken, authenticateToken, AuthRequest } from '../Config/auth.js';

const routes = Router();

// Health check - no auth needed
routes.get('/health', async (req, res) => {
    try {
        const userCount = await prisma.user.count();
        res.json({ status: 'ok', userCount });
    } catch (error) {
        res.status(500).json({ status: 'error', message: String(error) });
    }
});

// Login
routes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ error: 'Wrong password' });
            return;
        }

        const token = generateToken(user.id);

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Verify token
routes.get('/verify', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { id: true, username: true, email: true }
        });

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json({ user });
    } catch (error) {
        console.error('Verify error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { routes as authRoutes };
