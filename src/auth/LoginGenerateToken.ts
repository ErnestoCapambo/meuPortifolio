import Jwt from "jsonwebtoken";
import { prisma } from "../lib/Prisma";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

const secretKey = process.env.SECRET_KEY

export async function LoginGenerateToken(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { username: username, email: email, password: password },
        })
        if (user) {
            const token = Jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    name: user.username,
                    is_active: true,
                    password: user.password
                },
                String(secretKey),
                { expiresIn: '1h' },
            )
            return res.status(200).json({token: token})
        }
        if (user == null) {
            return res.status(401).json({ error: 'Credenciais invalidas!' })
        }
        next()
    } catch (err: any) {
        return res.status(404).json(err)
    }
}
