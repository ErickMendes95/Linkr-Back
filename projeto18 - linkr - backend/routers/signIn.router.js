import { Router } from "express";
import { postSignIn } from "../controllers/signIn.controller.js";
import { signInValidation } from "../middleware/signUp.middleware.js";

const signInRouter = Router()

signInRouter.post("/sign-up", signInValidation, postSignIn)

export default signInRouter