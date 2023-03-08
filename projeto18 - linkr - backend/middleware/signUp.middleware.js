import { db } from "../database/database.js";
import { signUpSchema } from "../models/signUp.Schema.js";

export async function postSignUpValidation(req, res, next) {
  const user = req.body;

  const { error } = signUpSchema.valitade(user);

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.setatus(422).send({ errors });
  }

  res.locals.signUp = user;
  next()
}
