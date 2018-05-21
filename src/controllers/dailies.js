/**
 * controllers/dailies.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

/* Models ======================================================================================= */
import Daily from '../models/daily'
import Pour from '../models/pour'
import Trade from '../models/trade'

/* Controller =================================================================================== */
/**
 * Get all dailies for user
 */
export const index = async (req, res, next) => {
  const { projectId } = req.value.params

  const dailies = await Daily.find().where('_id').in(projectId.dailies).populate('trades.value.trade trades.value.subtrades.value.trade createdBy personnels.value.user createdBy').sort({date: -1})

  res.status(200).json(dailies)
}

/**
 * Create new daily
 */
export const create = async (req, res, next) => {
  const { projectId } = req.value.params
  const newDaily = new Daily(req.value.body)

  newDaily.createdBy = req.user._id
  newDaily.project = projectId._id

  /** Check if trade exists */
  for (const trade of newDaily.trades) {
    const foundTrade = await Trade.findById(trade.value.trade)
    if (!foundTrade) {
      return res.status(404).json({
        success: false,
        message: 'Trade not found'
      })
    }
  }

  await newDaily.save()

  projectId.dailies.push(newDaily)
  await projectId.save()

  res.status(201).json({ success: true, message: 'Daily Created' })
}

/**
 * Get daily
 */
export const get = async (req, res, next) => {
  const { dailyId } = req.value.params
  // eslint-disable-next-line handle-callback-err
  const foundDaily = await Daily.findById(dailyId).populate('personnels.value.user trades.value.trade trades.value.subtrades.value.trade createdBy').exec((err, daily) => {
    delete daily.createdBy.password
  })

  res.status(200).json(foundDaily)
}

/**
 * Replace daily
 */
export const replace = async (req, res, next) => {
  const { dailyId } = req.value.params
  const newDaily = req.value.body

  Object.assign(dailyId, newDaily)

  await dailyId.save()

  res.status(200).json({ success: true, message: 'Daily updated' })
}

/**
 * Delete daily
 */
export const remove = async (req, res, next) => {
  const { dailyId } = req.value.params

  await dailyId.remove()
  res.status(200).json({ success: true, message: 'Daily deleted' })
}

/**
 * Get pours for dailies
 */
export const getPours = async (req, res, next) => {
  const { projectId, dailyId } = req.value.params

  const fromDate = new Date(dailyId.date)
  fromDate.setHours(0)
  fromDate.setMinutes(0)
  fromDate.setSeconds(0)

  const toDate = new Date(fromDate)
  toDate.setDate(fromDate.getDate() + 1)

  const pours = await Pour.find({
    pourDate: {
      '$gte': fromDate,
      '$lt': toDate
    }
  }).where('_id').in(projectId.pours).sort({date: -1})

  res.status(200).json(pours)
}