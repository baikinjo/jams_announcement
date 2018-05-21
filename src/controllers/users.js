/**
 * controllers/users.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */
import JWT  from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import sgTransport from 'nodemailer-sendgrid-transport'

/* Config ======================================================================================= */
import config from 'config'

/* Models ======================================================================================= */
import User from '../models/user'

/* Constants ==================================================================================== */
/* Sendgrid Configuration Settings */
const client = nodemailer.createTransport(sgTransport({
  auth: {
    api_user: 'VentanaCC', // Sendgrid username
    api_key: '3n7M1KokLsjwZjQ' // Sendgrid password
  }
}))
/* End Sendgrid Configuration Settings */

const signToken = user => {
  // Respond with token
  return JWT.sign(
    {
      userId: user.id,
      email: user.email,
      position: user.position,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      projectPermissions: user.projectPermissions,
      tradePermission: user.tradePermission
    },
    config.secret,
    {
      expiresIn: '24h'
    }
  )
}

const signResetToken = user => {
  // Respond with token
  return JWT.sign({
    userId: user.id,
    email: user.email,
    position: user.position,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    projectPermissions: user.projectPermissions,
    tradePermission: user.tradePermission
  }, config.secret, { expiresIn: '24h' })
}

/* Controllers ================================================================================== */
/**
 * Get all users
 */
export const index = async (req, res, next) => {

  /** Delete password first */
  const users = await User.find({}).exec((err, users) => {
    if (err) {
      return res.status(500).json({
        success: 'false',
        message: 'Error while getting users'
      })
    }
    users.map((user) => {
      delete user.password
      return user
    })
  })
  res.status(200).json(users)
}

/**
 * Create a new User and send email to set password
 */
export const create = async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    phone,
    position,
    projectPermissions,
    role,
    tradePermission
  } = req.value.body

  /** Check if there is a user with the same email */
  const foundUser = await User.findOne({ email })
  if (foundUser) {
    return res.status(403).json({
      success: false,
      message: 'Email is already in use'
    })
  }

  /** Create a new User */
  const newUser = new User({
    email,
    firstName,
    lastName,
    phone,
    position,
    projectPermissions,
    role,
    tradePermission
  })

  /** Generate resetToken */
  newUser.resetToken = signResetToken(newUser)
  await newUser.save()

  /** Create e-mail object to send to user */
  const resetEmail = {
    from: 'JAMs, jams@ventanaconstruction.com',
    to: newUser.email,
    subject: 'Password Setup',
    text: `Hello ${newUser.firstName}, Welcome to JAMs. Please click on the link below to setup your password:<br><br><a href="${process.env.URL}reset-password?token=${newUser.resetToken}&setup=1`,
    html: `Hello <strong>${newUser.firstName}</strong>,<br><br>Please click on the link below to setup your password:<br><br><a href="${process.env.URL}reset-password?token=${newUser.resetToken}&setup=1">Password Setup</a>`
  }

  await client.sendMail(resetEmail)

  res.status(201).json({
    success: true,
    message: 'User registered'
  })
}

/**
 * Get a signle user
 */
export const get = async (req, res, next) => {
  const { userId } =  req.value.params
  /** should only return needed params */
  const foundUser = await User.findById(userId).select('email position phone role projectPermissions firstName lastName tradePermission').populate('projectPermissions.value.project projectPermissions.value.permissionSet')

  if (!foundUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    })
  }

  res.status(200).json(foundUser)
}

/**
 * needs to be split into 2 different routes
 */
export const replace = async (req, res, next) => {
  const { userId } = req.value.params
  const newUser = req.value.body

  Object.assign(userId, newUser)
  await userId.save()

  res.status(200).json({ success: true, message: 'User updated' })
}

/**
 * Delete an existing user
 */
export const remove = async (req, res, next) => {
  const { userId } = req.value.params

  await userId.remove(res)
  res.status(200).json({ success: true, message: 'User deleted' })
}

/**
 * Sigin
 */
export const signIn = async (req, res, next) => {
  // Generate token
  const token = signToken(req.user)
  const foundUser = await User.findById(req.user._id)

  foundUser.recentLogin = new Date().toISOString()
  foundUser.save()
  res.status(200).json({ token })
}

/**
 * Send email with resetToken
 */
export const sendPasswordReset = async (req, res)  => {
  const { email } = req.value.body

  /** Check if there is a user with the same email */
  const foundUser = await User.findOne({ email })
  if (!foundUser) {
    res.status(404).json({ success: false, message: 'User with a matching email not found' })
  }

  if (!foundUser.active) {
    res.status(400).json({ success: false, message: 'account not active' })
  }

  /** Generate resetToken */
  foundUser.resetToken = signResetToken(foundUser)
  await foundUser.save()

  /**
   * Create e-mail object to send to user
   * need to create a seperate config json for url redirect
   */
  const resetEmail = {
    from: 'JAMs, jams@ventanaconstruction.com',
    to: foundUser.email,
    subject: 'Reset Password Request',
    text: `Hello ${foundUser.firstName}, <br>Please click on the link below to reset your password:<br><br><a href="${process.env.URL}reset-password?token=${foundUser.resetToken}`,
    html: `Hello <strong>${foundUser.firstName}</strong>,<br><br>Please click on the link below to reset your password:<br><br><a href="${process.env.URL}reset-password?token=${foundUser.resetToken}">Reset Password</a>`
  }

  await client.sendMail(resetEmail)
  res.status(200).json({ success: true, message: 'Please check your e-mail for password reset link!', token: foundUser.resetToken })
}

/**
 * Send email with resetToken
 */
export const sendPasswordRequest = async (req, res)  => {
  const { email, phone } = req.value.body

  /** Check if there is a user with the same email */
  const foundUser = await User.findOne({ email, phone })
  if (!foundUser) {
    const resetEmail = {
      from: 'JAMs, jams@ventanaconstruction.com',
      to: 'mnam@ventanaconstruction.com',
      subject: 'Reset Password Request',
      text: `Email: ${email} Phone: ${phone}`,
    }

    await client.sendMail(resetEmail)
    res.status(404).json({ success: false, message: 'We could not find you in our system. One of our administrator will be in contact.' })
  }

  /** Generate resetToken */
  foundUser.resetToken = signResetToken(foundUser)
  await foundUser.save()

  /**
   * Create e-mail object to send to user
   * need to create a seperate config json for url redirect
   */
  const resetEmail = {
    from: 'JAMs, jams@ventanaconstruction.com',
    to: foundUser.email,
    subject: 'Reset Password Request',
    text: `Hello ${foundUser.firstName}, <br>Please click on the link below to reset your password:<br><br><a href="${process.env.URL}reset-password?token=${foundUser.resetToken}`,
    html: `Hello <strong>${foundUser.firstName}</strong>,<br><br>Please click on the link below to reset your password:<br><br><a href="${process.env.URL}reset-password?token=${foundUser.resetToken}">Reset Password</a>`
  }

  await client.sendMail(resetEmail)
  res.status(200).json({ success: true, message: 'Please check your e-mail for password reset link', token: foundUser.resetToken })
}

/* Reset password with new password */
export const resetPassword = async (req, res) => {
  const {
    resetToken,
    password,
    passwordConfirm
  } = req.value.body

  if (password !== passwordConfirm) {
    res.status(400).json({ success: false, message: 'Password does not match' })
    return
  }

  /** Check if user exists */
  const foundUser = await User.findOne({ resetToken: resetToken })
  if (!foundUser) {
    res.status(400).json({ success: false, message: 'Password link has expired' })
    return
  }

  /** empty out the resetToken so it can't be reused */
  await User.update({ resetToken: resetToken }, { resetToken: false })

  /** verify token to validate access to endpoint */
  await JWT.verify(resetToken, config.secret)

  /** change password to new value */
  foundUser.password = password
  await foundUser.save()

  res.status(200).json({ success: true, message: 'Password Reset Successful' })
}