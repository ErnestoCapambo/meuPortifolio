import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";


export async function getAbout(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { aboutId } = req.params
        if (!aboutId) {
            const abouts = await prisma.about.findMany()
            return res.status(200).json(abouts)
        }
        if (Number(aboutId)) {
            const about = await prisma.about.findUnique({
                where: { id: Number(aboutId) }
            })
            if (about === null) {
                return res.status(404).json({error: 'About does not exist.'})
            } else {
                return res.status(200).json(about)
            }
        } else {
            return res.status(406).json({error: 'About id must be a number'})
        }
    } catch (err: any) {
        return res.status(500).json(err)
    }
}