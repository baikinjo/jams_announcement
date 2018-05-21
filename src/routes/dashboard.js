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
/* Controllers ================================================================================== */
import * as dashboardController from '../controllers/dashboard'

/* Helpers ====================================================================================== */
import { passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/:from&:to')
  .get(
    passportJWT,
    dashboardController.index
  )
export default router