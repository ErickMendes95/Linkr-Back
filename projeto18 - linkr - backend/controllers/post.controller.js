import {getTrends} from '../repositories/getTrends.js';

export async function createPost(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')
    let title = ""
    let descriptionUrl = ""
    let image = ""

    const { url, description} = req.body

    const {user} = res.locals

    const metadata = require('url-metadata');

    metadata(`${url}`).then(
    function (metadata) { 
   title = metadata.title;
   descriptionUrl = metadata.description;
    image = metadata.image; 
    },
    function (error) { 
        console.log(error);
    }
)

    try {
      const postUrl = await db.query('INSERT INTO urls (url, title, "descriptionUrl", image) values ($1, $2, $3, $4)', [url, title, descriptionUrl, image ])

      await db.query('INSERT INTO posts (description, "urlId", "userId") values ($1, $2, $3)', [description, postUrl.rows[0].id, user.rows[0].id, url, description ])


      res.sendStatus(201)

    } catch (error) {
      console.log(error)
      res.status(500).send("Deu um problema no servidor!")
    }
  }

  export async function getTimeline(req, res) {


        try {
          const posts = await db.query("SELECT * FROM posts limit 20 desc posts.createdAt")

          const arrayTrends = await getTrends()

          if(arrayTrends.length === 0){
            return res.sendStatus(404)
          }
      
          res.send(posts.rows, arrayTrends)
      
        } catch (error) {
          res.status(500).send(error.message)
        }
      }
  