import { db } from "../database/database.js";
import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";

export async function postSignIn(req, res) {
  const { email, password } = res.locals.signIn;
  try {
    const user = await db.query(
      `
    SELECT * FROM users WHERE email=$1
    `,
      [email]
    );
    if (user.rows[0] === undefined) {
      return res.status(401).send('Email ou senha incorreto!');
    }
    const comparePassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!comparePassword) {
      return res.status(401).send('Email ou senha incorreto!');
    }
    const token = uuidV4();
    const userId = user.rows[0].id;
    await db.query(
      `
            INSERT INTO sessions (token, userid)
            VALUES ($1, $2)
            `,
      [token, userId]
    );
    res.send({ token, userId }).status(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
