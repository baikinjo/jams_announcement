/**
 * routes/concrete-addons.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import expressRouter from 'express-promise-router'

/* Models ======================================================================================= */
import ConcreteAddon from '../models/concrete-addon'
import Project from '../models/project'

/* Controllers ================================================================================== */
import * as concreteAddonController from '../controllers/concrete-addons'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/concrete-addon-helper'
import { projectAuth, validateBody, validateParam } from '../helpers/route-helper'
import { R, W, U, D, CADDON, passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/')
  .get(
    passportJWT,
    projectAuth(CADDON, R),
    validateParam(schema.id, [Project], 'projectId'),
    concreteAddonController.index
  )
  .post(
    passportJWT,
    projectAuth(CADDON, W),
    validateParam(schema.id, [Project], 'projectId'),
    validateBody(schema.default),
    concreteAddonController.create
  )

router.route('/:concreteAddonId')
  .get(
    passportJWT,
    projectAuth(CADDON, R),
    validateParam(schema.id, [Project, ConcreteAddon], 'projectId concreteAddonId'),
    concreteAddonController.get
  )
  .put(
    passportJWT,
    projectAuth(CADDON, U),
    validateParam(schema.id, [Project, ConcreteAddon], 'projectId concreteAddonId'),
    validateBody(schema.default),
    concreteAddonController.replace
  )
  .delete(
    passportJWT,
    projectAuth(CADDON, D),
    validateParam(schema.id, [Project, ConcreteAddon], 'projectId concreteAddonId'),
    concreteAddonController.remove
  )

export default router