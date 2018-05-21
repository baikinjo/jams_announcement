/**
 * helpers/concrete-helper.js
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
    mpa: Joi.number().required(),
    cost: Joi.number().precision(2).required(),
    aggSize: Joi.number().required(),
    airPercent: Joi.string().required().regex(/^\d{1}[-]{1}\d{1}[%]{1}$/),
    slump: Joi.number().required(),
    exposure: Joi.string().required(),
    expectedVolume: Joi.number().precision(1).required(),
    toggled: Joi.boolean()
  }),
  id: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}