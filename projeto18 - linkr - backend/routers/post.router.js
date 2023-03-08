import { Router } from 'express'
import { validateSchema } from '../middleware/validateSchema.middleware'
import { postSchema } from '../models/post.schema'




const postRouter = Router()

postRouter.post("/home", validateSchema(postSchema))
// postRouter.get("/home",getPosts)


export default postRouter  