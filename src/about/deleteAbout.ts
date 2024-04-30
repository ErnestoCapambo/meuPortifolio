import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";
import { verifyUser } from "../user/userController/verifyUser";


export async function deleteAbout(req: Request, res: Response) {
    try {
        const { userId, aboutId } = req.params
        
        verifyUser(req, res, async() => {
            if (Number(aboutId)) {
                const about = await prisma.about.findUnique({
                    where: { id: Number(aboutId) }
                })
                if (about === null) {
                    return res.status(404).json({error: 'About does not exist.'})
                } else {
                    const deleted = await prisma.about.delete({
                        where: { id: Number(aboutId) }
                    })
                    return res.status(200).json({success: 'Deleted successfuly.'})
                }
            } else {
                return res.status(406).json({error: 'About id must be a number'})
            }
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}