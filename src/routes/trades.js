/**
 * routes/trades.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import expressRouter from 'express-promise-router'

/* Models ======================================================================================= */
import Trade from '../models/trade'

/* Controllers ================================================================================== */
import * as tradeController from '../controllers/trades'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/trade-helper'
import { authorization, validateBody, validateParam } from '../helpers/route-helper'
import { W, U, D, TRADE, passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/')
  .get(
    passportJWT,
    tradeController.index
  )
  .post(
    passportJWT,
    authorization(TRADE, W),
    validateBody(schema.default),
    tradeController.create
  )

router.route('/search')
  .get(
    passportJWT,
    tradeController.index
  )

router.route('/:tradeId')
  .get(
    passportJWT,
    validateParam(schema.id, [Trade], 'tradeId'),
    tradeController.get)
  .put(
    passportJWT,
    authorization(TRADE, U),
    validateParam(schema.id, [Trade], 'tradeId'),
    validateBody(schema.default),
    tradeController.replace
  )
  .delete(
    passportJWT,
    authorization(TRADE, D),
    validateParam(schema.id, [Trade], 'tradeId'),
    tradeController.remove
  )

export default router