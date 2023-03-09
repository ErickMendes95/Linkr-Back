import { Router } from "express";
import { getUserById, searchUser } from "../controllers/user.controller.js"

const userRouter = Router();

userRouter.get("/user/:id", getUserById);
userRouter.get("/user", searchUser);

export default userRouter;