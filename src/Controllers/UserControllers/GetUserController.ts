import { Request, Response } from "express";
import { GetUserService } from "../../Services/UserServices/GetUserService";

export class GetUserController {
    async handle(req: Request, res: Response) {

        const { user_id } = req.params

        const service = new GetUserService()

        const result = await service.execute({ user_id })

        return res.json(result)
    }
}