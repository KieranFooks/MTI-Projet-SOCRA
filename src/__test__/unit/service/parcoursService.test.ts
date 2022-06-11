import { parcoursRepository } from '../../../repository'
import { parcoursService } from '../../../service'
import { testParcoursMTI, testParcoursSRS } from '../../data'


/**
 * User integration test
 *
 * @group unit/service/parcours
 */

test('should return 2 parcours when there is 2 parcours', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return [testParcoursMTI, testParcoursSRS]
  })

  const get = await parcoursService.getAll()

  expect(get.length).toEqual(2)
  expect(get[0].title).toEqual(testParcoursSRS.title)
  expect(get[1].title).toEqual(testParcoursMTI.title)
})

test('should return no parcours when there is 0 parcours', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return []
  })

  const get = await parcoursService.getAll()

  expect(get.length).toEqual(0)
})

test('should return an internal server error when an error is catched', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    throw new Error('Database error')
  })

  const call = async (): Promise<void> => {
    await parcoursService.getAll()
  }

  await expect(call).rejects.toThrow()
})

test('should return 2 parcours when there is 2 parcours, with all parameters set to undefined', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return [testParcoursMTI, testParcoursSRS]
  })

  const get = await parcoursService.getAll()

  expect(get.length).toEqual(2)
  expect(get[0].title).toEqual(testParcoursSRS.title)
  expect(get[1].title).toEqual(testParcoursMTI.title)
})

test('should return 2 parcours when there is 2 parcours, with campus set to Paris', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return [testParcoursMTI, testParcoursSRS]
  })

  const get = await parcoursService.getAll('Paris')

  expect(get.length).toEqual(2)
  expect(get[0].title).toEqual(testParcoursSRS.title)
  expect(get[1].title).toEqual(testParcoursMTI.title)
})

test('should return 2 parcours when there is 2 parcours, with type set to Licence', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return [testParcoursMTI, testParcoursSRS]
  })

  const get = await parcoursService.getAll(undefined, 'Licence')

  expect(get.length).toEqual(2)
  expect(get[0].title).toEqual(testParcoursSRS.title)
  expect(get[1].title).toEqual(testParcoursMTI.title)
})

test('should return 2 parcours when there is 2 parcours, with cost set to 15000', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return [testParcoursMTI, testParcoursSRS]
  })

  const get = await parcoursService.getAll(undefined, undefined, 15000)

  expect(get.length).toEqual(2)
  expect(get[0].title).toEqual(testParcoursSRS.title)
  expect(get[1].title).toEqual(testParcoursMTI.title)
})

test('should return 2 parcours when there is 2 parcours, all parameters set', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return [testParcoursMTI, testParcoursSRS]
  })

  const get = await parcoursService.getAll('Paris', 'Licence', 15000)

  expect(get.length).toEqual(2)
  expect(get[0].title).toEqual(testParcoursSRS.title)
  expect(get[1].title).toEqual(testParcoursMTI.title)
})