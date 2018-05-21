/**
 * helpers/image-helper.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import Joi from 'joi'

export const schema = {
  image: Joi.object().keys({
    file: Joi.object().keys({
      fieldname: Joi.string().required().trim(),
      originalname: Joi.string().required().trim(),
      encoding: Joi.string().required().trim(),
      mimetype: Joi.string().required().trim(),
      destination: Joi.string().required().trim(),
      filename: Joi.string().required().trim(),
      path: Joi.string().required().trim(),
      size: Joi.number().required(),
      temp: Joi.boolean()
    })
  }),
  images: Joi.object().keys({
    files: Joi.object().pattern(/.*/,
      Joi.array().items(Joi.object({
        fieldname: Joi.string().required().trim(),
        originalname: Joi.string().required().trim(),
        encoding: Joi.string().required().trim(),
        mimetype: Joi.string().required().trim(),
        destination: Joi.string().allow(null),
        filename: Joi.string().required().trim(),
        path: Joi.string().required().trim(),
        size: Joi.number().required()
      }))
    ),
    session: Joi.number()
  }),
  delete: Joi.object().keys({
    paths: Joi.array().items(Joi.string())
  })
}