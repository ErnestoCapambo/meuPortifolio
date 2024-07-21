import { Router } from "express"

import { routes as userRoutes } from "./user.routes.js"
import { routes as mainTitleRoutes } from "./maintitle.routes.js";
import { routes as projectRoutes } from "./project.routes.js";

const routes = Router();

routes.use("/user", userRoutes)

routes.use("/main_title", mainTitleRoutes)

routes.use("/projects", projectRoutes)


export { routes }