import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";
import { verifyUser } from "../user/userController/verifyUser";


export async function updateAbout(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId, aboutId } = req.params
        const { paragraph1, paragraph2 } = req.body
        verifyUser(req, res, async() => {
            if (userId && aboutId) {
                const about = await prisma.about.findUnique({
                    where: { id: Number(aboutId) }
                })
                if (about === null) {
                    return res.status(404).json({error: 'About does not exist.'})
                } else {
                    const updated = await prisma.about.update({
                        where: { id: Number(aboutId) },
                        data: { paragraph1, paragraph2 }
                    })
                    return res.status(200).json({success: 'Update successfuly.'})
                }
            } else {
                return res.status(406).json({error: 'User id and about id are required!'})
            }
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}