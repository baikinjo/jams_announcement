/**
 * routes/contacts.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import expressRouter from 'express-promise-router'

/* Models ======================================================================================= */
import Contact from '../models/contact'

/* Controllers ================================================================================== */
import * as contactController from '../controllers/contacts'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/contact-helper'
import { authorization, validateBody, validateParam } from '../helpers/route-helper'
import { R, W, U, D, CONTACT, passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/')
  .get(
    passportJWT,
    authorization(CONTACT, R),
    contactController.index
  )
  .post(
    passportJWT,
    authorization(CONTACT, W),
    validateBody(schema.default),
    contactController.create
  )

router.route('/:contactId')
  .get(
    passportJWT,
    authorization(CONTACT, R),
    validateParam(schema.id, [Contact], 'contactId'),
    contactController.get
  )
  .put(
    passportJWT,
    authorization(CONTACT, U),
    validateParam(schema.id, [Contact], 'contactId'),
    validateBody(schema.default),
    contactController.replace
  )
  .delete(
    passportJWT,
    authorization(CONTACT, D),
    validateParam(schema.id, [Contact], 'contactId'),
    contactController.remove
  )

module.exports = router