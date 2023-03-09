import { db } from "../database/database";

export async function getUserIdFromUsername(username){
    const {rows} = await db.query(`SELECT id from user where username=$1`,[username]);
    return rows[0].id;
}