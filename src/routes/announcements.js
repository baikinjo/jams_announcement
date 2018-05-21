/**
 * routes/projects.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Injo Baik, ibaik@ventanaconstruction.com
 */
import expressRouter from 'express-promise-router'

/* Models ======================================================================================= */
import Announcement from '../models/announcement'

/* Controllers ================================================================================== */
import * as announcementController from '../controllers/announcements'

/* Helpers ====================================================================================== */
import { schema } from '../helpers/project-helper'
import { authorization, announcementAuth, projectAuth, validateBody, validateParam } from '../helpers/route-helper'
import { R, W, U, D, ANNOUCEMENT, passportJWT } from '../helpers/common'

/* Routes ======================================================================================= */
const router = expressRouter({ mergeParams: true })

router.route('/')
  .get(
    passportJWT,
    announcementAuth(ANNOUCEMENT, R),
    announcementController.index
  )
  .post(
    passportJWT,
    projectAuth(ANNOUCEMENT, W),
    announcementController.create
  )

router.route('/:announcementId')
  .get(
    passportJWT,
    projectAuth(ANNOUCEMENT, R),
    validateParam(schema.id, [Announcement], 'announcementId'),
    announcementController.get)
  .put(
    passportJWT,
    projectAuth(ANNOUCEMENT, U),
    validateParam(schema.id, [Announcement], 'announcementId'),
    validateBody(schema.default),
    announcementController.replace
  )
  .delete(
    passportJWT,
    authorization(ANNOUCEMENT, D),
    validateParam(schema.id, [Announcement], 'announcementId'),
    announcementController.remove
  )

router.route('/:announcementId/users')
  .get(
    passportJWT,
    authorization(),
    projectAuth(ANNOUCEMENT, R),
    validateParam(schema.id, [Announcement], 'announcementId'),
    announcementController.getUsers
  )

export default router