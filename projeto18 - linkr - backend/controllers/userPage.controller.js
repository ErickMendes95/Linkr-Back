import { getPostsFromUserId } from "../repositories/getPostsFromUserId.js";


export async function getUserPosts(req, res) {

    const id = req.params.id;

    try {

      const posts = await getPostsFromUserId(id);
  
      res.send(posts)
  
    } catch (error) {
      res.status(500).send(error.message)
    }
  }