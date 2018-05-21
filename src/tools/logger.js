/**
 * tools/logger.js
 *
 * Copyright 2018 Ventana Technology Services
 *
 * Team:
 *  Steven Chae, schae@ventanaconstruction.com
 *  Min Nam, mnam@ventanaconstruction.com, hi@minnam.io
 */
import fs from 'fs'

export const bodyLog = (req, res, next) => {
  const chunks = []
  const end = res.end
  const startAt = process.hrtime()
  const write = res.write
  let diff

  res.write = function newWrite (chunk) {
    chunks.push(chunk)
    write.apply(res, arguments)
  }
  res.end = function newEnd (chunk) {
    if (chunk) { chunks.push(chunk) }
    diff = process.hrtime(startAt)
    end.apply(res, arguments)
  }
  res.once('finish', function logIt () {
    const time = diff[0] * 1e3 + diff[1] * 1e-6
    const logger = fs.createWriteStream('./logs/activities.log', { flags: 'a' })
    const date = new Date().toLocaleString()

    if (res.req.user) {
      logger.write(`${date} ${res.req.method} ${res.statusCode} ${res.req.baseUrl}${res.req._parsedUrl.pathname} ${res.req.user.email} ${time.toFixed(3)} ms \n`)
    } else {
      // Sign in
      if (typeof chunks[0] === 'string') {
        /** When token is fishsed */
        if (!res.req) {
          return
        }
        if (res.req.value) {
          const username = res.req.value.body.username
          const errorMessage = chunks[0].match(/<pre>(.*)<\/pre>/)[1]
          logger.write(`${date} ${res.req.method} ${res.statusCode} ${res.req._parsedUrl.pathname} ${username} ${errorMessage} ${time.toFixed(3)} ms \n`)
        }

      } else {
        logger.write(`${date} ${res.req.method} ${res.statusCode} ${res.req.baseUrl}${res.req._parsedUrl.pathname} ${time.toFixed(3)} ms \n`)
      }
    }
  })
  next()
}