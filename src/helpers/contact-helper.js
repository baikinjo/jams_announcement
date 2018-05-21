/**
 * helpers/contact-helper.js
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
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    phone: Joi.string().regex(/^\d{3}[-]{1}\d{3}[-]{1}\d{4}$/).required(),
    position: Joi.string().trim(),
    email: Joi.string().email().required().lowercase().trim(),
    trade: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  id: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}