import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../app'
import { AppDataSource } from '../../data-source'
import { User } from '../../entity/User'
import { testParcoursMTI, testParcoursSRS, user1, user2 } from '../data'
import jwt from 'jsonwebtoken'

const request = supertest(app)

/**
 * Authentification integration test
 *
 * @group integration/authentification
 */

beforeAll(async () => {
  await AppDataSource.initialize()
})

beforeEach(async () => {
  await AppDataSource.manager.save(user1)
  await AppDataSource.manager.save(user2)
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)
})

afterEach(async () => {
  await AppDataSource.dropDatabase()
})

afterAll(async () => {
  await AppDataSource.destroy()
})

function isValidToken(token: string): boolean {
  return jwt.verify(token.split(' ')[1], process.env.SECRET as string) != null
}

test('GET /auth with the right credentials should return a valid token', async () => {
  const body: User = new User(user2.email, user2.password)

  const get = await request.post('/auth')
    .send(body)

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.text).toContain('Bearer ')
  expect(isValidToken(get.text)).toEqual(true)
})

test('GET /auth with the wrong password should return a 401', async () => {
  const body: User = new User(user2.email, user1.password)

  const get = await request.post('/auth')
    .send(body)

  expect(get.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
  expect(get.text).toEqual('Unauthorized')
})

test('GET /auth with not found user should return a 401', async () => {
  const body: User = new User('blabla@notfound.lol', user1.password)

  const get = await request.post('/auth')
    .send(body)

  expect(get.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
  expect(get.text).toEqual('Unauthorized')
})

test('GET /auth with the no credentials should return a 400', async () => {
  const get = await request.post('/auth')

  expect(get.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(get.text).toEqual('Bad Request')
})
