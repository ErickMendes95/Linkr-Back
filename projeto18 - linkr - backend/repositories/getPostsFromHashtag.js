import { db } from "../database/database";


export async function getPostsFromHashtag(id){

    const {rows} = await db.query(`
    SELECT p.* 
    FROM posts p
    JOIN "postHashtag" ph ON p.id = ph."postId"
    JOIN hashtags h ON ph."hashtagId"= h.id
    WHERE h.id= $1
    `, [id]
    ) 
    return rows;

}