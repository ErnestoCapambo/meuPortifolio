import createHttpError from "http-errors";
import { CertificationRepository } from "../../repository";
import { certifications } from "@prisma/client";


type CertificationRequestType = {
    certification_id: string;

    name?: string;
    link?: string;
    file_url?: string;
    file_key?: string;
}

export class UpdateCertificationService {
    async execute({ certification_id, name, link, file_url, file_key }: CertificationRequestType): Promise<certifications> {

        if (!(await CertificationRepository().findUnique({where: {id: certification_id}}))) {
            throw createHttpError(404, "Certificação não encontrada.")
        }

        const certificationRepo = CertificationRepository()

        const updatedCertification = await certificationRepo.update({
            where: { id: certification_id },
            data: {
                name,
                link,
                file_url,
                file_key
            }
        })

        return updatedCertification
    }
}
