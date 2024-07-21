import { Request, Response } from "express";
import { DeleteCertificationService } from "../../Services/CertificationServices/DeleteCertificationService";


export class DeleteCertificationController {
    async handle(req: Request, res: Response) {
        const { certification_id, user_id } = req.params

        const service = new DeleteCertificationService()

        const result = await service.execute(certification_id, user_id)

        return res.json(result)
    }
}