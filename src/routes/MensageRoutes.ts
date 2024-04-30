import { createMensage } from "../mensage/createMensage";
import { deleteMensage } from "../mensage/deleteMensage";
import { getMensage } from "../mensage/getMensage";
import router from "./UserRoutes";

router.post("/create-mensage", createMensage)

router.get("/get-mensage/:mensageId?", getMensage)

router.delete("/delete-mensage/:userId?/:mensageId?", deleteMensage)

export default router