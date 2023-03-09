import { db } from "../database/database.js";

export async function getUserById(req, res){

    const { id } = req.params;

    try {
       const users = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
       
       if(users.rowCount === 0) return res.sendStatus(404);
       res.status(200).send(users.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

