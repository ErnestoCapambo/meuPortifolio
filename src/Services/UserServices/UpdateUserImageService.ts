import { UserRepository } from "../../repository";


type UpdateUserImageTypeRequest = {
    user_id: string;
    image_url: string;
    image_key: string;
}

export class UpdateUserImageService {
    async execute({ user_id, image_key, image_url }: UpdateUserImageTypeRequest) {
        
        const user = UserRepository()

        const updatedUser =  await user.update({
            where: { id: user_id },
            data: {
                image_key,
                image_url
            }
        })

        return updatedUser
    }
}