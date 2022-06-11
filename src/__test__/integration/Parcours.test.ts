import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../app'
import { AppDataSource } from '../../data-source'
import { testParcoursMTI, testParcoursSRS } from '../data'

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

  const get = await request.get('/parcours').query({campus: 'Paris'})

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(1)
  expect(get.body[0].title).toBe(testParcoursMTI.title)
})

test('GET /parcours with campus parameter set to Paris and type paramter set to Licence should return 0 parcours', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await request.get('/parcours').query({campus: 'Paris', type: 'Licence'})

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(0)
})

test('GET /parcours with campus parameter set to Rennes and type paramter set to Master and cost parameter set to 15000 should return the SRS', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await request.get('/parcours').query({campus: 'Rennes', type: 'Master', cost: '15000'})

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(1)
  expect(get.body[0].title).toBe(testParcoursSRS.title)
})