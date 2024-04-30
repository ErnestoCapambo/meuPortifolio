import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";
import fs from "fs";
import { verifyUser } from "./userController/verifyUser";

export async function updateUser(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId } = req.params
        const { username, email, password, contact  } = req.body
        
        verifyUser(req, res, async() => {
            const user = await prisma.user.findUnique({
                where: { id: userId }
            })
            if (user !== null) {
                const filePath = String(user.image_path)
    
                const updateUser = fs.rm(filePath, async() => {
                    await prisma.user.update({
                        where: { id: userId},
                        data: {
                            username,
                            email,
                            password,
                            contact,
                            image_path: String(req.file?.path)
                        }
                    })
                    return res.status(200).send()
                })                
            }
        })
    } catch (err: any) {
        return res.status(500).json(err)
    }
}