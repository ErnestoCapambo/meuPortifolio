import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";
import fs from "fs";

export async function deleteProject(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { projectId } = req.params

        const project = await prisma.project.findUnique({
            where: { id: Number(projectId) }
        })
        if (project === null) {
            return res.status(404).json({ error: 'Invalid project.'})
        } else {
            const filePath = String(project.file_path)
            const delProject = fs.rm(filePath, async() => {
                const deleted = await prisma.project.delete({
                    where: { id: Number(projectId) },
                })
                return res.status(200).send()
            })
        }
    } catch (err:any) {
        return res.status(500).json(err)
    }
}