import upload from "../middlewares/FileUpload";
import { createProject } from "../project/createProject";
import { deleteProject } from "../project/deleteProject";
import { getProject } from "../project/getProject";
import { updateProject } from "../project/updateProject";
import router from "./UserRoutes";

router.post("/create-project/:userId?", upload.single('file'), createProject)

router.get("/get-project/:projectId?", getProject)

router.put("/update-project/:projectId?", upload.single('file'), updateProject)

router.delete("/delete-project/:projectId?", deleteProject)

export default router