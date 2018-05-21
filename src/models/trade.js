/**
 * models/trade.js
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
const tradeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true
  },
  division: {
    type: String,
    required: true
  }
}, {
  usePushEach: true
})

export default mongoose.model('trade', tradeSchema)