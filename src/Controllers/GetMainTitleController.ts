import { Request, Response } from "express";
import { GetMAinTitleService } from "../Services/MainTitleServices/GetMAinTitleService";


export class GetMainTitleController {
    async handle(req: Request, res: Response) {
        
        const service = new GetMAinTitleService()

        const result = await service.execute()

        return res.json(result)
    }
}