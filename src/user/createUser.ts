import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";

export async function createUser(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const verifyUser = await prisma.user.count()
        if (verifyUser >= 1) {
            return res.status(406).json({error: 'Already exist a user in database.'})
        }
        const { username, email, password, contact  } = req.body
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password,
                contact,
                image_path: String(req.file?.path)
            }
        })
        return res.status(201).send()
    } catch (err:any) {
        return res.status(500).json(err)
    }
}