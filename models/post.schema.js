import joi from 'joi'

export const postSchema = joi.object({
  url: joi.string().uri().required(),
  descriptionPost: joi.string()
})