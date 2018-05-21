/**
 * models/daily.js
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
  type: {
    type: String
  },
  value: {
    trade: {
      type: Schema.Types.ObjectId,
      ref: 'trade'
    },
    subtrades: [{
      type: {
        type: String
      },
      value: {
        labourCount: Number,
        trade: {
          type: Schema.Types.ObjectId,
          ref: 'trade'
        }
      }
    }],
    mgmtCount: {
      type: Number,
      required: true,
      default: 0
    },
    labourCount: {
      type: Number,
      required: true,
      default: 0
    },
    backCharge: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
    }
  }
}, { _id: false })

const personnelSchema = new Schema({
  type: {
    type: String
  },
  value: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }
}, { _id: false })

const visitorSchema = new Schema({
  type: {
    type: String
  },
  value: {
    firstName: { type: String },
    lastName: { type: String },
    company: { type: String },
    position: { type: String },
    description: { type: String }
  }
}, { _id: false })

const dailySchema = new Schema({
  personnels: [personnelSchema],
  trades: [tradeSchema],
  carpenter: {
    type: Number,
    default: 0
  },
  trafficControl: {
    type: Number,
    default: 0
  },
  hoistOperator: {
    type: Number,
    default: 0
  },
  labour: {
    type: Number,
    default: 0
  },
  tempWorker: {
    type: Number,
    default: 0
  },
  visitors: [visitorSchema],
  tempHigh: {
    type: Number,
    required: true
  },
  tempLow: {
    type: Number,
    required: true
  },
  weatherAm: {
    type: String,
    required: true
  },
  weatherPm: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  workCompleted: {
    description: {
      type: String,
    },
    images: []
  },
  jobDelay: {
    description: {
      type: String,
    },
    images: []
  },
  incident: {
    description: {
      type: String,
    },
    images: []
  },
  sustainability: {
    description: {
      type: String,
    },
    images: []
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'project',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, {
  usePushEach: true
})

export default mongoose.model('daily', dailySchema)