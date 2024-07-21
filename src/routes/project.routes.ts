import { Router } from "express";
import { CreateProjectController } from "../Controllers/ProjectControllers/CreateProjectController";
import { upload } from "../Config/multer";

const routes = Router()

routes.post(
    "/create/:user_id",
    upload.single('file'),
    new CreateProjectController().handle
)

export { routes }