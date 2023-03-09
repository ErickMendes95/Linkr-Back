import { Router } from 'express'
import { getUserPosts } from '../controllers/userPage.controller'

const userPageRouter = Router()

userPageRouter.get("/users/:id",getUserPosts)

export default userPageRouter;