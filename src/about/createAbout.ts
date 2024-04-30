import { Request, Response } from "express";
import { verifyUser } from "../user/userController/verifyUser";
import { prisma } from "../lib/Prisma";

export async function createAbout(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId } = req.params
        const { paragraph1, paragraph2 } = req.body

        verifyUser(req, res, async() => {

            const newAbout = await prisma.about.create({
                data: {
                    paragraph1,
                    paragraph2,
                    User_id: userId
                }
            })
            return res.status(201).send()
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}