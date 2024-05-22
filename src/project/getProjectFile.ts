import { Request, Response } from 'express'
import { prisma } from '../lib/Prisma'

export async function getProjectFile(req: Request, res: Response) {
    try {
        const { projectId } = req.params
        if (Number(projectId)) {
            const projectFile = await prisma.project.findUnique({
                where: { id: Number(projectId) }
            })
            if (projectFile !== null) {
                return res.status(200).sendFile(String(projectFile.file_path))
            } else {
                return res.status(404).json({ error: 'Project does not exist!' })
            }
            
        } else {
            return res.status(406).json({ error: 'Project id is required, and must be a number.' })
        }
    } catch (err: any) {
        return res.status(500).json(err)
    }
}