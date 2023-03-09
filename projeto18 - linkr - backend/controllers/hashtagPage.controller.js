import { db } from "../database/database.js";

export async function getHashtagsPosts(req, res) {

    const hashtag = req.params.hashtag;

    try {
      const hashtagId = await db.query("SELECT id FROM hashtags where name= $1",[hashtag])

      const posts = await db.query(`
        SELECT p.* 
        FROM posts p
        JOIN "postHashtag" ph ON p.id = ph."postId"
        JOIN hashtags h ON ph."hashtagId"= h.id
        WHERE h.id= $1
    `, [hashtagId.rows[0]]
    ) 
  
      res.send(posts.rows)
  
    } catch (error) {
      res.status(500).send(error.message)
    }
  }