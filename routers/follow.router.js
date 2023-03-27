import { Router } from 'express'
import { getFollowStatus,FollowSwitch, UnfollowSwitch } from '../controllers/follow.controller.js'
import { authValidation } from '../middleware/auth.middleware.js';

const followRouter = Router()

followRouter.get("/user/:id/follow",getFollowStatus);
followRouter.post("/user/:id/follow",authValidation,FollowSwitch);
followRouter.delete("/user/:id/follow",authValidation,UnfollowSwitch);


export default followRouter;