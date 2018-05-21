/**
 * models/user.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

/* Helpers ====================================================================================== */
// import { unique } from '../helpers/route-helper'

/* Schema ======================================================================================= */
const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  },
  recentLogin: {
    type: Date
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  /* Token for resetting password */
  resetToken: {
    type: String,
    default: false,
    select: false
  },
  /* NORMAL_USER, ADMIN, SUPER_ADMIN */
  role: {
    type: String,
    required: true
  },
  projectPermissions: {
    type:[{
      type: {type: String},
      value: {
        project: {
          type: Schema.Types.ObjectId,
          ref: 'project',
          required: true
        },
        permissionSet: {
          type: Schema.Types.ObjectId,
          ref: 'permissionSet'
        },
        expiry: {
          type: Date
        },
        _id: false
      },
      _id: false
    }],
    /** Need to fix validate */
    // validate: [row => unique(row, 'project'), 'Duplicate project found']
  },
  tradePermission: {
    type: {
      active: {
        type: Boolean,
        required: true,
        default: true
      },
      trade: {
        R: {
          type: Boolean,
          required: true,
          default: false
        },
        U: {
          type: Boolean,
          required: true,
          default: false
        },
        W: {
          type: Boolean,
          required: true,
          default: false
        },
        D: {
          type: Boolean,
          required: true,
          default: false
        }
      },
      contact: {
        R: {
          type: Boolean,
          required: true,
          default: false
        },
        U: {
          type: Boolean,
          required: true,
          default: false
        },
        W: {
          type: Boolean,
          required: true,
          default: false
        },
        D: {
          type: Boolean,
          required: true,
          default: false
        }
      }
    }
  },
  createdPours: [{
    type: Schema.Types.ObjectId,
    ref: 'pour',
    required: true
  }],
  position: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  img: String
}, {
  usePushEach: true
})

/** Hooks ======================================================================================== */
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      next()
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(this.password || `${Math.random() * 50000}`, salt)
    this.password = passwordHash

    next()
  } catch(error) {
    next(error)
  }
})

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password)
  } catch(error) {
    throw new Error(error)
  }
}

export default mongoose.model('user', userSchema)