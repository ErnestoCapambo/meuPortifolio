import { Router } from "express";
import { CreateMessageController } from "../Controllers/MessageControllers/CreateMessageController";
import { GetMessageController } from "../Controllers/MessageControllers/GetMessageController";
import { DeleteMessageController } from "../Controllers/MessageControllers/DeleteMessageController";


const routes = Router()

routes.post(
    "/create",
    new CreateMessageController().handle
)

routes.get(
    "/",
    new GetMessageController().handle
)

routes.delete(
    "/delete/:message_id",
    new DeleteMessageController().handle
)


export { routes }