import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";
import { verifyUser } from "./userController/verifyUser";

export async function getUser(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId } = req.params
        verifyUser(req, res, async() => {
            if (!userId) {
                const user = await prisma.user.findMany()
                return res.status(200).json(user)
            }
            const user = await prisma.user.findUnique({
                where: { id: userId }
            })
            return res.status(200).json(user)
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}