import { message } from "@prisma/client";
import { MessageRepository } from "../../repository";
import createHttpError from "http-errors";


type MessageRequestType = {
    costumer_name: string;
    costumer_email: string;
    costumer_contact: string;
    description: string;
}

export class CreateMessageService {
    async execute({ costumer_name, costumer_email, costumer_contact, description }: MessageRequestType): Promise<message> {

        const messageRepo = MessageRepository()

        if((await messageRepo.findUnique({where: {costumer_email}}))) {
            throw createHttpError(406, "Já existe um usuário com este email.")
        }

        const newMessage = await messageRepo.create({
            data: {
                costumer_name,
                costumer_email,
                costumer_contact,
                description
            }
        })

        return newMessage
    }
}