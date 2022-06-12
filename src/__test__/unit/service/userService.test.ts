import { userRepository } from '../../../repository'
import { userService } from '../../../service'
import { user1 } from '../../data'
import jwt from 'jsonwebtoken'

/**
 * User unit test
 *
 * @group unit/service/parcours
 */

process.env.SECRET = 'test'

function isValidToken(token: string): boolean {
  return jwt.verify(token.split(' ')[1], process.env.SECRET as string) != null
}

test('authenticateUser should return a valid token when a user ', async () => {
  userRepository.getUser = jest.fn(async () => {
    return user1
  })

  const token = await userService.authenticateUser(user1.email, user1.password)

  expect(token).not.toBeNull()
  expect(token).toContain('Bearer ')
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(isValidToken(token!)).toEqual(true)
})

test('authenticateUser should return a valid token when a user ', async () => {
  userRepository.getUser = jest.fn(async () => {
    return null
  })

  const token = await userService.authenticateUser(user1.email, user1.password)

  expect(token).toBeNull()
})
