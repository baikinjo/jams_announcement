/**
 * controllers/trades.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

/* Models ======================================================================================= */
import Trade from '../models/trade'

const ALLOWED_QUERY = {
  'name': true,
  'page': true
}

/* Controller =================================================================================== */
/**
 * Get all trades
 */
export const index = async (req, res, next) => {
  const query = {}
  for (const key in req.query) {
    if (ALLOWED_QUERY[key]) {
      query[key] = {
        $regex : `.*${req.query[key]}.*`,
        $options : 'i'
      }
    }
  }

  const trades = await Trade.find(query)

  res.status(200).json(trades)
}

/**
 * Create new trade
 */
export const create = async (req, res, next) => {
  const newTrade = new Trade(req.value.body)
  await newTrade.save()

  res.status(201).json({ success: true, message: 'Trade Created' })
}

/**
 * Get a single trade
 */
export const get = async (req, res, next) => {
  const { tradeId } = req.value.params
  res.status(200).json(tradeId)
}

/**
 * Edit trade
 */
export const replace = async (req, res, next) => {
  const { tradeId } = req.value.params
  const newTrade = req.value.body

  Object.assign(tradeId, newTrade)
  await tradeId.save()

  res.status(200).json({ success: true, message: 'Trade updated' })
}

/**
 * Delete trade
 */
export const remove = async (req, res, next) => {
  const { tradeId } = req.value.params
  await tradeId.remove(res)
  res.status(200).json({ success: true, message: 'Trade deleted' })
}