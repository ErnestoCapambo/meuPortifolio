import createHttpError from "http-errors";
import { CertificationRepository, UserRepository } from "../../repository";
import { certifications } from "@prisma/client";


type CertificationRequestType = {
    user_id: string;

    name: string;
    link?: string;
    file_url?: string;
    file_key?: string;
}

export class CreateCertificationService {
    async execute({ user_id, name, link, file_url, file_key }: CertificationRequestType): Promise<certifications> {

        if (!(await UserRepository().findUnique({where: {id: user_id}}))) {
            throw createHttpError(404, "Usuário não encontrado.")
        }

        const certificationRepo = CertificationRepository()

        const newCertification = await certificationRepo.create({
            data: {
                user_id,
                name,
                link,
                file_url,
                file_key
            }
        })

        return newCertification
    }
}