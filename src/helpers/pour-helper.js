/**
 * helpers/pour-helper.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import Joi from 'joi'

export const schema = {
  create: Joi.object().keys({
    addons: Joi.array(),
    pourAmount: Joi.string().required(),
    confirmation: Joi.string().required().trim(),
    pourDate: Joi.date().iso().required(),
    pourBackup: Joi.date().iso(),
    weather: Joi.string().required().trim(),
    temperature: Joi.number().required(),
    trucks: Joi.number().required(),
    confirmed: Joi.boolean(),
    heating: Joi.boolean(),
    notes: Joi.string(),
    locations: Joi.string(),
    items: Joi.string(),
    inspRebar: Joi.boolean(),
    inspShorting: Joi.boolean(),
    inspEmbedded: Joi.boolean(),
    inspElectrical: Joi.boolean(),
    inspCity: Joi.boolean(),
    inspPlumbing: Joi.boolean(),
    inspGeotechnical: Joi.boolean(),
    inspEnvelope: Joi.boolean(),
    inspConcreteTesting: Joi.boolean(),
    usedTruckAddons: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    otfs: Joi.array().items(
      Joi.object().keys({
        description: Joi.string().required().trim(),
        cost: Joi.number().required()
      })
    ),
    pourGroups: Joi.array().items(
      Joi.object().keys({
        pourAmount: Joi.number().required(),
        pourVph: Joi.number().required(),
        usedAddons: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
      })
    ),
    concrete: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),
  update: Joi.object().keys({
    addons: Joi.array(),
    concrete: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    pourAmount: Joi.number().required(),
    confirmation: Joi.string().required().trim(),
    pourDate: Joi.date().iso().required(),
    pourBackup: Joi.date().iso(),
    weather: Joi.string().required().trim(),
    temperature: Joi.number().required(),
    trucks: Joi.number().required(),
    confirmed: Joi.boolean(),
    heating: Joi.boolean(),
    notes: Joi.string(),
    locations: Joi.string(),
    items: Joi.string(),
    inspRebar: Joi.boolean(),
    inspShorting: Joi.boolean(),
    inspEmbedded: Joi.boolean(),
    inspElectrical: Joi.boolean(),
    inspCity: Joi.boolean(),
    inspPlumbing: Joi.boolean(),
    inspGeotechnical: Joi.boolean(),
    inspEnvelope: Joi.boolean(),
    inspConcreteTesting: Joi.boolean(),
    usedTruckAddons: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    otfs: Joi.array().items(
      Joi.object().keys({
        description: Joi.string().required().trim(),
        cost: Joi.number().required()
      })
    ),
    pourGroups: Joi.array().items(
      Joi.object().keys({
        pourAmount: Joi.number().required(),
        pourVph: Joi.number().required(),
        usedAddons: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
      })
    )
  }),
  id: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}