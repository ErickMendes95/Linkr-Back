import { db } from "../database/database";

export async function getPostsFromUserId(id){

    const {rows} = await db.query(`
    SELECT * 
    FROM posts 
    WHERE id= $1
    `, [id]
    ) 
    return rows;

}