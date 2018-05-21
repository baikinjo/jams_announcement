/**
 * routes/users.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import expressRouter from 'express-promise-router'
import passport from 'passport'

/* Models ======================================================================================= */
import User from '../models/user'

/* Controllers ================================================================================== */
import * as userController from '../controllers/users'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/user-helper'
import { authorization, validateBody, validateParam } from '../helpers/route-helper'
import { passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })
const passportSignIn = passport.authenticate('local', { session: false })

/* admin only */
router.route('/')
  .get(
    passportJWT,
    userController.index
  )
  .post(
    passportJWT,
    authorization(),
    validateBody(schema.create),
    userController.create
  )

router.route('/signin')
  .post(
    validateBody(schema.signin),
    passportSignIn,
    userController.signIn
  )

router.route('/send-password-request')
  .post(
    validateBody(schema.passwordRequest),
    userController.sendPasswordRequest
  )

router.route('/send-password-reset')
  .post(
    passportJWT,
    authorization(),
    validateBody(schema.email),
    userController.sendPasswordReset
  )

router.route('/reset-password')
  .put(
    validateBody(schema.reset),
    userController.resetPassword
  )

/* admin only */
router.route('/:userId')
  .get(
    passportJWT,
    authorization(),
    validateParam(schema.id, [User], 'userId'),
    userController.get
  )
  .put(
    passportJWT,
    authorization(),
    validateParam(schema.id, [User], 'userId'),
    validateBody(schema.update),
    userController.replace
  )
  .delete(
    passportJWT,
    authorization(),
    validateParam(schema.id, [User], 'userId'),
    userController.remove
  )

export default router
