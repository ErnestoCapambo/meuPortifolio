import { Request, Response } from "express";
import { GetMessageService } from "../../Services/MessageServices/GetMessageService";


export class GetMessageController {
    async handle(req: Request, res: Response) {
        const service = new GetMessageService()

        const result = await service.execute()

        return res.json(result)
    }
}