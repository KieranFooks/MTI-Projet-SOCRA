import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../../app'
import { AppDataSource } from '../../../data-source'
import { Parcours } from '../../../entity/Parcours'
import { parcoursService } from '../../../service'
import { testParcoursMTI, testParcoursSRS, user1 } from '../../data'

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

test('should return MTI parcours first', async () => {
  parcoursService.getAllByRelevance = jest.fn(async () => {
    return [testParcoursMTI, testParcoursSRS]
  })
  const post = await request.post('/parcours').send({ keywords: 'MTI' }).set('Accept', 'application/json')

  expect(post.statusCode).toEqual(StatusCodes.OK)
  expect(post.body.length).toEqual(2)
  expect(post.body[0].title).toEqual(testParcoursMTI.title)
  expect(post.body[1].title).toEqual(testParcoursSRS.title)
})

test('should return error 400', async () => {
  parcoursService.getAllByRelevance = jest.fn(async () => {
    return [testParcoursMTI, testParcoursSRS]
  })
  const post = await request.post('/parcours')
  expect(post.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(post.body).toEqual({})
})

test('should return error 500', async () => {
  parcoursService.getAllByRelevance = jest.fn(async () => {
    throw new Error('Database error')
  })

  const post = await request.post('/parcours').send({ keywords: 'MTI' })
  expect(post.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(post.body).toEqual({})
})

test('Insert parcours should return the parcours', async () => {
  await AppDataSource.initialize()

  parcoursService.insert = jest.fn(async (): Promise<Parcours> => {
    return testParcoursSRS
  })

  await AppDataSource.manager.save(user1)

  const tokenRequest = await request.post('/auth').send(user1)
  const token = tokenRequest.text

  const insert = await request.post('/parcours/create')
    .set('Authorization', token)
    .send(testParcoursSRS)

  expect(insert.statusCode).toEqual(StatusCodes.CREATED)
  expect(insert.body.title).toEqual(testParcoursSRS.title)
  await AppDataSource.destroy()
})

test('Edit description should return code 200', async () => {
  await AppDataSource.initialize()

  parcoursService.changeDescription = jest.fn(async (): Promise<void> => {
    return
  })
  await AppDataSource.manager.save(user1)

  const tokenRequest = await request.post('/auth').send(user1)
  const token = tokenRequest.text

  const put = await request.put('/parcours/1').set('Authorization', token).send({ description: 'test' })

  expect(put.statusCode).toEqual(StatusCodes.OK)
  await AppDataSource.destroy()

})