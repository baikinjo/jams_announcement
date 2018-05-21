/**
 * controllers/concretes.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

/* Models ======================================================================================= */
import Concrete from '../models/concrete'
import Pour from '../models/pour'

/* Controller =================================================================================== */
/**
 * Get all concretes for this project
 */
export const index = async (req, res, next) => {
  const { projectId } = req.value.params
  const concretes = await Concrete.find().where('_id').in(projectId.concretes)

  res.status(200).json(concretes)
}

/**
 * Create new concrete
 */
export const create = async (req, res, next) => {
  const { projectId } = req.value.params

  const newConcrete = new Concrete(req.value.body)
  newConcrete.project = projectId._id
  await newConcrete.save()

  projectId.concretes.push(newConcrete)
  await projectId.save()

  res.status(201).json({
    success: true, message: 'Concrete Created'
  })
}

/**
 * Get concrete
 */
export const get = async (req, res, next) => {
  const { concreteId, projectId } = req.value.params
  // check if concrete exists in project
  const stringifiedProjectConcretes = JSON.stringify(projectId.concretes)
  if (!stringifiedProjectConcretes.includes(concreteId._id)) {
    return res.status(404).json({
      success: false,
      message: 'Project does not contain the concrete'
    })
  }

  res.status(200).json(concreteId)
}

/**
 * Replace concrete
 */
export const replace = async (req, res, next) => {
  const { concreteId, projectId } = req.value.params

  /** check if concrete exists in project */
  if (projectId.concretes.indexOf(concreteId._id) === -1) {
    return res.status(404).json({
      success: false,
      message: 'Project does not contain the concrete'
    })
  }

  Object.assign(concreteId, req.value.body)

  await concreteId.save()

  res.status(200).json({
    success: true,
    message: 'Concrete updated'
  })
}

/**
 * Delete concrete, checks if concrete is being used in Pours
 */
export const remove = async (req, res, next) => {
  const { concreteId, projectId } = req.value.params

  let concreteExists = false
  for (let i = 0; i < projectId.pours.length - 1; i++) {
    const pour = await Pour.findOne({_id: projectId.pours[i]})

    if (pour.concrete.equals(concreteId._id)) {
      concreteExists = true
    }
  }

  if (concreteExists) {
    return res.status(403).json({
      success: false,
      message: 'There is pour(s) that uses this concrete'
    })
  } else {
    await concreteId.remove(res)
    // Remove concrete from project
    projectId.concretes.pull(concreteId._id)
    await projectId.save()

    res.status(200).json({ success: true, message: 'Concrete deleted' })
  }
}