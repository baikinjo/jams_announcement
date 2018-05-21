/**
 * helpers/user-helper.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import Joi from 'joi'

const possibleRoles = ['NORMAL_USER', 'ADMIN', 'SUPER_ADMIN']

export const schema = {
  create: Joi.object().keys({
    active: Joi.boolean(),
    email: Joi.string().email().required().lowercase().trim(),
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    password: Joi.string().trim(),
    phone: Joi.string().regex(/^\d{3}[-]{1}\d{3}[-]{1}\d{4}$/).required(),
    position: Joi.string().trim(),
    recentLogin: Joi.date().iso(),
    role: Joi.string().valid(possibleRoles).required(),
    projectPermissions: Joi.array().items(
      Joi.object().keys({
        type: Joi.string(),
        value: Joi.object().keys({
          project: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
          permissionSet: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
          expiry: Joi.date().iso().required()
        })
      })
    ),
    tradePermission: Joi.object().keys({
      trade: Joi.object().keys({
        R: Joi.boolean(),
        W: Joi.boolean(),
        U: Joi.boolean(),
        D: Joi.boolean()
      }),
      contact: Joi.object().keys({
        R: Joi.boolean(),
        W: Joi.boolean(),
        U: Joi.boolean(),
        D: Joi.boolean()
      })
    })
  }),
  update: Joi.object().keys({
    active: Joi.boolean(),
    email: Joi.string().email().required().lowercase().trim(),
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    password: Joi.string().trim(),
    position: Joi.string().trim(),
    recentLogin: Joi.date().iso(),
    role: Joi.string().valid(possibleRoles).required(),
    phone: Joi.string().regex(/^\d{3}[-]{1}\d{3}[-]{1}\d{4}$/).required(),
    projectPermissions: Joi.array().items(
      Joi.object().keys({
        type: Joi.string(),
        value: Joi.object().keys({
          project: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
          permissionSet: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
          expiry: Joi.date().iso().required()
        })
      })
    ),
    tradePermission: Joi.object().keys({
      trade: Joi.object().keys({
        R: Joi.boolean(),
        W: Joi.boolean(),
        U: Joi.boolean(),
        D: Joi.boolean()
      }),
      contact: Joi.object().keys({
        R: Joi.boolean(),
        W: Joi.boolean(),
        U: Joi.boolean(),
        D: Joi.boolean()
      })
    })
  }),
  /** Signin schema */
  signin: Joi.object().keys({
    username: Joi.string().lowercase().required().trim(),
    password: Joi.string().required().trim()
  }),
  /** Reset schema */
  reset: Joi.object().keys({
    resetToken: Joi.string().required(),
    password: Joi.string().required().trim(),
    passwordConfirm: Joi.string().required().trim()
  }),
  email: Joi.object().keys({
    email: Joi.string().email().required().lowercase()
  }),
  passwordRequest: Joi.object().keys({
    email: Joi.string().email().required().lowercase(),
    phone: Joi.string().regex(/^\d{3}[-]{1}\d{3}[-]{1}\d{4}$/).required()
  }),
  id: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}