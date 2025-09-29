import { Router } from "express";
import { registerUser } from "../Controllers/register.controller.js";
import { loginUser, logoutUser } from "../Controllers/login.controller.js";
const router = Router();

router.route()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("logout").post(logoutUser)
export default router;