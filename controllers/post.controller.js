
import { db } from '../database/database.js'

import urlMetadata from 'url-metadata';


export async function createPost(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')
   
    const { url, descriptionPost} = req.body

    const {user} = res.locals


    try {

      const metadata = await urlMetadata(url);
     
      const { image, title, description } = metadata;
  

     await db.query('INSERT INTO urls (url, title, description_url, image) values ($1, $2, $3, $4)', [url, title, description, image ])

      const postUrl = await db.query('SELECT * FROM urls WHERE url=$1', [url])


      await db.query('INSERT INTO posts (description, url_id, user_id) values ($1, $2, $3)', [descriptionPost, postUrl.rows[0].id, user.rows[0].id])


      res.sendStatus(201)

    } catch (error) {
      console.log(error)
      res.status(500).send("Deu um problema no servidor!")
    }
  }

  export async function getTimeline(req, res) {

        try {
          const result = await db.query(
            `SELECT 
            posts.*, 
            urls.id AS url_id, 
            urls.url AS url, 
            urls.title AS title, 
            urls.description_url AS description_url, 
            urls.image AS image, 
            users.id AS user_id, 
            users.username AS name, 
            postlike.likes AS likes
          FROM 
            posts 
            JOIN urls ON posts.url_id = urls.id 
            JOIN users ON posts.user_id = users.id 
            LEFT JOIN postlike ON posts.id = postlike.post_id 
          ORDER BY 
            posts.created_at DESC 
          LIMIT 20;
          `)
      
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
              },
              postLike: 
                p.likes ? { likes: p.likes } : null
              
            };
          })
      
          res.send(posts)
      
        } catch (error) {
          res.status(500).send(error.message)
        }
      }

// export async function addlikeCount(req, res) {

//   try {

//     const likeExists = await db.query(
//       `SELECT * FROM postlike WHERE user_id = $1 AND post_id = $2`,
//       [user_id, post_id]
//     );

//     if (likeExists) { 
//       return await db.query(`UPDATE postlike SET likes = likes - 1 WHERE user_id = $1 AND post_id = $2`, [user_id, post_id]);
//     } else {
//       return await db.query(`UPDATE postlike SET likes = likes + 1 WHERE user_id = $1 AND post_id = $2`, [user_id, post_id]);
//     }
//     res.status(200).send("Like adicionado com sucesso!");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// }


export async function updatePost(req, res) {
  
    const id = req.params.id;
    const { description } = req.body
  
    try {
      await db.query(
        `UPDATE posts SET description = $1 WHERE id = $2`,
        [description, id]
      );
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  
}

export async function destroy(req, res) {
  const { id } = req.params
  try {
    const {rowCount } = await db.query('SELECT * FROM posts WHERE id=$1', [id])

    if (rowCount === 0) return res.sendStatus(404)

    await db.query("DELETE FROM posts WHERE id=$1", [id])

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error.message)
  }

}