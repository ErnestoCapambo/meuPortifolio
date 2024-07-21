import createHttpError from "http-errors";
import { HabilityRepository, UserRepository } from "../../repository";
import { hability } from "@prisma/client";


type HabilityRequestType = {
    user_id: string;

    name: string;
    description?: string
    image_url?: string;
    image_key?: string
}

export class CreateHabilityService {
    async execute({ user_id, name, description, image_key, image_url }: HabilityRequestType): Promise<hability> {

        if (!(await UserRepository().findUnique({ where: { id: user_id }}))) {
            throw createHttpError(404, "Usuário não encontrado.")
        }

        const habilityRepo = HabilityRepository()

        const newHability = await habilityRepo.create({
            data: {
                user_id,
                name,
                description,
                image_url,
                image_key
            }
        })

        return newHability
    }
}