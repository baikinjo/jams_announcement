// /* eslint no-undef: 0 */
// import request from 'supertest'

// /* Models ======================================================================================= */
// import app from '../../app'
// import db from '../startup/db'
// import User from '../models/user'
// import * as testData from './testData'

// /* Tests ======================================================================================== */
// let token, user, normalUser

// beforeAll(async () => {
//   await db()
//   await User.remove({})
// })

// afterAll((done) => {
//   db.close(done)
// })

// describe('user ADMIN and NORMAL_USER authorization', () => {

//   beforeEach(async () => {
//     user = new User(testData.ADMIN)
//     await user.save()
//     const userAuth = await request(app)
//       .post('/users/signin')
//       .send({
//         username: testData.ADMIN.email,
//         password: testData.ADMIN_PASSWORD
//       })
//     token = userAuth.body.token

//     normalUser = new User(testData.NORMAL_USER)
//     await normalUser.save()
//   })

//   afterEach(() => {
//     return User.remove({})
//   })

//   it('should return all users', async () => {
//     const res = await request(app)
//       .get('/users')
//       .set('Authorization', token)

//     expect(res.status).toBe(200)
//   })

//   it('should send a password reset email with admin authorization', async () => {
//     const res = await request(app)
//       .post('/users/send-password-reset')
//       .send({ email: 'user@ventanaconstruction.com' })
//       .set('Authorization', token)

//     expect(res.status).toBe(200)
//   })

//   it('should not send a password reset email if user not found', async () => {
//     const res = await request(app)
//       .post('/users/send-password-reset')
//       .send({ email: 'u@ventanaconstruction.com' })
//       .set('Authorization', token)

//     expect(res.status).toBe(404)
//   })

//   it('should not send a password reset email with normal user authorization', async () => {
//     token = ''

//     const res = await request(app)
//       .post('/users/send-password-reset')
//       .send({ email: 'user@ventanaconstruction.com' })
//       .set('Authorization', token)

//     expect(res.status).toBe(401)
//   })
// })