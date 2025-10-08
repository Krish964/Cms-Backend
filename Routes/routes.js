import { Router } from "express";
import { helloWorld, registerUser } from "../Controllers/register.controller.js";
import { loginUser, logoutUser } from "../Controllers/login.controller.js";
import { createArticle, deleteArticles, getArticles, getArticlesbyId, updateArticles } from "../Controllers/CRUD.controller.js";
import { authenticateUser } from "../Middlewares/Auth.middlewares.js";
import {upload} from "../Middlewares/multer.middleware.js"
const router = Router();

router.route("/").get(helloWorld)

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/createArticle").post(upload.single('image'), createArticle)
router.route("/getArticles").get(authenticateUser , getArticles)
router.route("/getArticlesbyId/:id").get(authenticateUser , getArticlesbyId)
router.route("/getArticles/:id").put(authenticateUser , updateArticles)
router.route("/getArticles/:id").delete(authenticateUser ,deleteArticles)

export default router;