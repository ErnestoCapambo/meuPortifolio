import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";

export async function getEspecialitytImg(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { especialityId } = req.params
        if (!especialityId) {
            return res.status(406).json({error: 'Especiality id is required!'})
        }
        const especiality = await prisma.especiality.findUnique({
            where: { id: Number(especialityId) }
        })

        if (!especiality?.img_path) {
            return res.status(404).json({error: "Image was not found."})
        }

        if (especiality !== null) {
            return res.status(200).sendFile(String(especiality?.img_path))
        } else {
            return res.status(404).json({error: 'Especiality image does not exist.'})
        }
    } catch (err:any) {
        return res.status(500).json(err)
    }
}