import { Request, Response } from "express";
import { CreateProjectService } from "../../Services/ProjectServices/CreateProjectService";
import { getUploadedFileData } from "../../helpers/getUploadedFileData";


export class CreateProjectController {
    async handle(req: Request, res: Response) {
        const { user_id } = req.params

        const { title, description } = req.body

        const service = new CreateProjectService()

        const result = await service.execute({
            user_id,
            title,
            description,
            file_key: String(getUploadedFileData(req.file).key),
            file_url: String(getUploadedFileData(req.file).url)
        })

        return res.json(result)
    }
}

