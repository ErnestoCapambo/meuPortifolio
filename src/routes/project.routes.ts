import { Router } from "express";
import { CreateProjectController } from "../Controllers/ProjectControllers/CreateProjectController";
import { upload } from "../Config/multer";
import { UpdateProjectController } from "../Controllers/ProjectControllers/UpdateProjectController";
import { GetProjectController } from "../Controllers/ProjectControllers/GetProjectController";
import { DeleteProjectController } from "../Controllers/ProjectControllers/DeleteProjectController";

const routes = Router()

routes.post(
    "/create/:user_id",
    upload.single('file'),
    new CreateProjectController().handle
)

routes.get(
    "/:project_id?",
    new GetProjectController().handle
)

routes.put(
    "/update/:project_id",
    new UpdateProjectController().handle
)

routes.delete(
    "/delete/:project_id/:user_id",
    new DeleteProjectController().handle
)


export { routes }