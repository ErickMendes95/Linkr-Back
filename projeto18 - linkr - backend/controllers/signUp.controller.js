import { db } from "../database/database.js";
import bcrypt, { hash } from "bcrypt";

export async function postSignUp(req, res) {
  const { email, password, username, pictureurl } = res.locals.signUp;
  try {
    const hashPassword = bcrypt.hashSync(password, 10);
    await db.query(
      `
    INSERT INTO users (email, password, username, pictureurl)
    VALUES ($1, $2, $3, $4)
    `,
      [email, hashPassword, username, pictureurl]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
