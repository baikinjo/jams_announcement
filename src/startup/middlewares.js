import cors from 'cors'
import helmet from 'helmet'

export default (app) => {
  app.use(cors())
  app.use(helmet())
}