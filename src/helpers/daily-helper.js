/**
 * helpers/daily-helper.js
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
    carpenter: Joi.number(),
    createdBy: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    date: Joi.date().iso().required(),
    hoistOperator: Joi.number(),
    incident: Joi.object(),
    jobDelay: Joi.object(),
    labour: Joi.number(),
    personnels: Joi.array(),
    project: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    sustainability: Joi.object(),
    tempHigh: Joi.number().required(),
    tempLow: Joi.number().required(),
    tempWorker: Joi.number(),
    trades: Joi.array(),
    trafficControl: Joi.number(),
    visitors: Joi.array(),
    weatherAm: Joi.string().required().trim(),
    weatherPm: Joi.string().required().trim(),
    workCompleted: Joi.object(),
  }),
  id: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}