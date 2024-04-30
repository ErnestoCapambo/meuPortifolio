import { Request, Response } from "express";
import { prisma } from "../lib/Prisma";

export async function getProject(req: Request, res: Response) {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const { projectId } = req.params
        if (!projectId) {
            const projects = await prisma.project.findMany()
            return res.status(200).json(projects)
        }
        if (!Number(projectId)) {
            return res.status(406).json({error: 'Project id must be anumber.'})
        } else {
            const project = await prisma.project.findUnique({
                where: { id: Number(projectId)}
            })
            if (project === null) {
                return res.status(404).json({error: 'Project not found.'})
            }
            return res.status(200).json(project)
        }
    } catch (err: any) {
        return res.status(500).json(err)
    }
}