import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";

export async function createProject(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId } = req.params
        const { description } = req.body
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })
        if (user === null) {
            return res.status(401).json({ error: 'Unauthorized.'})
        } else {
            const newproject = await prisma.project.create({
                data: {
                    description,
                    User_id: String(user.id),
                    file_path: req.file?.path
                }
            })
            return res.status(201).send()
        }
    } catch (err:any) {
        return res.status(500).json(err)
    }
}