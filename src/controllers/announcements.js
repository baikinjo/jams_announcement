/**
 * controllers/projects.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *  Injo Baik, ibaik@ventanaconstruction.com
 */

/* Models ======================================================================================= */
import Announcement from '../models/announcement'

/* Controller =================================================================================== */
/**
 * Get all announcements
 */
export const index = async (req, res, next) => {
  let announcements = []

  switch(req.user.role) {
  case 'ADMIN':
    announcements = await Announcement.find({}).populate('createdBy')
    break
  default:
    await Announcement.find({}).populate('project').exec((err, items) => {
      if(err) return res.json({status: 500, error: err})
      items.map((item) => {
        if(!item.project) {
          announcements.push(item)
        } else {
          item.project.personnels.map((person) => {
            if(person.value.user.toString() === req.user._id.toString()) {
              announcements.push(item)
            }
          })
        }
      })
    })
  }
  res.status(200).json(announcements)
}

/**
 * Create new announcements
 */
export const create = async (req, res, next) => {
  const newAnnouncement = new Announcement(req.body)

  newAnnouncement.createdBy = req.user._id

  await newAnnouncement.save()

  res.status(201).json({
    success: true,
    message: 'Announcement Created',
    id: newAnnouncement._id
  })
}

/**
 * Get a single announcements
 */
export const get = async (req, res, next) => {
  const reader = req.user

  const { announcementId } = req.value.params
  // eslint-disable-next-line handle-callback-err
  const foundAnnouncement = await Announcement.findById(announcementId).populate('createdBy project').exec((err, announcement) => {
    delete announcement.createdBy.password
  })

  const foundReader = await Announcement.findOne(
    { _id:foundAnnouncement._id },
    { checked: { $elemMatch: { reader: { $in: reader._id } } } }
  )

  if(foundReader.checked.length === 0){
    await Announcement.update(
      { _id: foundAnnouncement._id },
      { $push: { checked: { reader } } }
    )
  }else{
    await Announcement.update(
      { _id: foundAnnouncement._id, 'checked.reader': reader },
      { $set: { 'checked.$.readAt': new Date().toISOString() } }
    )
  }
  res.status(200).json(foundAnnouncement)
}

/**
 * Edit a announcements
 */
export const replace = async (req, res, next) => {
  const { announcementId } = req.value.params
  const newAnnouncement = req.body

  Object.assign(announcementId, newAnnouncement)

  await announcementId.save()

  res.status(200).json({
    success: true,
    message: 'Announcement updated'
  })
}

/**
 * Delete announcements
 */
export const remove = async (req, res, next) => {
  const { announcementId } = req.value.params

  await announcementId.remove(res)
  res.status(200).json({ success: true, message: 'Announcement deleted' })
}

/**
 * Get all the list of users who read the post
 */
export const getUsers = async (req, res, next) => {
  const { announcementId } = req.value.params

  const foundAnnouncement = await Announcement.findById(announcementId).populate('checked')

  res.status(200).json(foundAnnouncement.checked)
}

export const projectAnnouncements = async (req, res, next) => {
  let announcements = []
  const projectId = req.params.projectId

  announcements = await Announcement.find({ project: projectId })

  res.status(200).json(announcements)
}