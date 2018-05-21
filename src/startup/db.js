import config from 'config'
import mongoose from 'mongoose'

export default () => {
  mongoose.Promise = global.Promise
  const db = config.get('db')
  mongoose.connect(db)
  console.log(`connceted to ${db}...`)
}