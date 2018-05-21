/**
 * routes/concretes.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import expressRouter from 'express-promise-router'

/* Models ======================================================================================= */
import Concrete from '../models/concrete'
import Project from '../models/project'

/* Controllers ================================================================================== */
import * as concreteController from '../controllers/concretes'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/concrete-helper'
import { projectAuth, validateBody, validateParam } from '../helpers/route-helper'
import { R, W, U, D, CONCRETE, passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/')
  .get(
    passportJWT,
    projectAuth(CONCRETE, R),
    validateParam(schema.id, [Project], 'projectId'),
    concreteController.index
  )
  .post(
    passportJWT,
    projectAuth(CONCRETE, W),
    validateParam(schema.id, [Project], 'projectId'),
    validateBody(schema.default),
    concreteController.create
  )

router.route('/:concreteId')
  .get(
    passportJWT,
    projectAuth(CONCRETE, R),
    validateParam(schema.id, [Project, Concrete], 'projectId concreteId'),
    concreteController.get
  )
  .put(
    passportJWT,
    projectAuth(CONCRETE, U),
    validateParam(schema.id, [Project, Concrete], 'projectId concreteId'),
    validateBody(schema.default),
    concreteController.replace
  )
  .delete(
    passportJWT,
    projectAuth(CONCRETE, D),
    validateParam(schema.id, [Project, Concrete], 'projectId concreteId'),
    concreteController.remove
  )

export default router