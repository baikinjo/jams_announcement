/**
 * helpers/concrete-addon-helper.js
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
    uom: Joi.string().valid('Meters', 'Liters', 'Trucks', 'Loads').required(),
    cost: Joi.number().precision(2).required(),
    toggled: Joi.boolean()
  }),
  id: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}