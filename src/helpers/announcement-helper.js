/**
 * helpers/announcement-helper.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Injo Baik, ibaik@ventanaconstruction.com
 */

import Joi from 'joi'

export const schema = {
  default: Joi.object().keys({
    createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    date: Joi.date().iso().required(),
    title: Joi.string().required(),
    project: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    message: Joi.string().required(),
    checked: Joi.array()
  }),
  id: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}