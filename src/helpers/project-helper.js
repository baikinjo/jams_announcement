/**
 * helpers/project-helper.js
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
    /** jobNum must match format A-123 */
    jobNum: Joi.string().required().trim().regex(/^[A-Z]{1}[-]{1}\d{3}$/),
    concreteExpectedVolume: Joi.number().required(),
    endDate: Joi.date().iso().required(),
    trades: Joi.array(),
    dailies: Joi.array(),
    users: Joi.array(),
    concreteAddons: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    pours: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    personnels: Joi.array(),
    subtrades: Joi.array()
  }),
  id: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}