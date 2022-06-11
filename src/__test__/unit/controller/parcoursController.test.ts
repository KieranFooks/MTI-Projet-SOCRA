import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../../app'
import { Parcours } from '../../../entity/Parcours'
import { parcoursService } from '../../../service'
import { testParcoursMTI, testParcoursSRS } from '../../data'

/**
 * User integration test
 *
 * @group unit/controller/parcours
 */

const request = supertest(app)

test('should return 2 parcours when there is 2 parcours', async () => {
  parcoursService.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI]
  })

  const get = await request.get('/parcours')

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.body.length).toEqual(2)
  expect(get.body[0].title).toEqual(testParcoursSRS.title)
  expect(get.body[1].title).toEqual(testParcoursMTI.title)
})

test('should return no parcours when there is 0 parcours', async () => {
  parcoursService.getAll = jest.fn(async () => {
    return []
  })

  const get = await request.get('/parcours')

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.body.length).toEqual(0)
})

test('should return an internal server error when an error is catched', async () => {
  parcoursService.getAll = jest.fn(async () => {
    throw new Error('Database error')
  })

  const get = await request.get('/parcours')

  expect(get.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(get.body).toEqual({})
})

test('should return 2 parcours when there is 2 parcours, with all parameters set to undefined', async () => {
  parcoursService.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI]
  })

  const get = await request.get('/parcours').query({})

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.body.length).toEqual(2)
  expect(get.body[0].title).toEqual(testParcoursSRS.title)
  expect(get.body[1].title).toEqual(testParcoursMTI.title)
})

test('should return 2 parcours when there is 2 parcours, with campus set to Paris', async () => {
  parcoursService.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI]
  })

  const get = await request.get('/parcours').query({ campus: 'Paris' })

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.body.length).toEqual(2)
  expect(get.body[0].title).toEqual(testParcoursSRS.title)
  expect(get.body[1].title).toEqual(testParcoursMTI.title)
})

test('should return 2 parcours when there is 2 parcours, with type set to Licence', async () => {
  parcoursService.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI]
  })

  const get = await request.get('/parcours').query({ type: 'Licence' })

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.body.length).toEqual(2)
  expect(get.body[0].title).toEqual(testParcoursSRS.title)
  expect(get.body[1].title).toEqual(testParcoursMTI.title)
})

test('should return 2 parcours when there is 2 parcours, with cost set to 15000', async () => {
  parcoursService.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI]
  })

  const get = await request.get('/parcours').query({ cost: '15000' })

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.body.length).toEqual(2)
  expect(get.body[0].title).toEqual(testParcoursSRS.title)
  expect(get.body[1].title).toEqual(testParcoursMTI.title)
})

test('should return 2 parcours when there is 2 parcours, all parameters set', async () => {
  parcoursService.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI]
  })

  const get = await request.get('/parcours').query({ campus: 'Paris', type: 'Licence', cost: '15000' })

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.body.length).toEqual(2)
  expect(get.body[0].title).toEqual(testParcoursSRS.title)
  expect(get.body[1].title).toEqual(testParcoursMTI.title)
})

test('Insert parcours should return the parcours', async () => {
  parcoursService.insert = jest.fn(async (): Promise<Parcours> => {
    return testParcoursSRS
  })

  const insert = await request.post('/parcours/create')
    .send(testParcoursSRS)

  expect(insert.statusCode).toEqual(StatusCodes.CREATED)
  expect(insert.body.title).toEqual(testParcoursSRS.title)
})
