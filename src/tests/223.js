// /* eslint no-undef: 0 */
// import request from 'supertest'

// /* Models ======================================================================================= */
// import app from '../../app'
// import db from '../startup/db'
// import Contact from '../models/contact'
// import Permission from '../models/permission-set'
// import Project from '../models/project'
// import User from '../models/user'
// import Trade from '../models/trade'
// import * as testData from './testData'

// /* Tests ======================================================================================== */
// let contact, project, token, user, permissionR, trade

// beforeAll(async () => {
//   await db()
//   await User.remove({})
//   await Trade.remove({})
// })

// afterAll((done) => {
//   db.close(done)
// })

// describe('Permission', () => {

//   beforeEach(async () => {
//     user = new User(testData.NORMAL_USER)
//     await user.save()
//     const userAuth = await request(app)
//       .post('/users/signin')
//       .send({
//         username: testData.NORMAL_USER.email,
//         password: testData.NORMAL_USER_PASSWORD
//       })
//     token = userAuth.body.token

//     trade = new Trade(testData.TRADE_DATA)
//     await trade.save()

//     permissionR = new Permission({
//       name: 'Read',
//       project: { R: true },
//       pour: { R: true },
//       concrete: { R: true },
//       concreteAddon: { R: true },
//       daily: { R: true }
//     })
//     await permissionR.save()
//   })

//   afterEach(async () => {
//     await Project.remove({ _id: project._id })
//     await User.remove({ _id: user._id })
//     await Permission.remove({ _id: permissionR._id })
//     await Trade.remove({ _id: trade._id })
//     await Contact.remove({ _id: contact._id })
//   })

//   it('Create R-only, assign it to user', async () => {
//     contact = new Contact({
//       ...testData.CONTACT_DATA,
//       trade: trade._id
//     })
//     await contact.save()

//     project = new Project({
//       ...testData.PROJECT_DATA,
//       concreteProviderContact: contact._id
//     })
//     await project.save()

//     user.projectPermissions = [
//       ...user.projectPermissions,
//       {
//         type: 'projects',
//         value: {
//           project: project._id,
//           permissionSet: permissionR._id,
//           expiry: '2019-03-01T08:00:00.000Z'
//         }
//       }
//     ]

//     await user.save()

//     const res = await request(app)
//       .get(`/projects/${project._id}/pours`)
//       .set('Authorization', token)
//     expect(res.status).toBe(200)
//   })

//   it('should see no projects when user has no project assigned', async () => {
//     contact = new Contact({
//       ...testData.CONTACT_DATA,
//       trade: trade._id
//     })
//     await contact.save()

//     project = new Project({
//       ...testData.PROJECT_DATA,
//       concreteProviderContact: contact._id
//     })
//     await project.save()

//     const res = await request(app)
//       .get('/projects')
//       .set('Authorization', token)
//     expect(res.status).toBe(200)
//     expect(res.body.length).toBe(0)
//   })

//   it('should not reflect any reports when no R access was given', async () => {
//     console.log(permissionR._id)
//     permissionR = await Permission.findByIdAndUpdate(
//       permissionR._id,
//       { project: {R: false} },
//       { new: true }
//     )

//     contact = new Contact({
//       ...testData.CONTACT_DATA,
//       trade: trade._id
//     })
//     await contact.save()

//     project = new Project({
//       ...testData.PROJECT_DATA,
//       concreteProviderContact: contact._id
//     })
//     await project.save()

//     user.projectPermissions = [
//       ...user.projectPermissions,
//       {
//         type: 'projects',
//         value: {
//           project: project._id,
//           permissionSet: permissionR._id,
//           expiry: '2019-03-01T08:00:00.000Z'
//         }
//       }
//     ]

//     await user.save()

//     const res = await request(app)
//       .get(`/projects/${project._id}`)
//       .set('Authorization', token)
//     expect(res.body.length).toBe(undefined)
//   })
// })