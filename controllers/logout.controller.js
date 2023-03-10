import { db } from "../database/database.js";

export async function deleteToken(req,res){
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    try{
       if (!token) {
         return res.status.send(token);
       }
      await db.query(`
      DELETE FROM sessions 
      WHERE token=$1
      `, [token])
      res.sendStatus(204)
    }catch(err){
      res.status(500).send(err.message);
    }
  }
  