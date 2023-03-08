import { db } from "../database/database.js";
import { signInSchema } from "../model/signIn.Schema.js";

export async function signInValidation(req, res, next) {
  const user = req.body;

  const { error } = signInSchema.validate(user);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }
  res.locals.signIn = user
  next()
}