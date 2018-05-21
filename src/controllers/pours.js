/**
 * controllers/pours.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

/* Models ======================================================================================= */
import Pour  from '../models/pour'
import User  from '../models/user'
import Concrete  from '../models/concrete'

/* Controller =================================================================================== */
/**
 * Get all pours for project
 */
export const index = async (req, res, next) => {
  const pours = await Pour.find().where('_id').in(req.value.params.projectId.pours).sort({pourDate: -1})

  res.status(200).json(pours)
}

/**
 * Create new pour
 */
export const create = async (req, res, next) => {
  const { projectId } = req.value.params

  /** Check if concrete actually exists */
  const foundConcrete = await Concrete.findById(req.value.body.concrete)
  if (!foundConcrete) {
    return res.status(404).json({
      success: false,
      message: 'Concrete not found'
    })
  }

  /** Save new pour */
  const newPour = new Pour(req.value.body)
  newPour.createdBy = req.user._id
  await newPour.save()

  /** Push new pour into project's pour array */
  projectId.pours.push(newPour)
  await projectId.save()

  /** push new pour into user's createdPour array */
  req.user.createdPours.push(newPour)
  await req.user.save()

  res.status(201).json({ success: true, message: 'Pour Created' })
}

/**
 * Get a signle pour
 */
export const get = async (req, res, next) => {
  const { pourId, projectId } = req.value.params

  /** check if pour exists in project */
  const stringifiedProjectPours = JSON.stringify(projectId.pours)

  if (!stringifiedProjectPours.includes(pourId._id)) {
    return res.status(404).json({
      success: false,
      message: 'Project does not contain the pour'
    })
  }

  const foundPour = await Pour.findById(pourId).populate('concrete addons.value.addon addons.value.addons.value.addon')
  res.status(200).json(foundPour)
}

/**
 * Replace pour
 */
export const replace = async (req, res, next) => {
  const { pourId, projectId } = req.value.params

  /** check if pour exists in project */
  const stringifiedProjectPours = JSON.stringify(projectId.pours)
  if (!stringifiedProjectPours.includes(pourId._id)) {
    return res.status(404).json({
      success: false,
      message: 'Project does not contain the pour'
    })
  }

  const newPour = req.value.body

  Object.assign(pourId, newPour)

  await pourId.save()

  res.status(200).json({ success: true, message: 'Pour updated' })
}

/**
 * Delete pour
 */
export const remove = async (req, res, next) => {
  const { pourId, projectId } = req.value.params

  /** check if pour exists in project */
  const stringifiedProjectPours = JSON.stringify(projectId.pours)
  if (!stringifiedProjectPours.includes(pourId._id)) {
    return res.status(404).json({
      success: false,
      message: 'Project does not contain the pour'
    })
  }

  /** Check if user exists */
  const foundUser = await User.findById(pourId.user)
  if (foundUser) {
    foundUser.createdPours.pull(pourId._id)
    await foundUser.save()
  }

  await pourId.remove()
  /** Remove pour from project */
  projectId.pours.pull(pourId._id)

  await projectId.save()

  res.status(200).json({ success: true, message: 'Pour deleted' })
}