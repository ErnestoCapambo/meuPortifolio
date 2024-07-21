import { Request, Response } from "express";
import { CreateHabilityService } from "../../Services/HabilityServices/CreateHabilityService";
import { getUploadedFileData } from "../../helpers/getUploadedFileData";


export class CreateHabilityController {
    async handle(req: Request, res: Response) {
        const { user_id } = req.params

        const { name, description } = req.body

        const service = new CreateHabilityService()

        const result = await service.execute({
            user_id,
            name,
            description,
            image_key: String(getUploadedFileData(req.file).key),
            image_url: String(getUploadedFileData(req.file).url)
        })

        return res.json(result)
    }
}