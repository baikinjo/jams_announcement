/**
 * models/project.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import mongoose from 'mongoose'

/* Models ======================================================================================= */
import Daily from '../models/daily'
import Concrete from '../models/concrete'
import ConcreteAddon from '../models/concrete-addon'
import Pour from '../models/pour'

/* Schema ======================================================================================= */
const Schema = mongoose.Schema
const tradeSchema = new Schema({
  trade: {
    type: Schema.Types.ObjectId,
    ref: 'trade'
  },
  children: [{
    trade: {
      type: Schema.Types.ObjectId,
      ref: 'trade'
    },
    children: [{
      type: Schema.Types.ObjectId,
      ref: 'trade'
    }],
    toggled: Boolean
  }],
  toggled: Boolean
}, { _id: false })

const userSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  toggled: Boolean
}, { _id: false })

const personnelSchema = new Schema({
  type: {
    type:  String
  },
  value: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    toggled: Boolean
  }
}, { _id: false })

const subtradeSchema = new Schema({
  type: {
    type:  String
  },
  value: {
    trade: {
      type: Schema.Types.ObjectId,
      ref: 'trade'
    },
    subtrades: [{
      type: {
        type:  String
      },
      value: {
        trade: {
          type: Schema.Types.ObjectId,
          ref: 'trade'
        },
        toggled: Boolean
      }
    }],
    toggled: Boolean
  }
}, { _id: false })

const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  jobNum: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  concreteExpectedVolume: {
    type: Number,
    required: true
  },
  pours: [{
    type: Schema.Types.ObjectId,
    ref: 'pour',
    required: true
  }],
  dailies: [{
    type: Schema.Types.ObjectId,
    ref: 'daily',
    required: true
  }],
  personnels: [personnelSchema],
  users: [userSchema],
  concretes: [{
    type: Schema.Types.ObjectId,
    ref: 'concrete',
    required: true
  }],
  concreteAddons: [{
    type: Schema.Types.ObjectId,
    ref: 'concreteAddon',
    required: true
  }],
  trades: [tradeSchema],
  subtrades: [subtradeSchema]
}, {
  usePushEach: true
})

projectSchema.pre('remove', async function (next) {
  try {
    await Daily.find().where('_id').in(this.dailies).remove()
    await Pour.find().where('_id').in(this.pours).remove()
    await ConcreteAddon.find().where('_id').in(this.concreteAddons).remove()
    await Concrete.find().where('_id').in(this.concretes).remove()
    next()
  } catch (error) {
    next(error)
  }
})

export default mongoose.model('project', projectSchema)