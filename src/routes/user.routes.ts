import { Router } from "express";
import { UpdateUserController } from "../Controllers/UserControllers/UpdateUserController";
import { GetUserController } from "../Controllers/UserControllers/GetUserController";


const router = Router()

router.get(
    "/user/:user_id",
    new GetUserController().handle
)

router.put(
    "/update/:userId",
    new UpdateUserController().handle
)

export { router }