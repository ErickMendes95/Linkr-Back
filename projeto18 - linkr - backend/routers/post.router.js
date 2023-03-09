import { Router } from 'express'
import { createPost, getTimeline } from '../controllers/post.controller.js'
import { authValidation } from '../middleware/auth.middleware.js'
import { validateSchema } from '../middleware/validateSchema.middleware.js'
import { postSchema } from '../models/post.schema.js'


const postRouter = Router()

postRouter.post("/home", validateSchema(postSchema),authValidation, createPost)
postRouter.get("/home",getTimeline)


export default postRouter  