import createHttpError from "http-errors";
import { ProjectRepository } from "../../repository";
import { project } from "@prisma/client";


type UpdateProjectRequestType = {
    project_id: string;

    title?: string;
    description?: string;
}

export class UpdateProjectService {
    async execute({ project_id, title, description }: UpdateProjectRequestType): Promise<project> {

        if (!(await ProjectRepository().findUnique({ where: { id: project_id } })))
            throw createHttpError(404, "Projeto não encontrado.")

        const updatedProject = await ProjectRepository().update({
            where: { id: project_id },
            data: {
                title,
                description
            }

        })

        return updatedProject
    }
}