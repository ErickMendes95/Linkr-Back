import { getPostsFromHashtag } from "../repositories/getPostsFromHashtag";
import { getTrends } from "../repositories/getTrends"

export async function getHashtagsPosts(req, res) {

    const hashtag = req.params.hashtag;

    try {
      const hashtagId = await db.query("SELECT id FROM hashtags where name= $1",[hashtag])

      const posts = await getPostsFromHashtag(hashtagId.rows[0].id);

      const arrayTrends = await getTrends()

      if(arrayTrends.length === 0){
        return res.sendStatus(404)
      }
  
      res.send(posts, arrayTrends)
  
    } catch (error) {
      res.status(500).send(error.message)
    }
  }