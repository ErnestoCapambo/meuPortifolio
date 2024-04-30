import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";
import fs from "fs";

export async function updateProject(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { projectId } = req.params
        if (!projectId) {
            return res.status(406).json({error: 'Project id is required!'})
        }
        const { description } = req.body
        const project = await prisma.project.findUnique({
            where: { id: Number(projectId) }
        })
        if (project === null) {
            return res.status(404).json({ error: 'Invalid project.'})
        } else {
            const filePath = String(project.file_path)
            const newproject = fs.rm(filePath, async() => {
                const updatedProject = await prisma.project.update({
                    where: { id: Number(projectId) },
                    data: { description, file_path: String(req.file?.path) }
                })
                return res.status(200).send()
            })
        }
    } catch (err:any) {
        return res.status(500).json(err)
    }
}