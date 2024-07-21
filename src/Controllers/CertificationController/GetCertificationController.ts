import { Request, Response } from "express";
import { GetCertificationService } from "../../Services/CertificationServices/GetCertificationService";


export class GetCertificationController {
    async handle(req: Request, res: Response) {
        const { certification_id } = req.params

        const service = new GetCertificationService()

        const result = await service.execute(certification_id)

        return res.json(result)
    }
}