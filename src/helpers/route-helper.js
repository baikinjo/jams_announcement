/**
 * helpers/route-helper.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import Joi from 'joi'
import _ from 'lodash'
import Project from '../models/project'
import Announcement from '../models/announcement'
import { PERMISSIONS } from '../helpers/common'

/**
 * Validate if values in array are unique
 * @param {*} arr Array to check
 * @param {*} key key if item in array is an object
 */
export const unique = (arr, key) => {
  const buffer = Object.create(null)

  for (let i = 0; i < arr.length; ++i) {
	  let value
    if (key) {
  		value = arr[i][key]
    } else {
	  	value = arr[i]
    }

    if (value in buffer) {
      return false
    }

    buffer[value] = true
  }

  return true
}

/**
 * Checks contact and trade permissionns. If no argument is given, it checks if role is ADMIN
 */
export const authorization = (model = '', permission = '') => {
  return (req, res, next) => {

    if (!req.user.role.includes('ADMIN')) {
      return res.status(401).json({ success: false, message: 'Unauthorized' })
    }

    next()
  }
}

export const announcementAuth = (model = null, permission = null) => {
  return async (req, res, next) => {
    const user = req.user

    const { announcementId } = req.params

    if ( user.role.includes('ADMIN')) {
      next()
      return
    }

    if (announcementId) {
      const announcement = await Announcement.findById(req.params.announcementId).populate('project')
      if(!announcement.project) {
        next()
        return
      }
      const exists = announcement.project.personnels.find(personnel => {
        return personnel.value.user.toString() === user._id.toString()
      })

      if (!exists) {
        return res.status(401).json({ success: false, message: 'No announcement permission assigned' })
      }
    }

    if (permission & PERMISSIONS[user.position][model]) {
      next()
    } else {
      return res.status(401).json({ success: false, message: 'No permission to this announcement' })
    }

  }
}

/**
 * Checks if user has permission to a specific project
 */
export const projectAuth = (model = null, permission = null) => {
  return async (req, res, next) => {
    /** Check if admin or has permission */

    const user = req.user
    const { projectId } = req.params

    if (user.role.includes('ADMIN')) {
      next()
      return
    }

    if (projectId) {
      const project = await Project.findById(req.params.projectId)
      const exists = project.personnels.find(personnel => {
        return personnel.value.user.toString() === user._id.toString()
      })

      if (!exists) {
        return res.status(401).json({ success: false, message: 'No permission to this project' })
      }
    }

    if (permission & PERMISSIONS[user.position][model]) {
      next()
    } else {
      return res.status(401).json({ success: false, message: 'No permission to this project' })
    }

    // if ( W & PERSONNEL_POSITION[user.position][model] ) {
    //   next()
    // } else {

    // }

    // next()

    // if (model === 'project' && permission.W) {
    //   /** If trying to read a project just check if there's a permission object for the project */

    //   const sets = req.user.projectPermissions.map(perm => {
    //     /** find matching project */
    //     if (perm.project === req.params['projectId']) {
    //       return perm
    //     }
    //   })

    //   /** If there isn't a permission */
    //   if (!sets.length) {
    //     return res.status(401).json({ success: false, message: 'No permission to this project' })
    //   }

    //   /** If permission has expired */
    //   if (sets[0].expiry) {
    //     if (new Date().toISOString() > sets[0].expiry) {
    //       return res.status(401).json({ success: false, message: 'Permission has Expired' })
    //     }
    //   }

    //   next()
    // } else {
    //   /** Make array of permission with matching projectId */
    //   const sets = req.user.projectPermissions.map(perm => {
    //     if (perm.value.project === req.params['projectId']) {
    //       return perm
    //     }
    //   })

    //   /** If no permisison for project */
    //   if (!sets.length) {
    //     return res.status(401).json({ success: false, message: 'Unauthorized' })
    //   }

    //   /** If permission has expired */
    //   if (sets[0] && sets[0].value.expiry) {
    //     if (new Date().toISOString() > sets[0].value.expiry) {
    //       return res.status(401).json({ success: false, message: 'Permission has Expired' })
    //     }
    //   }

    //   /** If requested permission exists */
    //   if (sets[0] && !sets[0].value.permissionSet[model][permission]) {
    //     return res.status(401).json({ success: false, message: 'Unauthorized' })
    //   }

    //   next()
    // }
  }
}

/**
 * Validate post body
 */
export const validateBody = schema => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema)

    if (result.error) {
      return res.status(400).json(result.error)
    }

    if (!req.value) { req.value = {} }
    req.value['body'] = result.value
    next()
  }
}

/**
 * Validate paramteters
 * @param {*} schema format to match using Joi
 * @param {*} models array of corresponding models for each paramater in order
 * @param {*} names a string with name of params separated by a space in order
 */
export const validateParam = (schema, models, names) => {
  return async (req, res, next) => {
    const result = names.split(' ')

    result.forEach(function (name) {
      const result = Joi.validate({ param: req.params[name] }, schema)
      if (result.error) {
        return res.status(400).json(result.error)
      }

      if (!req.value) { req.value = {} }
      if (!req.value.params) { req.value.params = {}}

      req.value.params[name] = result.value.param
    })

    if (req.value) {
      const params = _.values(req.value.params)

      for (let i = 0; i < params.length; ++i) {
        const obj = await models[i].findById(params[i])
        req.value.params[result[i]] = obj

        if (!obj) {
          return res.status(200).json({ success: false, message: `invalid ${result[i]}` })
        }
      }
    }

    next()
  }
}