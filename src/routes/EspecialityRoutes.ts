import { createEspeciality } from "../especiality/createEspeciality";
import { deleteEspeciality } from "../especiality/deleteEspeciality";
import { getEspeciality } from "../especiality/getEspeciality";
import { getEspecialitytImg } from "../especiality/getEspecialityImg";
import { updateEspeciality } from "../especiality/updateEspeciality";
import upload from "../middlewares/FileUpload";
import router from "./UserRoutes";


router.post("/create-especiality/:userId?", upload.single('file'), createEspeciality)

router.put("/update-especiality/:userId?/:especialityId?", upload.single('file'), updateEspeciality)

router.get("/get-especiality/:especialityId?", getEspeciality)

router.get("/get-especiality-img/:especialityId?", getEspecialitytImg)

router.delete("/delete-especiality/:userId?/:especialityId?", deleteEspeciality)

export default router