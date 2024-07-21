import { Request, Response } from "express";
import { UpdateHabilityService } from "../../Services/HabilityServices/UpdateHabilityService";


export class UpdateHabilityController {
    async handle(req: Request, res: Response) {
        const { hability_id } = req.params

        const { name, description } = req.body

        const service = new UpdateHabilityService()

        const result = await service.execute({
            hability_id,
            name,
            description,
        })

        return res.json(result)
    }
}