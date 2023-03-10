import { db } from "../database/database.js";

export async function getHashtagsPosts(req, res) {

  const hashtag = req.params.hashtag;
  
  try {

      const hashtagId = await db.query("SELECT * FROM hashtags where name= $1",[hashtag])
    
      const result = await db.query(
        `SELECT posts.*, 
        urls.id AS url_id, 
        urls.url AS url, 
        urls.title AS title, 
        urls."descriptionUrl" AS description_url, 
        urls.image AS image, users.id AS user_id, 
        users.username AS name 
        FROM posts 
        JOIN urls ON posts."urlId" = urls.id 
        JOIN users ON posts."userId" = users.id
        JOIN "postHashtag" ph ON posts.id = ph."postId"
        JOIN hashtags h ON ph."hashtagId"= h.id
        WHERE h.id= '${[hashtagId.rows[0].id]}'
        ORDER BY posts.createdAt DESC LIMIT 20`)

        const posts = result.rows.map((p) => {
        return {
          id: p.id,
          user: p.name,
          descriptionPost: p.description,
          urlId: p.urlid,
          urlPost: {
            id: p.url_id,
            url: p.url,
            title: p.title,
            description: p.description_url,
            image: p.image
          }
        };
      })
      
      res.send(posts)
  
    } catch (error) {
      res.status(500).send(error.message)
    }
  }