import { Request, Response } from "express";
import { verifyUser } from "../user/userController/verifyUser";
import { prisma } from "../lib/Prisma";


export async function createEspeciality(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId } = req.params
        const { name, description } = req.body
        verifyUser(req, res, async () => {
            const especiality = await prisma.especiality.create({
                data: {
                    User_id: userId,
                    name,
                    description,
                    img_path: req.file?.path
                }
            })
            return res.status(201).send()
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}