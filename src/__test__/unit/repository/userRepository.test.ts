import { AppDataSource } from '../../../data-source'
import { User } from '../../../entity/User'
import { userRepository } from '../../../repository'
import { user1, user2, user3 } from '../../data'

/**
 * User unit test
 *
 * @group unit/repository/user
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

test('Get an existing user should return the user',async () => {
  await AppDataSource.manager.save(user1)
  await AppDataSource.manager.save(user2)
  await AppDataSource.manager.save(user3)

  const get = await userRepository.getUser(user2)

  expect(get).toEqual(user2)
})

test('Get a none existing user should return null',async () => {
  await AppDataSource.manager.save(user1)
  await AppDataSource.manager.save(user2)
  await AppDataSource.manager.save(user3)

  const get = await userRepository.getUser(new User('no@mail.com', 'pwd'))

  expect(get).toEqual(null)
})
