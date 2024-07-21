import { Router } from "express";
import { GetMainTitleController } from "../Controllers/GetMainTitleController";
import { UpdateMainTitleController } from "../Controllers/MainTitleControllers/UpdateMainTitleController";


const routes = Router()


routes.get(
    "/",
    new GetMainTitleController().handle
)

routes.put(
    "/update/:user_id/:main_title_id",
    new UpdateMainTitleController().handle
)

export { routes }