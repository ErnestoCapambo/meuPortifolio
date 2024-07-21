import { Request, Response } from "express";
import { GetHabilityService } from "../../Services/HabilityServices/GetHabilityService";


export class GetHabilityController {
    async handle(req: Request, res: Response) {
        const { hability_id } = req.params

        const service = new GetHabilityService()

        const result = await service.execute(hability_id)

        return res.json(result)
    }
}