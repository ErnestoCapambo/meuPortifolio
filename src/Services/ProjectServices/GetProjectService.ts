import { ProjectRepository } from "../../repository"


export class GetProjectService {
    async execute(project_id?: string): Promise<any> {

        const projectRepo = ProjectRepository()

        if (!project_id) {
            const allProjects = await projectRepo.findMany()

            return allProjects
        }

        const project = await projectRepo.findUnique({
            where: { id: project_id }
        })
        if (!project)
            return {}

        return project
    }
}