import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";
import { verifyUser } from "./userController/verifyUser";

export async function deleteUser(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId } = req.params
        verifyUser(req, res, async() => {
            const delUser = await prisma.user.delete({
                where: { id: userId }
            })
            return res.status(200).json({success: 'Deleted successful.'})
        })
    } catch (err:any) {
        return res.status(500).json(err)
    }
}