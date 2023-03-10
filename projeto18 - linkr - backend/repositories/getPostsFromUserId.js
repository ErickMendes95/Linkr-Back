import { db } from "../database/database.js";

export async function getPostsFromUserId(id){

    const {rows} = await db.query(`
    SELECT * 
    FROM posts 
    WHERE user_id= $1
    `, [id]
    ) 
    return rows;

}