import { db } from "../database/database.js";

export async function getFollowStatus(req,res){

    const friendId = req.params.id
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')
    try {
        
        const userId = await db.query('SELECT user_id from sessions where token = $1',[token])
        const status = await db.query('Select status from follow where user_id=$1 AND friend_id=$2',[userId.rows[0],friendId]);

        if(!status.rows[0]){
            return res.send("Couldn't get the following status, please refresh the page");
        }

        return res.send(status.rows[0])
    } catch (error) {
        console.log(error.message)
    }
}

export async function FollowSwitch(req,res){

    const friendId = req.params.id
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')

    try {
        
        const userId = await db.query('SELECT user_id from sessions where token = $1',[token])
        const status = await db.query('Select status from follow where user_id=$1 AND friend_id=$2',[userId.rows[0],friendId]);

        if(status.rowCount > 0){
            return res.send("User is already following this person");
        }

        await db.query("INSERT INTO followers (user_id,friend_id) VALUES ($1,$2)",[userId.rows[0],friendId])
        return res.send("User is now following this person");

    } catch (error) {
        console.log(error.message)
    }

}

export async function UnfollowSwitch(req,res){

    const friendId = req.params.id
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')

    try {
        
        const userId = await db.query('SELECT user_id from sessions where token = $1',[token])
        const status = await db.query('Select status from follow where user_id=$1 AND friend_id=$2',[userId.rows[0],friendId]);

        if(status.rowCount === 0){
            return res.send("User isn't following this person");
        }

        await db.query("DELETE FROM followers (user_id,friend_id) VALUES ($1,$2)",[userId.rows[0],friendId])
        return res.send("User has unfollowed this person");

    } catch (error) {
        console.log(error.message)
    }

}