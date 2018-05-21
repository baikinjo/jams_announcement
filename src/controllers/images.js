/**
 * controllers/images.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */

import fs from 'fs'
import mkdirp from 'mkdirp'
import multer from 'multer'
import path from 'path'
import rimraf from 'rimraf'
import sharp from 'sharp'
import shell from 'shelljs'
import url from 'url'

/* Helpers ====================================================================================== */
import { PROJECTS, DAILIES } from '../helpers/common'

/* Constants ==================================================================================== */
const TEMPATH = './public/uploads/temp'

/* Controllers ================================================================================== */
export const compressImage = (req, file, cb) => {
  /** Allowed ext */
  const filetypes = /jpg|jpeg|png/
  /** Check ext */
  const extname = filetypes.test(file.originalname.toLowerCase())
  /** Check mimetype */
  const mimetype = filetypes.test(file.mimetype)
  if (!mimetype || !extname) {
    return cb(new Error('Only image files are allowed!'), false)
  }

  cb(null, true)
}

/**
 * Save images in ./public/uploads/temp
 */
export const upload = async (req, res, next) => {
  const tempStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `${TEMPATH}/${req.user.email}-${req.body.session}`
      mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
      cb(null, `IMG_${Date.now()}${path.extname(file.originalname)}`)
    }
  })

  const upload = multer({
    storage: tempStorage,
    limits: { fileSize: 25000000 }
  }).array('file', 8)

  upload(req, res, err => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.code
      })
    } else {
      if (!req.files.length) {
        res.status(400).json({
          success: false,
          message: 'No File Selected'
        })
      }

      res.status(200).json({
        success: true,
        files: req.files
      })
    }
  })
}

/**
 * Delete temp images
 */
export const deleteTemp = async (req, res, next) => {
  rimraf(`${TEMPATH}/${req.user.email}-${req.body.session}`, (err) => {
    if (err) {
      res.status(400).json({ success: false, message: 'Error delete temp folder' })
    }

    res.status(200).json({ success: true })
  })
}

/**
 * move images from temp to proper location
 * Request body needs
 *
 * @files: array of objects with pathand filename data
 * return: the array of paths for files
*/
export const save = async (req, res, next) => {
  const fullUrl = url.parse(req.header('referer'), true)
  const pathname = fullUrl.pathname.split('/')
  let dir = false

  if (!pathname[1]) {
    return new Error('Invalid pathname 1')
  } else if (pathname[1] !== PROJECTS) {
    return new Error('Invalid pathname 2')
  } else if (pathname[3] !== DAILIES) {
    return new Error('Invalid pathname 3')
  } else {
    dir = `./public/uploads/${pathname[1]}/${pathname[2]}/${pathname[3]}/${pathname[4]}`
  }

  const files = {}

  for (const key in req.body.files) {
    if (!req.body.files[key]) {
      files[key] = []
    }

    // move files from temp folder
    files[key] = req.body.files[key].map((file) => {
      /** If included, process it because its not yet moved to the correct dir */
      if (file.path.includes('temp')) {
        if (!fs.existsSync(file.path)) {
          res.status(400).json({ success: false, message: 'File not found' })
        }

        if (!fs.existsSync(dir)) {
          shell.mkdir('-p', dir)
        }

        const readStream = fs.createReadStream(file.path)
        const writeStream = fs.createWriteStream(`${dir}/${file.filename}`)
        const resizeTransform = sharp().toFormat('jpeg').crop()

        if (file.size > 500000) {
          readStream.pipe(resizeTransform).pipe(writeStream)
        } else {
          readStream.pipe(writeStream)
        }

        return `${dir}/${file.filename}`.replace('./', '')
      } else {
        return file.path
      }
    })
  }

  rimraf(`${TEMPATH}/${req.user.email}-${req.body.session}`, (err) => {
    if (err) {
      res.status(400).json({ success: false, message: 'Error delete temp folder' })
    }
  })

  res.status(200).json({ success: true, message: 'File upload success', files })
}

/**
 * Delete images uploaded
 * Request body needs
 * @paths: array of full paths for images that needs to be deleted
*/
export const deleteImage = async (req, res, next) => {
  const paths = req.body.paths

  for (const path in paths) {
    shell.rm(path)
  }

  res.status(200).json({ success: true, message: 'File Deleted' })
}