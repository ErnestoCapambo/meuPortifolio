import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";


export async function getEspeciality(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { especialityId } = req.params
        if (!especialityId) {
            const allEspeciality = await prisma.especiality.findMany()
            return res.status(200).json(allEspeciality)
        }
        if (Number(especialityId)) {
            const especiality = await prisma.especiality.findUnique({
                where: { id: Number(especialityId) }
            })
            if (especiality !== null) {
                return res.status(200).json(especiality)
            } else {
                return res.status(404).json({error: 'Especiality does not exist.'})
            }
        } else {
            return res.status(406).json({error: 'Especiality id must be a number.'})
        }
    } catch (err: any) {
        return res.status(500).json(err)
    }
}