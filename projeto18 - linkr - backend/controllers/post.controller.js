export async function createPost(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')

    const { url, description} = req.body

    const {user} = res.locals

    const shortUrl = nanoid(8)

    try {
      await db.query('INSERT INTO urls (id_user, url, description) values ($1, $2, $3', [user.rows[0].id, url, description ])

      const post = await db.query('SELECT * FROM posts WHERE short_url=$1', [shortUrl])

      res.status(201).send({ AQUI VEM AS INFOS DO LINK SERÁ?})

    } catch (error) {
      console.log(error)
      res.status(500).send("Deu um problema no servidor!")
    }
  }

  export async function getTimeline(req, res) {


        try {
          const posts = await db.query("SELECT * FROM posts limit 20 desc posts.createdAt")
      
          res.send(posts.rows)
      
        } catch (error) {
          res.status(500).send(error.message)
        }
      }
  