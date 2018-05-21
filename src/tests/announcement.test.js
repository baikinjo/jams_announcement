/* eslint no-undef: 0 */
import request from 'supertest'

/* Models ======================================================================================= */
import app from '../../app'
import db from '../startup/db'
import Announcement from '../models/announcement'
import User from '../models/user'
import Project from '../models/project'
import * as testData from './testData'

/* Tests ======================================================================================== */
let adminToken, userToken, projectUserToken, admin, user, projectUser, project

beforeAll(async () => {
  await db()
  await User.remove({})
  await Announcement.remove({})
  await Project.remove({})

  admin = new User(testData.ADMIN)
  await admin.save()
  const adminAuth = await request(app)
    .post('/users/signin')
    .send({
      username: testData.ADMIN.email,
      password: testData.ADMIN_PASSWORD
    })
  adminToken = adminAuth.body.token

  user = new User(testData.NORMAL_USER)
  await user.save()
  const userAuth = await request(app)
    .post('/users/signin')
    .send({
      username: testData.NORMAL_USER.email,
      password: testData.NORMAL_USER_PASSWORD
    })
  userToken = userAuth.body.token

  projectUser = new User(testData.PROJECT_USER)
  await projectUser.save()
  const projectUserAuth = await request(app)
    .post('/users/signin')
    .send({
      username: testData.PROJECT_USER.email,
      password: testData.PROJECT_USER_PASSWORD
    })
  projectUserToken = projectUserAuth.body.token

  project = new Project({
    ...testData.PROJECT_DATA,
    personnels: projectUser._id
  })
  await project.save()
})

afterAll((done) => {
  db.close(done)
})

describe('Announcement Model', () => {
  beforeAll(async () => {

  })

  describe('POST /announcements', () => {
    it('should create with admin auth', async () => {
      const res = await request(app)
        .post('/announcements')
        .send({
          title: 'test',
          message: 'what'
        })
        .set('Authorization', adminToken)

      expect(res.status).toBe(201)
    })

    it('should create with project for admin auth', async () => {
      const res = await request(app)
        .post('/announcements')
        .send({
          title: 'test2',
          message: 'test2',
          project: project._id
        })
        .set('Authorization', adminToken)

      expect(res.status).toBe(201)
    })

    it('should not create with user auth', async () => {
      const res = await request(app)
        .post('/announcements')
        .send({
          title: 'test1',
          message: 'test1'
        })
        .set('Authorization', userToken)

      expect(res.status).toBe(401)
    })

    it('should not create with projectUser auth', async () => {
      const res = await request(app)
        .post('/announcements')
        .send({
          title: 'test2',
          message: 'test2'
        })
        .set('Authorization', projectUserToken)

      expect(res.status).toBe(401)
    })
  })

  describe('GET /announcements', () => {
    // it('should access all with normal user auth', async () => {
    //   const res = await request(app)
    //     .get('/announcements')
    //     .set('Authorization', userToken)

    //   expect(res.status).toBe(200)
    // })

    it('should access all with project user auth', async () => {
      const res = await request(app)
        .get('/announcements')
        .set('Authorization', projectUserToken)

      expect(res.status).toBe(200)
    })
  })
})