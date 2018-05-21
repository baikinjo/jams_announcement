/**
 * controllers/concrete-addons.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *
 * @flow
 */
import type { $Request, $Response } from 'express'

/* Models ======================================================================================= */
import Pour from '../models/pour'
import ConcreteAddon from '../models/concrete-addon'

/* Controller =================================================================================== */
/**
 * Get all concreteAddons
 */
export const index = async (req: $Request, res: $Response) => {
  const { projectId } = req.value.params
  const concreteAddons = await ConcreteAddon.find().where('_id').in(projectId.concreteAddons)

  res.status(200).json(concreteAddons)
}

/**
 * Create new concreteAddon, adds to Project.concreteAddons
 *
 * See models/project
 */
export const create = async (req: $Request, res: $Response) => {
  const { projectId } = req.value.params

  const newConcreteAddon = new ConcreteAddon(req.value.body)
  projectId.concreteAddons.push(newConcreteAddon)

  await newConcreteAddon.save()
  await projectId.save()

  res.status(201).json({
    success: true,
    message: 'Concrete Addon Created'
  })
}

/** Get concreteAddon */
export const get = async (req: $Request, res: $Response) => {
  const { concreteAddonId, projectId } = req.value.params

  /** check if concrete exists in project */
  if (projectId.concreteAddons.indexOf(concreteAddonId._id) === -1) {
    return res.status(404).json({
      success: false,
      message: 'Project does not contain the concrete addon'
    })
  }

  res.status(200).json(concreteAddonId)
}

/** Replace concreteAddon */
export const replace = async (req: $Request, res: $Response) => {
  const { concreteAddonId, projectId } = req.value.params

  /** check if concrete exists in project */
  if (projectId.concreteAddons.indexOf(concreteAddonId._id) === -1) {
    return res.status(404).json({
      success: false,
      message: 'Project does not contain the concrete addon'
    })
  }

  Object.assign(concreteAddonId, req.value.body)

  await concreteAddonId.save()

  res.status(200).json({
    success: true,
    message: 'ConcreteAddon updated'
  })
}

/**
 * Delete concreteAddon, checks if concreteAddon is being used in Pours
 */
export const remove = async (req: $Request, res: $Response) => {
  const { concreteAddonId, projectId } = req.value.params

  if (projectId.concreteAddons.indexOf(concreteAddonId._id) === -1) {
    return res.status(404).json({
      success: false,
      message: 'Project does not contain the concrete addon'
    })
  }

  /** Check if there is pour with this concreteAddon */
  let concreteAddonExists = false
  for (let i = 0; i < projectId.pours.length - 1; i++) {
    const pour = await Pour.findOne({_id: projectId.pours[i]})

    for (let j = 0; j < pour.addons.length - 1; j++) {
      const addon = pour.addons[j]

      switch (addon.type) {
      case 'concrete':
        if (addon.value.addon.equals(concreteAddonId._id)) {
          concreteAddonExists = true

          break
        }
        break
      case 'concreteGroup':
        for (let k = 0; k < addon.usedAddons.length - 1; k++) {
          const groupAddon = addon.usedAddons[k]

          if (groupAddon.value.addon.equals(concreteAddonId._id)) {
            concreteAddonExists = true
            break
          }
        }
        break
      }
    }
  }

  if (concreteAddonExists) {
    return res.status(403).json({
      success: false,
      message: 'There is pour(s) that uses this concrete addon'
    })
  } else {
    await concreteAddonId.remove(res)

    /** Remove concreteAddon from project */
    projectId.concreteAddons.pull(concreteAddonId)
    await projectId.save()

    res.status(200).json({ success: true, message: 'ConcreteAddon deleted' })
  }
}