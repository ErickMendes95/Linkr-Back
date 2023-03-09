import { Router } from 'express'
import { getUserPosts } from '../controllers/userPage.controller.js'

const userPageRouter = Router()

userPageRouter.get("/users/:id",getUserPosts)

export default userPageRouter;