import { Request, Response } from "express";
import { DeleteHabilityService } from "../../Services/HabilityServices/DeleteHabilityService";


export class DeleteHabilityController {
    async handle(req: Request, res: Response) {
        const { hability_id, user_id } = req.params

        const service = new DeleteHabilityService()

        const result = await service.execute({ hability_id, user_id })

        return res.json(result)
    }
}