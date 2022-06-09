import app from '../../app'
import supertest from 'supertest'

const request = supertest(app)

/**
 * User integration test
 *
 * @group integration/hello
 */

test('GET / should return "Hello World!"', async () => {
  const expected = 'Hello World!'

  const get = await request.get('/')

  expect(get.statusCode).toBe(200)
  expect(get.text).toBe(expected)
})
