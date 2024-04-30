import { createMainTitle } from "../mainTitle/createMaiTitle";
import { deleteMainTitle } from "../mainTitle/deleteMainTitle";
import { getMainTitle } from "../mainTitle/getMainTitle";
import { updateMainTitle } from "../mainTitle/updateMainTitle";
import router from "./UserRoutes";


router.post("/create-title/:userId?", createMainTitle)

router.put("/update-title/:userId?/:titleId?", updateMainTitle)

router.get("/get-title/:titleId?", getMainTitle)

router.delete("/delete-title/:userId?/:titleId?", deleteMainTitle)

export default router