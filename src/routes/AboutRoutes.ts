import { createAbout } from "../about/createAbout"
import { deleteAbout } from "../about/deleteAbout"
import { getAbout } from "../about/getAbout"
import { updateAbout } from "../about/updateAbout"
import router from "./UserRoutes"


router.post("/create-about/:userId?", createAbout)

router.put("/update-about/:userId?/:aboutId?", updateAbout)

router.get("/get-about/:aboutId?", getAbout)

router.delete("/delete-about/:userId?/:aboutId?", deleteAbout)

export default router