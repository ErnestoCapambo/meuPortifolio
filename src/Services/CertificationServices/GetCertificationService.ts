import { CertificationRepository } from "../../repository";


export class GetCertificationService {
    async execute(certification_id?: string): Promise<any> {

        if(!certification_id) {
            const allCertifications = await CertificationRepository().findMany()

            return allCertifications
        }

        const certification = await CertificationRepository().findUnique({where: { id: certification_id }})

        if (certification == null) {
            return {}
        } else {
            return certification
        }
    }
}