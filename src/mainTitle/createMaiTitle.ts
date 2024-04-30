import { Request, Response } from "express";
import { verifyUser } from "../user/userController/verifyUser";
import { prisma } from "../lib/Prisma";

export async function createMainTitle(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        
        const { userId } = req.params
        const { title, description } = req.body
        verifyUser(req, res, async() => {
            await prisma.maintitle.create({
                data: {
                    title: title,
                    description: description,
                    User_id: userId
                }
            })
            return res.status(201).send()
        })

    } catch (err: any) {
        return res.status(500).json(err)
    }
}