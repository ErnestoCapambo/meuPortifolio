import { Request, Response } from "express";
import { CreateMessageService } from "../../Services/MessageServices/CreateMessageService";


export class CreateMessageController {
    async handle(req: Request, res: Response) {
        const dados = req.body

        const service = new CreateMessageService()

        const result = await service.execute(dados)

        return res.json(result)
    }
}