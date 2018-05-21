/**
 * controllers/contacts.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 *
 */

/* Models ======================================================================================= */
import Contact from '../models/contact'
import Trade from '../models/trade'

/* Controller =================================================================================== */
/**
 * Get all contacts
 */
export const index = async (req, res, next) => {
  const contacts = await Contact.find({}).populate('trade')
  res.status(200).json(contacts)
}

/**
 * Create new contact
 */
export const create = async (req, res, next) => {
  /** check if trade actually exists */
  const foundTrade = await Trade.findById(req.value.body.trade)
  if (!foundTrade) {
    return res.status(404).json({
      success: false,
      message: 'Trade not found'
    })
  }

  const newContact = new Contact(req.value.body)
  await newContact.save()

  res.status(201).json({ success: true, message: 'Contact Created' })
}

/**
 * Get a single contact
 */
export const get = async (req, res, next) => {
  const { contactId } = req.value.params

  res.status(200).json(contactId)
}

/**
 * Replace contact
 */
export const replace = async (req, res, next) => {
  const { contactId } = req.value.params

  /** check if trade actually exists */
  const foundTrade = await Trade.findById(req.value.body.trade)
  if (!foundTrade) {
    return res.status(404).json({
      success: false,
      message: 'Trade not found'
    })
  }

  const newContact = req.value.body
  Object.assign(contactId, newContact)

  await contactId.save()

  res.status(200).json({ success: true, message: 'Contact updated' })
}

/**
 * Delete contact
 */
export const remove = async (req, res, next) => {
  const { contactId } = req.value.params

  await contactId.remove(res)
  res.status(200).json({ success: true, message: 'Contact deleted' })
}