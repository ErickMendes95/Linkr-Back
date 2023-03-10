import { Router } from "express";
import { getTrends } from "../controllers/trending.controller.js";

const trendRouter = Router()

trendRouter.get("/trending", getTrends)

export default trendRouter