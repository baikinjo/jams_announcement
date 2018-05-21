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
import Project from '../models/project'
import Daily from '../models/daily'
import Pour from '../models/pour'

/**
 * Get all permissionSets
 */
export const index = async (req, res, next) => {
  const { from, to } = req.params

  const pours = await Pour.find({
    createdAt: {
      $lt: from,
      $gte: to
    }
  }).populate('createdBy concrete')

  const dailies = await Daily.find({
    createdAt: {
      $lt: from,
      $gte: to
    }
  }).populate('createdBy')
  const items = []

  await Promise.all(pours.map(async (pour) => {
    const project = await Project.find({ pours: { '$in' : [pour._id] } })

    if (project.length !== 0) {
      const _pour = { ...pour._doc }
      _pour.type = 'pour'
      _pour.project = {
        _id: project[0]._id,
        name: project[0].name
      }
      items.push(_pour)
    }
  }))

  await Promise.all(dailies.map(async (daily) => {
    const project = await Project.find({ dailies: { '$in' : [daily._id] } })
    if (project.length !== 0) {
      const _daily = { ...daily._doc }
      _daily.type = 'daily'
      _daily.project = {
        _id: project[0]._id,
        name: project[0].name
      }

      items.push(_daily)
    }
  }))

  // console.log(items)
  items.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  let tempName = ''
  let tempRight = true
  const categorizedByDate = {}
  items.map(item => {
    item.right = tempRight

    if (tempName !== item.project.name) {
      tempRight = !tempRight
      item.right = tempRight
    }

    tempName = item.project.name

    const createdAt = new Date(item.createdAt)
    const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`

    if (categorizedByDate[key]) {
      categorizedByDate[key].push(item)
    } else {
      categorizedByDate[key] = [item]
    }

    return item
  })

  res.status(200).json(Object.keys(categorizedByDate).map(i => {
    const tempObject = {}
    tempObject[i] = categorizedByDate[i]
    return tempObject
  }))
}