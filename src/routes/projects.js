/**
 * routes/projects.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */
import expressRouter from 'express-promise-router'

/* Models ======================================================================================= */
import Project from '../models/project'

/* Controllers ================================================================================== */
import * as projectController from '../controllers/projects'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/project-helper'
import { authorization, projectAuth, validateBody, validateParam } from '../helpers/route-helper'
import { R, W, U, D, PROJECT, passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/')
  .get(
    passportJWT,
    projectAuth(PROJECT, R),
    projectController.index
  )
  .post(
    passportJWT,
    projectAuth(PROJECT, W),
    validateBody(schema.default),
    projectController.create
  )

router.route('/:projectId')
  .get(
    passportJWT,
    projectAuth(PROJECT, R),
    validateParam(schema.id, [Project], 'projectId'),
    projectController.get)
  .put(
    passportJWT,
    projectAuth(PROJECT, U),
    validateParam(schema.id, [Project], 'projectId'),
    validateBody(schema.default),
    projectController.replace
  )
  .delete(
    passportJWT,
    authorization(PROJECT, D),
    validateParam(schema.id, [Project], 'projectId'),
    projectController.remove
  )

router.route('/:projectId/analyze-total-pours')
  .get(
    passportJWT,
    projectAuth(PROJECT, R),
    validateParam(schema.id, [Project], 'projectId'),
    projectController.analyzeTotalPours
  )

export default router