import { db } from "../database/database.js"

export async function authValidation(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
  
    if (!token) return res.status(401).send("Não autorizado")
  
    try {
      const session = await db.query('SELECT * FROM sessions WHERE token =$1', [token])
      if (session.rowCount === 0) return res.status(401).send("Não autorizado")

      const user = await db.query('SELECT * FROM users WHERE id =$1', [session.rows[0].userid])
  
      if (!user) return res.status(401).send("Não autorizado")
  
      res.locals.user = user
      
    next()
  
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  
  }