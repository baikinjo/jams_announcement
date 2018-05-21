/* Config ======================================================================================= */
import config from 'config'

/* Express ====================================================================================== */
import express from 'express'

/* Mongo ======================================================================================== */
import db from './src/startup/db'

/* Routes ======================================================================================= */
import routes from './src/startup/routes'

/* Middleware =================================================================================== */
import initiateStrategy from './src/startup/passport'
import middlewares from './src/startup/middlewares'

/** configuration */
const app = express()

// /** db */
// console.log(process.env)
if (process.env.NODE_ENV !== 'test'){
  console.log('Application Name: ' + config.get('name'))
  console.log('dev')
  db()
}

/** routes */
routes(app)

/** Middleware */
middlewares(app)

/** Initiate Passport Strategy */
initiateStrategy()

/** public folder */
app.use(express.static('./public'))

export default app