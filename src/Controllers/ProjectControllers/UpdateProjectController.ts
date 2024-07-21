import { Request, Response } from "express";
import { UpdateProjectService } from "../../Services/ProjectServices/UpdateProjectService";
import { getUploadedFileData } from "../../helpers/getUploadedFileData";


export class UpdateProjectController {
    async handle(req: Request, res: Response) {
        const { project_id } = req.params

        const { title, description } = req.body

        const service = new UpdateProjectService()

        const result = await service.execute({
            project_id,
            title,
            description,
            file_key: String(getUploadedFileData(req.file).key),
            file_url: String(getUploadedFileData(req.file).url)
        })

        return res.json(result)
    }
}