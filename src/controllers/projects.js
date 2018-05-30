/**
 * controllers/projects.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

/* Models ======================================================================================= */
import Concrete from '../models/concrete'
import ConcreteAddon from '../models/concrete-addon'
import Pour from '../models/pour'
import Project from '../models/project'

/* Controller =================================================================================== */
/**
 * Get all projects
 */
export const index = async (req, res, next) => {
  let projects = []

  /** If admin return all */
  if (req.user.role.includes('ADMIN')) {
    projects = await Project.find({}).populate('concreteProviderContact trades.trade trades.children.trade users.user')
  } else {
    /** Get only projects with permission */
    projects = await Project.find({ 'personnels.value.user': req.user._id })
  }
  console.log(projects.length)
  res.status(200).json(projects)
}

export const findUser = async (req, res, next) => {
  const projects = []

  await Project.find({}).exec((err, items) => {
    if(err) console.log(err)
    items.map((item) => {
      if(item.users.length > 0) {
        projects.push(item)
      }
    })
  })
  console.log(projects.length)
  res.status(200).json(projects)
}

/**
 * Create new project
 */
export const create = async (req, res, next) => {
  const newProject = new Project(req.value.body)

  await newProject.save()

  res.status(201).json({
    success: true,
    message: 'Project Created'
  })
}

/**
 * Get a single project
 */
export const get = async (req, res, next) => {
  const foundProject = await Project.findById(req.value.params.projectId._id).populate('concreteProviderContact pours trades.trade trades.children.trade users.user subtrades.value.trade subtrades.value.subtrades.value.trade personnels.value.user')

  res.status(200).json(foundProject)
}

/**
 * Edit a project
 */
export const replace = async (req, res, next) => {
  const { projectId } = req.value.params
  const newProject = req.value.body

  Object.assign(projectId, newProject)

  await projectId.save()

  res.status(200).json({
    success: true,
    message: 'Project updated'
  })
}

/**
 * Delete project
 */
export const remove = async (req, res, next) => {
  const { projectId } = req.value.params

  await projectId.remove(res)
  res.status(200).json({ success: true, message: 'Project deleted' })
}

/**
 * Concrete analysis
 */
export const analyzePour = async (req, res, next) => {
  const { projectId } = req.value.params
  const foundConcretes = await Concrete.find().where('_id').in(projectId.concretes).lean()
  const foundPours = await Pour.find().where('_id').in(projectId.pours).lean()
  const concretes = {}

  foundPours.forEach(pour => {
    foundConcretes.forEach(concrete => {
      if (!concretes[concrete._id]) {
        concretes[concrete._id] = concrete
      }

      if (concretes[concrete._id].amount === undefined) {
        concretes[concrete._id].amount = 0
      }

      if (pour.concrete.toString() === concretes[concrete._id]._id) {
        concretes[concrete._id].amount += parseFloat(pour.pourAmount)
      }
    })
  })

  res.status(200).json(Object.keys(concretes).map(key => concretes[key]))
}

export const analyzeTotalPours = async (req, res, next) => {
  const { projectId } = req.value.params
  const foundConcretes = await Concrete.find().where('_id').in(projectId.concretes).lean()
  const foundAddons = await ConcreteAddon.find().where('_id').in(projectId.concreteAddons).lean()
  const foundPours = await Pour.find().where('_id').in(projectId.pours).populate('concrete addons.value.addon addons.value.addons.value.addon').lean()
  let concretes = {}
  let addons = {}

  foundConcretes.forEach(concrete => {
    if (!concretes[concrete._id]) {
      concretes[concrete._id] = concrete
    }

    if (concretes[concrete._id].amount === undefined) {
      concretes[concrete._id].amount = 0
    }

    // console.log(foundPours)
    foundPours.forEach(pour => {
      if (concretes[concrete._id]._id.equals(pour.concrete._id)) {
        concretes[concrete._id].amount += parseFloat(pour.pourAmount)
      }
    })
  })

  // console.log(concretes)

  foundPours.forEach(pour => {
    pour.addons.map(addon => {
      switch(addon.type) {
      case 'otf': {
        if (addons.otf === undefined) {
          addons.otf = {
            type: 'otf',
            cost: addon.value.cost,
            value: {
              addon: {
                name: 'OTF'
              }
            }
          }
        } else {
          addons.otf.cost += addon.value.cost
        }

        break
      }
      case 'concrete': {
        let pourAmount = pour.pourAmount

        if (addon.value.addon) {
          switch (addon.value.addon.uom) {
          case 'Loads':
          case 'Trucks':
            pourAmount = pour.trucks
          }

          if (addons[addon.value.addon._id] === undefined) {

            addons[addon.value.addon._id] = {
              ...addon,
              amount: pourAmount,
              cost: pourAmount * addon.value.addon.cost,
            }
          } else {
            addons[addon.value.addon._id].amount += pourAmount
            addons[addon.value.addon._id].cost += pourAmount * addon.value.addon.cost
          }
        }
        break
      }
      case 'concreteGroup': {
        addon.value.addons.map(groupAddon => {
          if (addons[groupAddon.value.addon._id] === undefined) {
            addons[groupAddon.value.addon._id] = {
              ...groupAddon,
              amount: addon.value.pourAmount,
              cost: addon.value.pourAmount * groupAddon.value.addon.cost
            }
          } else {
            addons[groupAddon.value.addon._id].amount += addon.value.pourAmount
            addons[groupAddon.value.addon._id].cost += addon.value.pourAmount * groupAddon.value.addon.cost
          }
        })

        break
      }
      }
    })
  })

  foundAddons.forEach(addon => {
    if (!addons[addon._id]) {
      addons[addon._id] = {
        value: {
          addon
        },
        amount: 0,
        cost: 0
      }
    }
  })

  concretes = Object.keys(concretes).map(key => concretes[key])
  addons = Object.keys(addons).map(key => addons[key])

  concretes = concretes.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    } else {
      return -1
    }
  })

  addons = addons.sort((a, b) => {
    const aName = a.value.addon.name
    const bName = b.value.addon.name

    if (aName > bName) {
      return 1
    } else {
      return -1
    }
  })

  res.status(200).json({
    concretes,
    addons
  })
}