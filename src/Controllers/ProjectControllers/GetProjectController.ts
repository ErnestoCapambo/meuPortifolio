import { Request, Response } from "express";
import { GetProjectService } from "../../Services/ProjectServices/GetProjectService";


export class GetProjectController {
    async handle(req: Request, res: Response) {
        const { project_id } = req.params

        const service = new GetProjectService()

        const result = await service.execute(project_id)

        return res.json(result)
    }
}