import { message } from "@prisma/client";
import { MessageRepository } from "../../repository";


export class GetMessageService {
    async execute(): Promise<message[]> {

        const allMessages = await MessageRepository().findMany({
            orderBy: {
                created_at: "desc"
            }
        })

        return allMessages
    }
}