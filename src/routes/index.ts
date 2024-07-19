import { Router } from "express"
import { router as userRoutes } from "./user.routes"

const routes = Router()


routes.use("/user", userRoutes)

export { routes }