import { Request, Response } from "express";
import { CreateCertificationService } from "../../Services/CertificationServices/CreateCertificationService";
import { getUploadedFileData } from "../../helpers/getUploadedFileData";


export class CreateCertificationController {
    async handle(req: Request, res: Response) {
        const { user_id } = req.params

        const { name, link } = req.body

        const service = new CreateCertificationService()

        const result = await service.execute({
            user_id,
            name,
            link,
            file_url: String(getUploadedFileData(req.file).url),
            file_key: String(getUploadedFileData(req.file).key)
        })

        return res.json(result)
    }
}