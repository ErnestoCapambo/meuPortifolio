import { maintitle } from "@prisma/client";
import { MainTitleRepository } from "../../repository";
import createHttpError from "http-errors";


type MainTitleTypeRequest = {
    user_id: string;
    main_title_id: string;
    dados: object
}

export class UpdateMainTitleService {
    async execute ({user_id, main_title_id, dados}: MainTitleTypeRequest): Promise<maintitle> {

        try {
            const mainTitleRepo = await MainTitleRepository().update({
                where: { id: main_title_id, user_id },
                data: dados
            })
    
            return mainTitleRepo
            
        } catch (err: any) {
            throw createHttpError(500, err)
        }

    }
}