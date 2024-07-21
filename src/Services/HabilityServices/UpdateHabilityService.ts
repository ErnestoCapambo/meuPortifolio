import createHttpError from "http-errors";
import { HabilityRepository } from "../../repository";
import { hability } from "@prisma/client";


type HabilityRequestType = {
    hability_id: string;
    name?: string;
    description?: string;
    image_url?: string;
    image_key?: string
}

export class UpdateHabilityService {
    async execute({ hability_id, name, description, image_url, image_key }: HabilityRequestType): Promise<hability> {

        if (!(await HabilityRepository().findUnique({ where: { id: hability_id}}))) {
            throw createHttpError(404, "Habilidade não encontrada.")
        }

        const updatedHability = await HabilityRepository().update({
            where: { id: hability_id },
            data: {
                name,
                description,
                image_url,
                image_key
            }
        })

        return updatedHability
    }
}