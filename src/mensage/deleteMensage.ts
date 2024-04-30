import { Request, Response } from "express";
import { verifyUser } from "../user/userController/verifyUser";
import { prisma } from "../lib/Prisma";


export async function deleteMensage(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { userId, mensageId } = req.params
        if (userId && mensageId) {
            verifyUser(req, res, async() => {
                const verifyMensage = await prisma.mensage.findUnique({
                    where: { id: Number(mensageId) }
                })
                if (verifyMensage === null) {
                    return res.status(404).json({error: 'This mensage does not exist!'})
                } else {
                    await prisma.mensage.delete({
                        where: { id: Number(mensageId) }
                    })
                    return res.status(200).json({success: 'Deleted successfuly!'})
                }
            })
        } else {
            return res.status(406).json({error: 'User id and mensage id are required!'})
        }
    } catch (err: any) {
        return res.status(500).json(err)
    }
}