import { Router } from "express";
import { postSignIn } from "../controllers/signIn.controller.js";
import { signInValidation } from "../middleware/signIn.middleware.js";

const signInRouter = Router()

signInRouter.post("/sign-in", signInValidation, postSignIn)
signInRouter.get ("/users", )
export default signInRouter