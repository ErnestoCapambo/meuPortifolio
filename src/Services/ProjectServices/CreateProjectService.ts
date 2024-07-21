import createHttpError from "http-errors";
import { ProjectRepository, UserRepository } from "../../repository";
import { project } from "@prisma/client";


type ProjectRequestType = {
    user_id: string;

    title: string;
    description?: string;
    file_url: string;
    file_key: string;
}

export class CreateProjectService {
    async execute({ user_id, title, description, file_url, file_key }: ProjectRequestType): Promise<project> {

        const projectRepo = ProjectRepository()
        
        if (!(await UserRepository().findUnique({ where:{ id: user_id} })))
            throw createHttpError(400, "Usuario não existe!")

        const newProject = await projectRepo.create({
            data: {
                user_id,
                title,
                description,
                file_key,
                file_url
            }
        })

        return newProject
    }
}