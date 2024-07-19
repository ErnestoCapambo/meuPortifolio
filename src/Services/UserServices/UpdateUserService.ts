import { user } from "@prisma/client";
import { UserRepository } from "../../repository";


type UpdateUserRequestType = {
    username?: string;
    email?: string;
    password?: string;
    contact?: string;
}

export class UpdateUserService {
    async execute({ username, email, password, contact } : UpdateUserRequestType): Promise<user> {
        
        const user = await UserRepository().update({
            where: { email },
            data: {
                username,
                email,
                password,
                contact,
            }
        })

        return user
    }
}