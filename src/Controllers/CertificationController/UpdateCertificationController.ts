import { Request, Response } from "express";
import { UpdateCertificationService } from "../../Services/CertificationServices/UpdateCertificationService";
import { getUploadedFileData } from "../../helpers/getUploadedFileData";


export class UpdateCertificationController {
    async handle(req: Request, res: Response) {
        const { certification_id } =req.params
        const { name, link } = req.body

        const service = new UpdateCertificationService()

        const result = await service.execute({
            certification_id,
            name,
            link,
            file_key: String(getUploadedFileData(req.file).key),
            file_url: String(getUploadedFileData(req.file).url)
        })

        return res.json(result)
    }
}