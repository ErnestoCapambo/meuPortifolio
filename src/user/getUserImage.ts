import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";

export async function getUserImage(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId } = req.params
        if (!userId) {
            return res.status(406).json({error: 'User id is required!'})
        }
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        if (user !== null) {
            return res.status(200).sendFile(String(user.image_path))
        } else {
            return res.status(404).json({error: 'User image does not exist.'})
        }
    } catch (err:any) {
        return res.status(500).json(err)
    }
}