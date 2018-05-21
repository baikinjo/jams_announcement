import bodyParser from 'body-parser'

import annoucementRoutes from '../routes/announcements'
import concreteAddonRoutes from '../routes/concrete-addons'
import concreteRoutes from '../routes/concretes'
import contactRoutes from '../routes/contacts'
import dailyRoutes from '../routes/dailies'
import imagesRoutes from '../routes/images'
import permissionSetRoutes from '../routes/permission-sets'
import pourRoutes from '../routes/pours'
import projectRoutes from '../routes/projects'
import tradeRoutes from '../routes/trades'
import userRoutes from '../routes/users'

import { bodyLog } from '../tools/logger'

export default (app) => {
  app.use(bodyParser.json())
  app.use('/announcements', annoucementRoutes)
  app.use('/contacts', contactRoutes)
  app.use('/images', imagesRoutes)
  app.use('/permission-sets', permissionSetRoutes)
  app.use('/projects', projectRoutes)
  app.use('/projects/:projectId/concrete-addons', concreteAddonRoutes)
  app.use('/projects/:projectId/concretes', concreteRoutes)
  app.use('/projects/:projectId/dailies', dailyRoutes)
  app.use('/projects/:projectId/pours', pourRoutes)
  app.use('/trades', tradeRoutes)
  app.use('/users', userRoutes)
  app.use(bodyLog)
}