/**
 * models/announcement.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Injo Baik, ibaik@ventanaconstruction.com
 */
import mongoose from 'mongoose'

/* Schema ======================================================================================= */
const Schema = mongoose.Schema

const announcementSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'project',
  },
  message: {
    type: String,
    required: true
  },
  checked: [{
    reader: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  usePushEach: true
})

export default mongoose.model('announcement', announcementSchema)