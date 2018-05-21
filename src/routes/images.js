/**
 * routes/images.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import expressRouter from 'express-promise-router'

/* Models ======================================================================================= */
import * as imageController from '../controllers/images'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/image-helper'
import { validateBody } from '../helpers/route-helper'
import { passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/upload')
  .post(
    passportJWT,
    imageController.upload
  )

router.route('/delete-temp')
  .delete(
    passportJWT,
    imageController.deleteTemp
  )

router.route('/save')
  .post(
    passportJWT,
    validateBody(schema.images),
    imageController.save
  )

export default router