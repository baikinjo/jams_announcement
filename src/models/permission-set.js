/**
 * models/permission-set.js
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
const permissionSetSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  project: {
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
  pour: {
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
  concrete: {
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
  concreteAddon: {
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
  daily: {
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
}, {
  usePushEach: true
})

export default mongoose.model('permissionSet', permissionSetSchema)
