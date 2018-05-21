/**
 * controllers/permission-sets.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

/* Models ======================================================================================= */
import PermissionSet from '../models/permission-set'
import User from '../models/user'

/**
 * Get all permissionSets
 */
export const index = async (req, res, next) => {
  const permissionSets = await PermissionSet.find({})
  res.status(200).json(permissionSets)
}

/**
 * Create new permissionSet
 */
export const create = async (req, res, next) => {
  const newPermissionSet = new PermissionSet(req.value.body)
  await newPermissionSet.save()

  res.status(201).json({
    success: true,
    message: 'Permission Set Created'
  })
}

/**
 * Get a single permissionSet
 */
export const get = async (req, res, next) => {
  const { permissionSetId } = req.value.params

  res.status(200).json(permissionSetId)
}

/**
 * Edit permissionSet
 */
export const replace = async (req, res, next) => {
  const { permissionSetId } = req.value.params
  const newPermissionSet = req.value.body

  Object.assign(permissionSetId, newPermissionSet)

  await permissionSetId.save()

  res.status(200).json({
    success: true,
    message: 'PermissionSet updated'
  })
}

/**
 * Delete permissionSet
 */
export const remove = async (req, res, next) => {
  const { permissionSetId } = req.value.params

  /** Check Users for any pSet uses */
  const foundUsers = await User.find({
    projectPermissions: {
      $elemMatch: {
        permissionSet: permissionSetId._id
      }
    }
  })

  if (foundUsers.length) {
    return res.status(403).json({
      success: false,
      message: 'This permission set is being used by Users'
    })
  }

  await permissionSetId.remove()
  res.status(200).json({
    success: true,
    message: 'Permission Set deleted'
  })
}