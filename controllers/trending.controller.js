import { db } from "../database/database.js"

export async function getTrends(req,res){

    try {

        const { rows } = await db.query(`SELECT name FROM hashtags ORDER BY popularity DESC LIMIT 10`)
        const trends = []
        rows.map((r)=> {
            trends.push(r)
        })
        return res.send(trends)
        
    } catch (error) {
        console.log(error.message)
    }
}