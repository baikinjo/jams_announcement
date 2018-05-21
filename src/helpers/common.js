/**
 * helpers/common.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import passport from 'passport'

export const passportJWT = passport.authenticate('jwt', { session: false })

export const R = 8
export const W = 4
export const U = 2
export const D = 1

export const CADDON = 'concreteAddon'
export const CONCRETE = 'concrete'
export const CONTACT = 'contact'
export const DAILIES = 'dailies'
export const DAILY = 'daily'
export const POUR = 'pour'
export const PROJECT = 'project'
export const PROJECTS = 'projects'
export const TRADE = 'trade'
export const USER = 'user'
export const USERS = 'users'
export const ANNOUCEMENT = 'announcements'

export const PERMISSIONS = {
  'Superintendent': {
    [PROJECT]: R,
    [POUR]: R + W + U,
    [CONCRETE]: R + U,
    [CADDON]: R + U,
    [DAILY]: R + W + U,
    [ANNOUCEMENT]: R + W + U
  },
  'Project Manager': {
    [PROJECT]: R + U,
    [POUR]: R + W + U,
    [CONCRETE]: R + W + U,
    [CADDON]: R + W + U,
    [DAILY]: R + U,
    [ANNOUCEMENT]: R + W + U
  },
  'Project Coordinator': {
    [PROJECT]: R,
    [POUR]: R,
    [CONCRETE]: R,
    [CADDON]: R,
    [DAILY]: R,
    [ANNOUCEMENT]: R
  },
  'Foreman': {
    [PROJECT]: R,
    [POUR]: R,
    [CONCRETE]: R,
    [CADDON]: R,
    [DAILY]: R,
    [ANNOUCEMENT]: R
  },
  'HSE Coordinator': {
    [PROJECT]: R,
    [DAILY]: R + W + U
  },
  'Other' : {
    [PROJECT]: R,
    [POUR]: R,
    [CONCRETE]: R,
    [CADDON]: R,
    [DAILY]: R,
    [ANNOUCEMENT]: R
  }
}