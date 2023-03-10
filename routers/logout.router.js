import { Router } from "express";
import { deleteToken } from "../controllers/logout.controller.js";

const logoutRouter = Router()

logoutRouter.delete("/delete", deleteToken)

export default logoutRouter