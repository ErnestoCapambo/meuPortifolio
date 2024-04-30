import { Request, Response } from "express";
import { verifyUser } from "../user/userController/verifyUser";
import { prisma } from "../lib/Prisma";

export async function updateMainTitle(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId, titleId } = req.params
        const { title, description } = req.body
        verifyUser(req, res, async() => {
            if (userId && titleId) {
                const verifyMainTitle = await prisma.maintitle.findUnique({
                    where: { id: Number(titleId) }
                })
                if (verifyMainTitle === null) {
                    return res.status(404).json({error: "This main title does not exist!"})
                }
                const mainTitl = await prisma.maintitle.update({
                    where: { id: Number(titleId) },
                    data: {
                        title,
                        description,
                    }
                })
                return res.status(200).json({success: 'Updated successfully!'})
            } else {
                return res.status(406).json({error: 'User id and title id are required.'})
            }
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}