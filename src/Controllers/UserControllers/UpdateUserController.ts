import { Request, Response } from "express";
import { UpdateUserService } from "../../Services/UserServices/UpdateUserService";


export class UpdateUserController {
    async handle(req: Request, res: Response) {

        const { userId } = req.params

        const service = new UpdateUserService()

        const result = await service.execute(userId)

        return res.json(result)
    }
}