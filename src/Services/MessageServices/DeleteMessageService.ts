import createHttpError from "http-errors";
import { MessageRepository } from "../../repository";


export class DeleteMessageService {
    async execute(message_id: string): Promise<void> {
        
        if (!(await MessageRepository().findUnique({ where: { id: message_id}}))) {
            throw createHttpError(404, "Mensagem não encontrada.")
        }

        await MessageRepository().delete({
            where: { id: message_id }
        })

        return
    }
}