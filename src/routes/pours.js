/**
 * routes/pours.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */
import expressRouter from 'express-promise-router'

/* Models ======================================================================================= */
import Pour from '../models/pour'
import Project from '../models/project'

/* Controllers ================================================================================== */
import * as pourController from '../controllers/pours'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/pour-helper'
import { projectAuth, validateBody, validateParam } from '../helpers/route-helper'
import { R, W, U, D, POUR, passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/')
  .get(
    passportJWT,
    projectAuth(POUR, R),
    validateParam(schema.id, [Project], 'projectId'),
    pourController.index
  )
  .post(
    passportJWT,
    projectAuth(POUR, W),
    validateParam(schema.id, [Project], 'projectId'),
    validateBody(schema.create),
    pourController.create
  )

router.route('/:pourId')
  .get(
    passportJWT,
    projectAuth(POUR, R),
    validateParam(schema.id, [Project, Pour], 'projectId pourId'),
    pourController.get
  )
  .put(
    passportJWT,
    projectAuth(POUR, U),
    validateParam(schema.id, [Project, Pour], 'projectId pourId'),
    validateBody(schema.update),
    pourController.replace
  )
  .delete(
    passportJWT,
    projectAuth(POUR, D),
    validateParam(schema.id, [Project, Pour], 'projectId pourId'),
    pourController.remove
  )

export default router