/**
 * models/concrete.js
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
const concreteSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  mpa: {
    type: Number,
    required: true,
    trim: true
  },
  cost: {
    type: Number,
    required: true,
    trim: true
  },
  aggSize: {
    type: Number,
    required: true,
    trim: true
  },
  airPercent: {
    type: String,
    required: true,
  },
  slump: {
    type: Number,
    required: true,
  },
  exposure: {
    type: String,
    required: true,
  },
  expectedVolume: {
    type: Number,
    required: true,
    trim: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'project',
    required: true
  },
  toggled: {
    type: Boolean
  }
}, {
  usePushEach: true
})

export default mongoose.model('concrete', concreteSchema)