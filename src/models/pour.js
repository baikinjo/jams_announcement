/**
 * models/pour.js
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
const addonSchema = new Schema({
  type: {
    type:  String
  },
  value: {
    addon: {
      type: Schema.Types.ObjectId,
      ref: 'concreteAddon'
    },
    vph: {
      type: Number
    },
    pourAmount: {
      type: Number
    },
    description: {
      type: String
    },
    cost: {
      type: Number
    },
    addons: [{
      type: {
        type:  String,
        required: true
      },
      value: {
        addon: {
          type: Schema.Types.ObjectId,
          ref: 'concreteAddon',
        }
      }
    }]
  }
}, { _id: false })

const pourSchema = new Schema({
  addons: [addonSchema],
  pourAmount: {
    type: Number,
    required: true
  },
  confirmation: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  pourDate: {
    type: Date,
    required: true
  },
  pourBackup: Date,
  weather: {
    type: String,
    required: true,
    trim: true
  },
  temperature: {
    type: Number,
    required: true
  },
  trucks: {
    type: Number,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  heating: {
    type: Boolean,
    default: false
  },
  notes: String,
  locations: String,
  items: String,
  inspRebar: {
    type: Boolean,
    default: false
  },
  inspShorting: {
    type: Boolean,
    default: false
  },
  inspEmbedded: {
    type: Boolean,
    default: false
  },
  inspElectrical: {
    type: Boolean,
    default: false
  },
  inspCity: {
    type: Boolean,
    default: false
  },
  inspPlumbing: {
    type: Boolean,
    default: false
  },
  inspGeotechnical: {
    type: Boolean,
    default: false
  },
  inspEnvelope: {
    type: Boolean,
    default: false
  },
  inspConcreteTesting: {
    type: Boolean,
    default: false
  },
  concrete: {
    type: Schema.Types.ObjectId,
    ref: 'concrete',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  usePushEach: true
})

export default mongoose.model('pour', pourSchema)
