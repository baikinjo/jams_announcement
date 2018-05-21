/**
 * helpers/permission-set-helper.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import Joi from 'joi'

export const schema = {
  default: Joi.object().keys({
    name: Joi.string().required().trim(),
    project: Joi.object().keys({
      R: Joi.boolean(),
      W: Joi.boolean(),
      U: Joi.boolean(),
      D: Joi.boolean()
    }),
    concrete: Joi.object().keys({
      R: Joi.boolean(),
      W: Joi.boolean(),
      U: Joi.boolean(),
      D: Joi.boolean()
    }),
    concreteAddon: Joi.object().keys({
      R: Joi.boolean(),
      W: Joi.boolean(),
      U: Joi.boolean(),
      D: Joi.boolean()
    }),
    pour: Joi.object().keys({
      R: Joi.boolean(),
      W: Joi.boolean(),
      U: Joi.boolean(),
      D: Joi.boolean()
    }),
    daily: Joi.object().keys({
      R: Joi.boolean(),
      W: Joi.boolean(),
      U: Joi.boolean(),
      D: Joi.boolean()
    }),
  }),
  id: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}