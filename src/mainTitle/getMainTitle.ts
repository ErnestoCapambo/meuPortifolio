import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";

export async function getMainTitle(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { titleId } = req.params
        if (!titleId) {
           const mainTitle = await prisma.maintitle.findMany()
           return res.status(200).json(mainTitle)
        }
        if (!Number(titleId)) {
            return res.status(406).json({error: 'Title id must be a number.'})
        }
        const mainTitle = await prisma.maintitle.findUnique({
            where: { id: Number(titleId) }
        })
        if (mainTitle === null) {
            return res.status(404).json({error: 'Main title does not exist!'})
        }
        return res.status(200).json(mainTitle)
    } catch (err: any) {
        return res.status(500).json(err)
    }
}