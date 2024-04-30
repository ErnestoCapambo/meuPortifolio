import { NextFunction, Request, Response } from "express";
import { prisma } from "../../lib/Prisma";

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params
        if (!userId) {
            return res.status(406).json({error: 'User id is required!'})
        }
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        if (user == null) {
            return res.status(404).json({error: 'Invalid User.'})
        }
        next()
    } catch (err:any) {
        return res.status(500).json(err)
    }
}