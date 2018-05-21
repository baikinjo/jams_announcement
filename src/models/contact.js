/**
 * models/contact.js
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
const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  position: String,
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  trade: {
    type: Schema.Types.ObjectId,
    ref: 'trade',
    required: true
  }
}, {
  usePushEach: true
})

export default mongoose.model('contact', contactSchema)
