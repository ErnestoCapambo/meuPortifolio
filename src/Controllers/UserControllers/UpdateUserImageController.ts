import { Request, Response } from "express";
import { UpdateUserImageService } from "../../Services/UserServices/UpdateUserImageService";
import { getUploadedFileData } from "../../helpers/getUploadedFileData";


export class UpdateUserImageController {
    async handle(req: Request, res: Response) {

        const { user_id } = req.params

        const service = new UpdateUserImageService()

        const result = await service.execute({
            user_id,
            image_key: String(getUploadedFileData(req.file).key),
            image_url: String(getUploadedFileData(req.file).url)
        })

        return res.json(result)
    }
}