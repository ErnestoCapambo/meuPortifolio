import { MainTitleRepository } from "../../repository";


type MainTitleTypeRequest = {
    title: string;
    description: string;
    user_id: string;
}

export class CreateMAinTitleService {
    async execute({ title, description, user_id }: MainTitleTypeRequest): Promise<void> {
        
        const mainTitleRepo = await MainTitleRepository().create({
            data: {
                title,
                description,
                user_id
            }
        })

        return
    }
}