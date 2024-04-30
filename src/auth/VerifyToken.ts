import { Request, Response, NextFunction } from 'express'
import { secretKey } from './LoginGenerateToken'
import Jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null)
            return res.status(401).json({ error: 'Token not given!' })
    
        Jwt.verify(token, secretKey, (err, user) => {
            if (err) return res.status(403).json({ error: 'Invalid token!' })
            req.user = user
            next()
        })
        
    } catch (err: any) {
        return res.status(500).json(err)
    }    
}
