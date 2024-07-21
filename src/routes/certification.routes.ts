import { Router } from "express";
import { upload } from "../Config/multer";
import { CreateCertificationController } from "../Controllers/CertificationController/CreateCertificationController";
import { UpdateCertificationController } from "../Controllers/CertificationController/UpdateCertificationController";
import { GetCertificationController } from "../Controllers/CertificationController/GetCertificationController";
import { DeleteCertificationController } from "../Controllers/CertificationController/DeleteCertificationController";


const routes = Router()

routes.post(
    "/create/:user_id",
    upload.single('file'),
    new CreateCertificationController().handle
)

routes.put(
    "/update/:certification_id",
    upload.single('file'),
    new UpdateCertificationController().handle
)

routes.get(
    "/:certification_id?",
    new GetCertificationController().handle
)

routes.delete(
    "/:certification_id/:user_id",
    new DeleteCertificationController().handle
)


export { routes }