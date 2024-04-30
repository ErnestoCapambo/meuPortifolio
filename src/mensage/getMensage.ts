import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";


export async function getMensage(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { mensageId } = req.params
        if (!mensageId) {
            const mensage = await prisma.mensage.findMany()
            return res.status(200).json(mensage)
        }
        if (Number(mensageId)) {
            const mensage = await prisma.mensage.findUnique({
                where: { id: Number(mensageId) }
            })
            if (mensage === null) {
                return res.status(404).json({error: 'mensage does not exist!'})
            } else {
                return res.status(200).json(mensage)
            }
        } else {
            return res.status(406).json({error: 'Mensage id must be a number.'})
        }
    } catch (err: any) {
        return res.status(500).json(err)
    }
}