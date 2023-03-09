import { Router } from "express";
import { getUserById, searchUser } from "../controllers/user.controller.js";
import { authValidation } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/user/:id", getUserById);
userRouter.get("/user", authValidation, searchUser);

export default userRouter;