import { Router } from "express";
import upload from "../middlewares/FileUpload";
import { getUser } from "../user/getUser";
import { getUserImage } from "../user/getUserImage";
import { createUser } from "../user/createUser";
import { updateUser } from "../user/updateUser";
import { deleteUser } from "../user/deleteUser";

const router = Router()

router.get("/get-user/:userId?", getUser)

router.get("/get-image/:userId?", getUserImage)

router.post("/create-user", upload.single('file'), createUser)

router.put("/update-user/:userId?", upload.single('file'), updateUser)

router.delete("/delete-user/:userId?", deleteUser)

export default router
