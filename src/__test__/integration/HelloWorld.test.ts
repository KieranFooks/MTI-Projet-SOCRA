import app from '../../app'
import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'

const request = supertest(app)

/**
 * User integration test
 *
 * @group integration/hello
 */

test('GET / should return "Hello World!"', async () => {
  const expected = 'Hello World!'

  const get = await request.get('/')

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.text).toBe(expected)
})