import createHttpError from "http-errors";
import { CertificationRepository } from "../../repository";


export class DeleteCertificationService {
    async execute(certification_id: string, user_id: string): Promise<void> {

        if(!certification_id || !user_id) {
            throw createHttpError(400, "Id is required!")
        }

        await CertificationRepository().delete({
            where: { id: certification_id, user_id }
        })

        return
    }
}