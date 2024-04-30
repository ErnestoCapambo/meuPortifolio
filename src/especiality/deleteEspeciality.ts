import { Request, Response } from "express";
import { verifyUser } from "../user/userController/verifyUser";
import fs from "fs"
import { prisma } from "../lib/Prisma";

export async function deleteEspeciality(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId, especialityId } = req.params
        verifyUser(req, res, async() => {
            if (userId && especialityId) {
                const especiality = await prisma.especiality.findUnique({
                    where: { id: Number(especialityId), User_id: userId}
                })
                if (especiality === null) {
                    return res.status(404).json({error: 'Especiality does not exist.'})
                } else {
                    const imgPath = String(especiality.img_path)
                    const deleted = fs.rm(imgPath, async() => {
                        await prisma.especiality.delete({
                            where: { id: Number(especialityId)}
                        })
                        return res.status(200).json({success: 'Deleted successfuly!'})
                    })
                }
            } else {
                return res.status(406).json({error: 'User id and especiality id must be a number.'})
            }
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}