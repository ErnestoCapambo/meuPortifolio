import { Request, Response } from "express";
import { DeleteMessageService } from "../../Services/MessageServices/DeleteMessageService";


export class DeleteMessageController {
    async handle(req: Request, res: Response) {
        const { message_id } = req.params

        const service = new DeleteMessageService()

        const result = await service.execute(message_id)

        return res.json(result)
    }
}