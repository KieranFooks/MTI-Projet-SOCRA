import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../../app'
import { User } from '../../../entity/User'
import { userService } from '../../../service'
import { user1, user2 } from '../../data'

const request = supertest(app)

/**
 * Auth unit test
 *
 * @group unit/controller/auth
 */

test('GET /auth with the right credentials should return a valid token', async () => {
  userService.authenticateUser = jest.fn(async () => {
    return 'Bearer azertyuiopmlkjhgnfdbvsdcxqw123456789'
  })

  const body: User = new User(user2.email, user2.password)

  const get = await request.post('/auth')
    .send(body)

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.text).toContain('Bearer ')
})

test('GET /auth with the wrong password should return a 401', async () => {
  userService.authenticateUser = jest.fn(async () => {
    return null
  })

  const body: User = new User(user2.email, user1.password)

  const get = await request.post('/auth')
    .send(body)

  expect(get.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
  expect(get.text).toEqual('Unauthorized')
})

test('GET /auth with not found user should return a 401', async () => {
  userService.authenticateUser = jest.fn(async () => {
    return null
  })

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
