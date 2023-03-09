import { Router } from 'express'
import { getHashtagsPosts } from '../controllers/hashtagPage.controller'

const hashtagRouter = Router()

hashtagRouter.get("/hashtag/:hashtag",getHashtagsPosts)

export default hashtagRouter;