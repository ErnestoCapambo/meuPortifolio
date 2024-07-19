import { UserRepository } from "../../repository";

type UserRequestType = {
    username: string;
    email: string;
    password: string;
    contact: string;
    image_url?: string;
    image_key?: string;
}

export class CreateUserService {
    async execute({ username, email, password, contact, image_url, image_key }: UserRequestType) : Promise<void> {
        
        const userRepo = UserRepository()

        await userRepo.create({
            data: {
                username,
                email,
                password,
                contact,
                image_url,
                image_key
            }
        })

        return
    }
}