import createHttpError from "http-errors";
import { UserRepository } from "../../repository";


type GetUserTypeRequest = {
    user_id?: string;
}

export class GetUserService {
    async execute({ user_id }: GetUserTypeRequest): Promise<any> {

        const userRepo = UserRepository()

        if (user_id) {
            const _user = await userRepo.findUnique({
                where: { id: user_id }
            })
            
            if (_user == null) {
                throw createHttpError(404, "Usuário não encontrado.")
            }

            return _user
        }
        const _user = await userRepo.findMany()

        return _user
    }
}