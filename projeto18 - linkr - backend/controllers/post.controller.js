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
  

     await db.query('INSERT INTO urls (url, title, descriptionUrl, image) values ($1, $2, $3, $4)', [url, title, description, image ])

      const postUrl = await db.query('SELECT * FROM urls WHERE url=$1', [url])


      await db.query('INSERT INTO posts (description, urlId, userId) values ($1, $2, $3)', [descriptionPost, postUrl.rows[0].id, user.rows[0].id])


      res.sendStatus(201)

    } catch (error) {
      console.log(error)
      res.status(500).send("Deu um problema no servidor!")
    }
  }

  export async function getTimeline(req, res) {


        try {
          const result = await db.query(
            'SELECT posts.*, urls.id AS url_id, urls.url AS url, urls.title AS title, urls.descriptionUrl AS description_url, urls.image AS image, users.id AS user_id, users.username AS name FROM posts JOIN urls ON posts.urlId = urls.id JOIN users ON posts.userId = users.id ORDER BY posts.createdAt DESC LIMIT 20')
      
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

          console.log(posts)

          res.send(posts)
      
        } catch (error) {
          res.status(500).send(error.message)
        }
      }
  