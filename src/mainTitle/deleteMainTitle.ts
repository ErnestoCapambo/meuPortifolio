import { Request, Response } from "express";
import { verifyUser } from "../user/userController/verifyUser";
import { prisma } from "../lib/Prisma";

export async function deleteMainTitle(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId, titleId } = req.params
        verifyUser(req, res, async() => {
            if (userId && titleId) {
                if (!Number(titleId)) {
                    return res.status(406).json({error: 'Title id must be a number.'})
                }
                const mainTitle = await prisma.maintitle.findUnique({
                    where: { id: Number(titleId) }
                })
                if (mainTitle === null) {
                    return res.status(404).json({error: 'Main title does not exist!'})
                }
                const deleteTitle = await prisma.maintitle.delete({
                    where: { id: Number(titleId) }
                })
                return res.status(200).json({success: 'Main title deleted successfully!'})
            } else {
                return res.status(406).json({error: 'User id and title id are required!'})
            }
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}