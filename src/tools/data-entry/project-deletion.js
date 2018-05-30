import mongoose from 'mongoose'
import Project from '../../models/project'
import User from '../../models/user'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/jams_dev')

const projectTradesDeletion = async () => {
  return Project.update({}, {$unset: {trades: 1}}, {multi: true})
}

const projectUsersDeletion = async () => {
  return Project.update({}, {$unset: {users: 1}}, {multi: true})
}

const projectConcreteProviderDeletion = async () => {
  return Project.update({}, {$unset: {concreteProviderContact: 1}}, {multi: true})
}

const userProjectPermissionsDeletion = async () => {
  return User.update({}, {$unset: {projectPermissions: 1}}, {multi: true})
}

const userTradePermissionsDeletion = async () => {
  return User.update({}, {$unset: {tradePermission: 1}}, {multi: true})
}

console.log('Deletion Start')
console.log('===============================================')
console.log('#1 - Project trades deletion')
projectTradesDeletion()
console.log('#2 - Project users deletion')
projectUsersDeletion()
console.log('#3 - Project concreteProviderContacts deletion')
projectConcreteProviderDeletion()
console.log('#4 - User projectPermissions deletion')
userProjectPermissionsDeletion()
console.log('#5 - User tradePermission deletion')
userTradePermissionsDeletion()
console.log('===============================================')
console.log('Deletion Completed')

process.exit()
