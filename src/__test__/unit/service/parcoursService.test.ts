import { Parcours } from '../../../entity/Parcours'
import { parcoursRepository } from '../../../repository'
import { parcoursService } from '../../../service'
import { testParcoursMTI, testParcoursSRS, testRelevanceFormula1, testRelevanceFormula2, testRelevanceFormula3, testRelevanceFormula4, testRelevanceFormula5 } from '../../data'

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

test('relevanceFormula 1', async () => {
  const result = parcoursService.relevanceFormula(testRelevanceFormula1, 'java api architecture')
  expect(result).toEqual(2.5)
})

test('relevanceFormula 2', async () => {
  const result = parcoursService.relevanceFormula(testRelevanceFormula2, 'java api architecture')
  expect(result).toEqual(-0.5)
})

test('relevanceFormula 3', async () => {
  const result = parcoursService.relevanceFormula(testRelevanceFormula3, 'java api architecture')
  expect(result).toEqual(-2)
})

test('relevanceFormula 4', async () => {
  const result = parcoursService.relevanceFormula(testRelevanceFormula4, 'java api architecture')
  expect(result).toEqual(0)
})

test('relevanceFormula 5', async () => {
  const result = parcoursService.relevanceFormula(testRelevanceFormula5, 'java api architecture')
  expect(result).toEqual(7.5)
})

test('should return MTI parcours first', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI]
  })

  const get = await parcoursService.getAllByRelevance('MTI')

  expect(get.length).toEqual(2)
  expect(get[0].title).toEqual(testParcoursMTI.title)
})

test('should return SRS parcours first', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI]
  })

  const get = await parcoursService.getAllByRelevance('SRS')

  expect(get.length).toEqual(2)
  expect(get[0].title).toEqual(testParcoursSRS.title)
})

test('should return an internal server error when an error is catched', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    throw new Error('Database error')
  })

  const call = async (): Promise<void> => {
    await parcoursService.getAllByRelevance('MTI')
  }

  await expect(call).rejects.toThrow()
})

test('should return -1', () => {
  const result = parcoursService.sortByRelevance(testParcoursMTI, testParcoursSRS, 'MTI')
  expect(result).toEqual(-1)
})

test('should return 0', () => {
  const result = parcoursService.sortByRelevance(testParcoursMTI, testParcoursSRS, 'majeure')
  expect(result).toEqual(0)
})

test('should return 0', () => {
  const result = parcoursService.sortByRelevance(testParcoursMTI, testParcoursSRS, 'test')
  expect(result).toEqual(0)
})

test('should return 1', () => {
  const result = parcoursService.sortByRelevance(testParcoursMTI, testParcoursSRS, 'bof')
  expect(result).toEqual(1)
})

test('Insert parcours should return the parcours', async () => {
  parcoursRepository.insert = jest.fn(async (parcours: Parcours): Promise<Parcours> => {
    return parcours
  })

  const insert = await parcoursService.insert(testParcoursSRS)

  expect(insert).toEqual(testParcoursSRS)
})

test('Edit parcours description should return void', async () => {
  parcoursRepository.changeDescription = jest.fn(async (): Promise<void> => {
    return
  })

  const put = await parcoursService.changeDescription('test', 'test')
  expect(put).toBeUndefined()
})