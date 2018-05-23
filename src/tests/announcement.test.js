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
let adminToken, userToken, projectUserToken, admin, user, projectUser, project, postId1, postId2

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
    personnels: [{type: 'other', value:{toggled: true, user: {_id: projectUser._id}}}]
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
      postId1 = res.body.id
      expect(res.status).toBe(201)
    })

    it('should create with project for admin auth', async () => {
      const res = await request(app)
        .post('/announcements')
        .send({
          title: 'project-1',
          message: 'project-1',
          project: project._id
        })
        .set('Authorization', adminToken)
      postId2 = res.body.id
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
    it('should access all with admin auth', async () => {
      const res = await request(app)
        .get('/announcements')
        .set('Authorization', adminToken)

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
    })

    it('should access all with user auth', async () => {
      const res = await request(app)
        .get('/announcements')
        .set('Authorization', userToken)

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(1)
    })

    it('should access all with project assigned user auth', async () => {
      const res = await request(app)
        .get('/announcements')
        .set('Authorization', projectUserToken)

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)
    })
  })

  describe('GET /announcements/:id -> general', () => {
    it('should access general post with admin auth', async () => {
      const res = await request(app)
        .get(`/announcements/${postId1}`)
        .set('Authorization', adminToken)

      expect(res.status).toBe(200)
    })

    it('should access general post with user auth', async () => {
      const res = await request(app)
        .get(`/announcements/${postId1}`)
        .set('Authorization', userToken)

      expect(res.status).toBe(200)
    })

    it('should access general post with project assigned user auth', async () => {
      const res = await request(app)
        .get(`/announcements/${postId1}`)
        .set('Authorization', projectUserToken)

      expect(res.status).toBe(200)
    })
  })

  describe('GET /announcements/:id -> project assigned', () => {
    it('should access post with admin auth', async () => {
      const res = await request(app)
        .get(`/announcements/${postId2}`)
        .set('Authorization', adminToken)

      expect(res.status).toBe(200)
    })

    it('should not access post with user auth', async () => {
      const res = await request(app)
        .get(`/announcements/${postId2}`)
        .set('Authorization', userToken)

      expect(res.status).toBe(401)
    })

    it('should access post with porject assigned user auth', async () => {
      const res = await request(app)
        .get(`/announcements/${postId2}`)
        .set('Authorization', projectUserToken)

      expect(res.status).toBe(200)
    })
  })

  describe('GET /announcements/users', () => {
    it('should access list of readers from the post with admin auth', async () => {
      const res1 = await request(app)
        .get(`/announcements/${postId1}/users`)
        .set('Authorization', adminToken)

      expect(res1.status).toBe(200)
      expect(res1.body.length).toBe(3)

      const res2 = await request(app)
        .get(`/announcements/${postId2}/users`)
        .set('Authorization', adminToken)

      expect(res2.status).toBe(200)
      expect(res2.body.length).toBe(2)
    })

    it('should not access list of readers from the post with user auth', async () => {
      const res1 = await request(app)
        .get(`/announcements/${postId1}/users`)
        .set('Authorization', userToken)

      expect(res1.status).toBe(401)

      const res2 = await request(app)
        .get(`/announcements/${postId2}/users`)
        .set('Authorization', userToken)

      expect(res2.status).toBe(401)

      const res3 = await request(app)
        .get(`/announcements/${postId1}/users`)
        .set('Authorization', projectUserToken)

      expect(res3.status).toBe(401)

      const res4 = await request(app)
        .get(`/announcements/${postId2}/users`)
        .set('Authorization', projectUserToken)

      expect(res4.status).toBe(401)
    })
  })

  describe('PUT /announcements/:id', () => {
    it('should update a post with admin auth', async () => {
      const updateText = 'updated text'
      const updateMessage = 'updated message'
      const res1 = await request(app)
        .put(`/announcements/${postId1}`)
        .send({
          title: updateText,
          message: updateMessage
        })
        .set('Authorization', adminToken)

      expect(res1.status).toBe(200)

      const res2 = await request(app)
        .get(`/announcements/${postId1}`)
        .set('Authorization', adminToken)

      expect(res2.body.title).toBe(updateText)
      expect(res2.body.message).toBe(updateMessage)
    })

    it('should not update a post with user auth', async () => {
      const updateText = 'updated text'
      const updateMessage = 'updated message'
      const res1 = await request(app)
        .put(`/announcements/${postId1}`)
        .send({
          title: updateText,
          message: updateMessage
        })
        .set('Authorization', userToken)

      expect(res1.status).toBe(401)
    })
  })

  describe('DELETE /announcements/:id', () => {
    it('should delete a post with admin auth', async () => {
      const res1 = await request(app)
        .delete(`/announcements/${postId1}`)
        .set('Authorization', adminToken)

      expect(res1.status).toBe(200)

      const res2 = await request(app)
        .get('/announcements')
        .set('Authorization', adminToken)

      expect(res2.body.length).toBe(1)
    })

    it('should not delete a post with user auth', async () => {
      const res1 = await request(app)
        .delete(`/announcements/${postId2}`)
        .set('Authorization', userToken)

      expect(res1.status).toBe(401)

      const res2 = await request(app)
        .delete(`/announcements/${postId2}`)
        .set('Authorization', userToken)

      expect(res2.status).toBe(401)
    })
  })

  describe('GET /announcements/project/:projectId', () => {
    it('should return list of posts for project with admin auth', async () => {
      const res1 = await request(app)
        .post('/announcements')
        .send({
          title: 'project-2',
          message: 'project-2',
          project: project._id
        })
        .set('Authorization', adminToken)

      expect(res1.status).toBe(201)

      const res2 = await request(app)
        .post('/announcements')
        .send({
          title: 'project-3',
          message: 'project-3',
          project: project._id
        })
        .set('Authorization', adminToken)

      expect(res2.status).toBe(201)

      const res3 = await request(app)
        .post('/announcements')
        .send({
          title: 'project-4',
          message: 'project-4',
          project: project._id
        })
        .set('Authorization', adminToken)

      expect(res3.status).toBe(201)

      const res4 = await request(app)
        .get(`/announcements/project/${project._id}`)
        .set('Authorization', adminToken)

      expect(res4.status).toBe(200)
      expect(res4.body.length).toBe(4)
    })

    it('should not return list of posts for project with user auth', async () => {
      const res = await request(app)
        .get(`/announcements/project/${project._id}`)
        .set('Authorization', userToken)

      expect(res.status).toBe(401)
    })

    it('should return list of posts for project with project user auth', async () => {
      const res = await request(app)
        .get(`/announcements/project/${project._id}`)
        .set('Authorization', projectUserToken)

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(4)
    })
  })
})
