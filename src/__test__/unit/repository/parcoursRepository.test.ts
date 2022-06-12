import { AppDataSource } from '../../../data-source'
import { parcoursRepository } from '../../../repository'
import { testParcoursMTI, testParcoursSRS } from '../../data'

/**
 * User integration test
 *
 * @group unit/repository/parcours
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


test('should return 0 parcours when there is 0 parcours', async () => {
  const get = await parcoursRepository.getAll()

  expect(get.length).toBe(0)
})

test('should return 2 parcours when there is 2 parcours', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await parcoursRepository.getAll()

  expect(get.length).toBe(2)
  expect(get[0].title).toBe(testParcoursMTI.title)
  expect(get[1].title).toBe(testParcoursSRS.title)
})

test('should return 2 parcours when there is 2 parcours, with undefined parameters', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await parcoursRepository.getAll(undefined, undefined, undefined)

  expect(get.length).toBe(2)
  expect(get[0].title).toBe(testParcoursMTI.title)
  expect(get[1].title).toBe(testParcoursSRS.title)
})

test('should return 1 parcours when there is 2 parcours, with campus parameter set to Paris', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await parcoursRepository.getAll('Paris')

  expect(get.length).toBe(1)
  expect(get[0].title).toBe(testParcoursMTI.title)
})

test('should return 0 parcours when there is 2 parcours, with campus parameter set to Rome', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await parcoursRepository.getAll('Rome')

  expect(get.length).toBe(0)
})

test('should return 0 parcours when there is 2 parcours, with type parameter set to Licence', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await parcoursRepository.getAll(undefined, 'Licence')

  expect(get.length).toBe(0)
})

test('should return 0 parcours when there is 2 parcours, with type parameter set to Master', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await parcoursRepository.getAll(undefined, 'Master')

  expect(get.length).toBe(2)
  expect(get[0].title).toBe(testParcoursMTI.title)
  expect(get[1].title).toBe(testParcoursSRS.title)
})

test('should return 0 parcours when there is 2 parcours, with cost parameter set to 500', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await parcoursRepository.getAll(undefined, undefined, 500)

  expect(get.length).toBe(0)
})

test('should return 0 parcours when there is 2 parcours, with cost parameter set to 15000', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await parcoursRepository.getAll(undefined, undefined, 15000)

  expect(get.length).toBe(1)
  expect(get[0].title).toBe(testParcoursSRS.title)
})

test('should return 1 parcours when there is 2 parcours, with cost parameter set to 15000 and campus parameter set to Rennes', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await parcoursRepository.getAll('Rennes', undefined, 15000)

  expect(get.length).toBe(1)
  expect(get[0].title).toBe(testParcoursSRS.title)
})

test('should return 1 parcours when there is 2 parcours, with cost parameter set to 15000 and campus parameter set to Rennes and type parameter set to Master', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await parcoursRepository.getAll('Rennes', 'Master', 15000)

  expect(get.length).toBe(1)
  expect(get[0].title).toBe(testParcoursSRS.title)
})