import { Request, Response } from "express";
import { UpdateUserService } from "../../Services/UserServices/UpdateUserService";


export class UpdateUserController {
    async handle(req: Request, res: Response) {

        const { username, email, password, contact } = req.body

        const service = new UpdateUserService()

        const result = await service.execute({
            username,
            email,
            password,
            contact,
        })

        return res.json(result)
    }
}