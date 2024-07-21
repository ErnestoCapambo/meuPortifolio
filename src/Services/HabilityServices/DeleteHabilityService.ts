import createHttpError from "http-errors";
import { HabilityRepository } from "../../repository";


type HabilityRequestType = {
    hability_id: string;
    user_id: string;
}

export class DeleteHabilityService {
    async execute({ hability_id, user_id }: HabilityRequestType): Promise<void> {

        if (!(await HabilityRepository().findUnique({ where: { id: hability_id}}))) {
            throw createHttpError(404, "Habilidade não encontrada.")
        }

        await HabilityRepository().delete({
            where: { id: hability_id, user_id }
        })

        return
    }
}