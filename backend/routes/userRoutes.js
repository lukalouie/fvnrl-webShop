import {protect, isAdmin} from "../middleware/authMiddleware.js"
import express from "express"
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUser, getUsers, deleteUser, getUserById, updateUserAdmin } from "../controllers/userController.js"

router.post("/login", authUser)
router.route("/profile").get(protect, getUserProfile).put(protect, updateUser)
router.route("/").post(registerUser).get(protect, isAdmin, getUsers)
router.route("/:id").delete(protect, isAdmin, deleteUser).get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUserAdmin)


export default router