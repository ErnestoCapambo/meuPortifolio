import { Router } from "express";
import { CreateHabilityController } from "../Controllers/HabilityControllers/CreateHabilityController";
import { upload } from "../Config/multer";
import { GetHabilityController } from "../Controllers/HabilityControllers/GetHabilityController";
import { UpdateHabilityController } from "../Controllers/HabilityControllers/UpdateHabilityController";
import { DeleteHabilityController } from "../Controllers/HabilityControllers/DeleteHabilityController";


const routes = Router()

routes.post(
    "/create/:user_id",
    upload.single('file'),
    new CreateHabilityController().handle
)

routes.put(
    "/update/:hability_id",
    upload.single('file'),
    new UpdateHabilityController().handle
)

routes.get(
    "/:hability_id?",
    new GetHabilityController().handle
)

routes.delete(
    "/delete/:hability_id/:user_id",
    new DeleteHabilityController().handle
)

export { routes }