import { Router } from "express";
import { postSignUp } from "../controllers/signUp.controller.js";
import { postSignUpValidation } from "../middleware/signUp.middleware.js";

const signUpRouter = Router()

signUpRouter.post("/sign-up", postSignUpValidation, postSignUp)

export default signUpRouter