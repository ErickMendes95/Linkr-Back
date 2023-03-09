import { db } from "../database/database.js"

export async function getTrends(req,res){

    const { rows } = await db.query(`SELECT ARRAY_AGG(name) AS tags FROM hashtags ORDER BY popularity DESC LIMIT 10`)
    const trends = rows[0].tags
    return trends
}