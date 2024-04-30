import { Request, Response } from "express";
import fs from "fs"
import { verifyUser } from "../user/userController/verifyUser";
import { prisma } from "../lib/Prisma";


export async function updateEspeciality(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId, especialityId } = req.params
        const { name, description } = req.body
        if (userId && especialityId) {
            verifyUser(req, res, async() => {
                const especiality = await prisma.especiality.findUnique({
                    where: { id: Number(especialityId) }
                })
                if (especiality !== null) {
                    const filePath = String(especiality.img_path)
                    const updated = fs.rm(filePath, async () => {
                        await prisma.especiality.update({
                            where: { id: Number(especialityId) },
                            data: { name, description, img_path: req.file?.path }
                        })
                        return res.status(200).json({success: 'Updated successfuly!'})
                    })
                } else {
                    return res.status(404).json({error: 'Especiality does not exist!'})
                }
            })
        } else {
            return res.status(406).json({error: 'User id and especiality are required!'})
        }
    } catch (err:any) {
        return res.status(500).json(err)
    }
}