/**
 * helpers/trade-helper.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import Joi from 'joi'
const possibleDivision = [
  '01 — General Requirements',
  '02 — Site Construction',
  '03 — Concrete',
  '04 — Masonry',
  '05 — Metals',
  '06 — Wood and Plastics',
  '07 — Thermal and Moisture Protection',
  '08 — Doors and Windows',
  '09 — Finishes',
  '10 — Specialties',
  '11 — Equipment',
  '12 — Furnishings',
  '13 — Special Construction',
  '14 — Conveying Systems',
  '15 — Mechanical',
  '16 — Electrical',
  '17 — Telecomm and Security'
]

export const schema = {
  default: Joi.object().keys({
    name: Joi.string().required().trim(),
    address: Joi.string().required().trim(),
    phone: Joi.string().regex(/^\d{3}[-]{1}\d{3}[-]{1}\d{4}$/),
    email: Joi.string().email().lowercase().trim(),
    division: Joi.string().valid(possibleDivision).required()
  }),
  id: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}