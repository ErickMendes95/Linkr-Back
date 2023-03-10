import { db } from "../database/database.js";
import { signUpSchema } from "../models/signUp.Schema.js";

export async function postSignUpValidation(req, res, next) {
  const user = req.body;

  const { error } = signUpSchema.validate(user);

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }
  const emailExist = await db.query("SELECT * FROM users WHERE email=$1", [
    user.email,
  ]);
  if (emailExist.rowCount > 0) {
    return res.status(409).send("this email has already been registered");
  }
  res.locals.signUp = user;
  next()
}
