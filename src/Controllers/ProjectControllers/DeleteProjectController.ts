import { Request, Response } from "express";
import { DeleteProjectService } from "../../Services/ProjectServices/DeleteProjectService";


export class DeleteProjectController {
    async handle(req: Request, res: Response) {
        const { project_id, user_id } = req.params

        const service = new DeleteProjectService()

        const result = await service.execute(project_id, user_id)

        return res.json(result)
    }
}