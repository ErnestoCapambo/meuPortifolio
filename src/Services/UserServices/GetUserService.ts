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
                where: { id: user_id },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    contact: true,
                    image_url: true,
                }
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