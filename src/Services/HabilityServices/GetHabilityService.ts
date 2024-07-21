import { HabilityRepository } from "../../repository";


export class GetHabilityService {
    async execute(hability_id?: string) {

        if (!hability_id) {
            const habilities = await HabilityRepository().findMany()

            return habilities
        }

        const hability = await HabilityRepository().findUnique({
            where: {
                id: hability_id
            }
        })

        return hability
    }
}