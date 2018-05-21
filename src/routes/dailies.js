/**
 * routes/dailies.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import expressRouter from 'express-promise-router'

/* Models ======================================================================================= */
import Daily from '../models/daily'
import Project from '../models/project'

/* Controllers ================================================================================== */
import * as dailyController from '../controllers/dailies'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/daily-helper'
import { projectAuth, validateBody, validateParam } from '../helpers/route-helper'
import { R, W, U, D, DAILY, passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/')
  .get(
    passportJWT,
    projectAuth(DAILY, R),
    validateParam(schema.id, [Project], 'projectId'),
    dailyController.index
  )
  .post(
    passportJWT,
    projectAuth(DAILY, W),
    validateParam(schema.id, [Project], 'projectId'),
    validateBody(schema.default),
    dailyController.create
  )

router.route('/:dailyId')
  .get(
    passportJWT,
    projectAuth(DAILY, R),
    validateParam(schema.id, [Project, Daily], 'projectId dailyId'),
    dailyController.get)
  .put(
    passportJWT,
    projectAuth(DAILY, U),
    validateParam(schema.id, [Project, Daily], 'projectId dailyId'),
    validateBody(schema.default),
    dailyController.replace
  )
  .delete(
    passportJWT,
    projectAuth(DAILY, D),
    validateParam(schema.id, [Project, Daily], 'projectId dailyId'),
    dailyController.remove
  )

router.route('/:dailyId/pours')
  .get(
    passportJWT,
    projectAuth(DAILY, R),
    validateParam(schema.id, [Project, Daily], 'projectId dailyId'),
    dailyController.getPours
  )

export default router