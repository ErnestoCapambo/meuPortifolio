import createHttpError from "http-errors";
import { MainTitleRepository } from "../../repository";


export class GetMAinTitleService {
    async execute(): Promise<any> {
        const mainTitleRepo = await MainTitleRepository().findFirst()

        if (mainTitleRepo !== null) {
            return mainTitleRepo            
        } else {
            throw createHttpError(404, "Sem titulo cadastrado")
        }
    }
}