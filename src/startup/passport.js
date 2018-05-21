/**
 * config/passport.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'

/* Models ======================================================================================= */
import User from '../models/user'

/* Config ======================================================================================= */
import config from 'config'

export default () => {
  const opts =  {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
  }

  /** JSON web tokens strategy */
  passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        // const options = {
        //   path: 'projectPermissions.value.permissionSet',
        //   model: 'permissionSet'
        // }
        /** Find the user specified in token */
        const user = await User.findById(payload.userId).populate('projectPermissions.value.permissionSet')

        /**
         * If user doesn't exist, handle
         * Otherwise, return the user
         */
        if(!user) {
          return done(null, false)
        }

        done(null, user)
      } catch(error) {
        done(error, false)
      }
    })
  )

  /** Local Strategy */
  passport.use(
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    }, async (username, password, done) => {
      try {
        /**
         *  Find the user given the email
         */
        const criteria = { email: username }
        const options = {
          path: 'projectPermissions.permissionSet',
          model: 'permissionSet'
        }
        const user = await User.findOne(criteria).populate(options)

        if (!user) {
          return done('User not found', false)
        }

        /** Check is the user is activated */
        if (!user.active) {
          return done('User not activated', false)
        }

        /** Check if the password is correct */
        const isMatch = await user.isValidPassword(password)

        if (!isMatch) {
          return done('Invalid Password', 'kanye')
        }

        /** Otherwise, return the user */
        done(null, user)
      } catch(error) {
        done(error, false)
      }
    })
  )
}