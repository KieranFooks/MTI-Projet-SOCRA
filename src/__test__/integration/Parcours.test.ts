import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../app'
import { AppDataSource } from '../../data-source'
import { testParcoursMTI, testParcoursSRS, user1 } from '../data'

const request = supertest(app)

/**
 * User integration test
 *
 * @group integration/parcours
 */

beforeAll(async () => {
  await AppDataSource.initialize()
})

afterEach(async () => {
  await AppDataSource.dropDatabase()
})

afterAll(async () => {
  await AppDataSource.destroy()
})


test('GET /parcours should return 0 parcours', async () => {
  const get = await request.get('/parcours')

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(0)
})

test('GET /parcours should return the MTI parcours', async () => {
  await AppDataSource.manager.save(testParcoursMTI)

  const get = await request.get('/parcours')

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(1)
  expect(get.body[0].title).toBe(testParcoursMTI.title)
})

test('GET /parcours should return the MTI and SRS parcours ordered by creation date DESC', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await request.get('/parcours')

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(2)
  expect(get.body[0].title).toBe(testParcoursSRS.title)
  expect(get.body[1].title).toBe(testParcoursMTI.title)
})

test('GET /parcours with campus parameter set to Paris should return the MTI', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await request.get('/parcours').query({ campus: 'Paris' })

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(1)
  expect(get.body[0].title).toBe(testParcoursMTI.title)
})

test('GET /parcours with campus parameter set to Paris and type paramter set to Licence should return 0 parcours', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await request.get('/parcours').query({ campus: 'Paris', type: 'Licence' })

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(0)
})

test('GET /parcours with campus parameter set to Rennes and type paramter set to Master and cost parameter set to 15000 should return the SRS', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await request.get('/parcours').query({ campus: 'Rennes', type: 'Master', cost: '15000' })

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(1)
  expect(get.body[0].title).toBe(testParcoursSRS.title)
})

test('Insert parcours should return the parcours', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(user1)

  const tokenRequest = await request.post('/auth').send(user1)
  const token = tokenRequest.text

  const insert = await request.post('/parcours/create')
    .set('Authorization', token)
    .send(testParcoursSRS)

  expect(insert.statusCode).toEqual(StatusCodes.CREATED)
  expect(insert.body.title).toEqual(testParcoursSRS.title)
  expect(insert.body._id).toBeDefined()
})

test('Should return code 404', async () => {
  await AppDataSource.manager.save(user1)
  const tokenRequest = await request.post('/auth').send(user1)
  const token = tokenRequest.text
  const put = await request.put('/parcours/1').set('Authorization', token).send({ description: 'test' })
  expect(put.statusCode).toEqual(StatusCodes.NOT_FOUND)
})

test('Should return code 400', async () => {
  await AppDataSource.manager.save(user1)
  const tokenRequest = await request.post('/auth').send(user1)
  const token = tokenRequest.text
  const put = await request.put('/parcours/' + testParcoursMTI._id).set('Authorization', token)

  expect(put.statusCode).toEqual(StatusCodes.BAD_REQUEST)
})

test('Should return code 200', async () => {
  await AppDataSource.manager.save(user1)
  const tokenRequest = await request.post('/auth').send(user1)
  const token = tokenRequest.text
  await AppDataSource.manager.save(testParcoursMTI)
  const put = await request.put('/parcours/' + testParcoursMTI._id).set('Authorization', token).send({ description: 'test' })

  expect(put.statusCode).toEqual(StatusCodes.OK)
  const res = await request.get('/parcours')
  expect(res.statusCode).toBe(StatusCodes.OK)
  expect(res.body.length).toBe(1)
  expect(res.body[0].title).toBe(testParcoursMTI.title)
  expect(res.body[0].description).toBe('test')
})