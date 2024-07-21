import { Request, Response } from "express";
import { UpdateProjectService } from "../../Services/ProjectServices/UpdateProjectService";


export class UpdateProjectController {
    async handle(req: Request, res: Response) {
        const { project_id } = req.params

        const { title, description } = req.body

        const service = new UpdateProjectService()

        const result = await service.execute({
            project_id,
            title,
            description,
        })

        return res.json(result)
    }
}