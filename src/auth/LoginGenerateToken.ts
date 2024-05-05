import Jwt from "jsonwebtoken";
import { prisma } from "../lib/Prisma";
import { Request, Response, NextFunction } from "express";

export const secretKey = '67f8c5or2f485fc331ba3f29f34af97a6622b1b68c76e383322d034b06b9a21fd4650jd351a89484a936c406296234bb883462dgfhjposxks56765ws43186d849cne775d6cc9b38dbeb3af43ae2c4e0da6d11855b0'

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
                },
                secretKey,
                { expiresIn: '1h' },
            )
            return res.status(200).json(token)
        }
        if (user == null) {
            return res.status(401).json({ error: 'Credenciais invalidas!' })
        }
        next()
    } catch (err: any) {
        return res.status(404).json(err)
    }
}
