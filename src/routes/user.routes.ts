import { Router } from "express";
import { UpdateUserController } from "../Controllers/UserControllers/UpdateUserController";
import { GetUserController } from "../Controllers/UserControllers/GetUserController";
import { UpdateUserImageController } from "../Controllers/UserControllers/UpdateUserImageController";
import { upload } from "../Config/multer";


const routes = Router()

routes.get(
    "/:user_id?",
    new GetUserController().handle
)

routes.put(
    "/update/:userId",
    new UpdateUserController().handle
)

routes.put(
    "/update-image/:user_id",
    upload.single("file"),
    new UpdateUserImageController().handle
)

export { routes }