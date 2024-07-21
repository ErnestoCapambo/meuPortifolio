import { Request, Response } from "express";
import { UpdateMainTitleService } from "../../Services/MainTitleServices/UpdateMainTitleService";


export class UpdateMainTitleController {
    async handle(req: Request, res: Response) {
        
        const { user_id, main_title_id } = req.params

        const data = req.body

        const service = new UpdateMainTitleService()

        const result = await service.execute({ user_id, main_title_id, dados: data })

        return res.json(result)
    }
}