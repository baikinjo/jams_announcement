/**
 * models/concrete-addon.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import mongoose from 'mongoose'

/* Schema ======================================================================================= */
const Schema = mongoose.Schema
const concreteAddonSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  uom: {
    type: String,
    required: true,
    trim: true
  },
  cost: {
    type: Number,
    required: true,
    trim: true
  },
  toggled: {
    type: Boolean
  }
}, {
  usePushEach: true
})

export default mongoose.model('concreteAddon', concreteAddonSchema)
