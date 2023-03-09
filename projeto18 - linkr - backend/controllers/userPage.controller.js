import { getPostsFromUserId } from "../repositories/getPostsFromUserId";
import { getTrends } from "../repositories/getTrends.js"

export async function getUserPosts(req, res) {

    const id = req.params.id;

    try {

      const posts = await getPostsFromUserId(id);

      const arrayTrends = await getTrends()

      if(arrayTrends.length === 0){
        return res.sendStatus(404)
      }
  
      res.send(posts, arrayTrends)
  
    } catch (error) {
      res.status(500).send(error.message)
    }
  }