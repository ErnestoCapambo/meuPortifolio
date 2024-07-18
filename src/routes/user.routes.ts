import { Router } from "express";
import { UpdateUserController } from "../Controllers/UserControllers/UpdateUserController";


const router = Router()

router.put(
    "/update/:userId",
    new UpdateUserController().handle
)

export { router }