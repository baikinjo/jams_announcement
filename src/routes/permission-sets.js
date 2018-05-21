/**
 * routes/permission-sets.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import expressRouter from 'express-promise-router'

/* Models ======================================================================================= */
import PermissionSet from '../models/permission-set'

/* Controllers ================================================================================== */
import * as permissionSetController from '../controllers/permission-sets'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/permission-set-helper'
import { authorization, validateBody, validateParam } from '../helpers/route-helper'
import { passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/')
  .get(
    passportJWT,
    permissionSetController.index
  )
  .post(
    passportJWT,
    authorization(),
    validateBody(schema.default),
    permissionSetController.create
  )

router.route('/:permissionSetId')
  .get(
    passportJWT,
    authorization(),
    validateParam(schema.id, [PermissionSet], 'permissionSetId'),
    permissionSetController.get
  )
  .put(
    passportJWT,
    authorization(),
    validateParam(schema.id, [PermissionSet], 'permissionSetId'),
    validateBody(schema.default),
    permissionSetController.replace
  )
  .delete(
    passportJWT,
    authorization(),
    validateParam(schema.id, [PermissionSet], 'permissionSetId'),
    permissionSetController.remove
  )

export default router