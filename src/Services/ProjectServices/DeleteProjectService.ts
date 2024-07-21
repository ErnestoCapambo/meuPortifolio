import createHttpError from "http-errors";
import { ProjectRepository } from "../../repository";


export class DeleteProjectService {
    async execute(project_id: string, user_id: string): Promise<void> {

        if (!(await ProjectRepository().findUnique({ where: { id: project_id } })))
            throw createHttpError(404, "Projeto não encontrado.")

        await ProjectRepository().delete({
            where: {
                id: project_id,
                user_id
            }
        })

        return
    }
}