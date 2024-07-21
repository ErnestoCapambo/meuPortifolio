import createHttpError from "http-errors";
import { ProjectRepository } from "../../repository";
import { project } from "@prisma/client";


type UpdateProjectRequestType = {
    project_id: string;

    title?: string;
    description?: string;
    file_url?: string;
    file_key?: string;
}

export class UpdateProjectService {
    async execute({ project_id, title, description, file_url, file_key }: UpdateProjectRequestType): Promise<project> {

        if (!(await ProjectRepository().findUnique({ where: { id: project_id } })))
            throw createHttpError(404, "Projeto não encontrado.")

        const updatedProject = await ProjectRepository().update({
            where: { id: project_id },
            data: {
                title,
                description,
                file_url,
                file_key,
            }

        })

        return updatedProject
    }
}