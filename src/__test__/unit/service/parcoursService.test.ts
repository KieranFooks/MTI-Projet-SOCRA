import { Module } from '../../../entity/Module'
import { Parcours } from '../../../entity/Parcours'
import { Subject } from '../../../entity/Subject'
import { parcoursRepository } from '../../../repository'
import { parcoursService } from '../../../service'

/**
 * User integration test
 *
 * @group unit/service/parcours
 */

const testModuleMTI1: Module = new Module('S1', [new Subject('Systèmes d\'information', 'Autour de la gestion de l\'information'), new Subject('ERP', 'Préparation Certification SAP')])
const testModuleMTI2: Module = new Module('S2', [new Subject('VueJS', 'Initiation au VueJS'), new Subject('SCRUM', 'Initiation au SCRUM')])
const testModuleSRS1: Module = new Module('S1', [new Subject('Forensic et reverse engineering', 'Initiation aux forensic et reverse engineering'), new Subject('Supervision de sécurité, ingénierie des SOC, détection opérationnelle', 'Initiation à la supervision de sécurité, ingénierie des SOC, détection opérationnelle')])
const testModuleSRS2: Module = new Module('S2', [new Subject('Stage en entreprise', 'Stage effectué en entreprise')])
const testParcoursMTI: Parcours = new Parcours('MTI', 'Paris', 24, 'Master', 20000, 80, new Date(), [testModuleMTI1, testModuleMTI2], 'Majeure MTI')
const testParcoursSRS: Parcours = new Parcours('SRS', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Majeure SRS')
const testParcoursSCIA: Parcours = new Parcours('SCIA', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Majeure SCIA. La Majeure SCIA est centrée sur le machine learning')

const testRelevanceFormula1: Parcours = new Parcours('Test1', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Après les études vous serez capable de participer aux Comités d’Architecture pour garantir la bonne conformité des bonnes pratiques des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)')
const testRelevanceFormula2: Parcours = new Parcours('Test2', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Après les études vous serez capable de participer aux Comités d’Architecture pour garantir la bonne conformité des bonnes pratiques de développement.')
const testRelevanceFormula3: Parcours = new Parcours('Test3', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Après les études vous serez capable de garantir la bonne conformité des bonnes pratiques des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)')
const testRelevanceFormula4: Parcours = new Parcours('Test4', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Après les études vous serez capable de développer l’expérience utilisateur du produit.')
const testRelevanceFormula5: Parcours = new Parcours('Test5', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Après les études vous serez capable de garantir la bonne conformité des bonnes pratiques des APIs. Promouvoir les pratiques API First au sein du groupe. Développement en Java. Mise en place une architecture micro-services avec une structure de code reposant sur une architecture hexagonale.')

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
//relevanceFormula Tests

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

//getAllByRelevance Tests

test('should return MTI parcours first', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI, testParcoursSCIA]
  })

  const get = await parcoursService.getAllByRelevance('MTI')

  expect(get.length).toEqual(3)
  expect(get[0].title).toEqual(testParcoursMTI.title)
})

test('should return SCIA parcours first', async () => {
  parcoursRepository.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI, testParcoursSCIA]
  })

  const get = await parcoursService.getAllByRelevance('SCIA')

  expect(get.length).toEqual(3)
  expect(get[0].title).toEqual(testParcoursSCIA.title)
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

//sortByRelevance tests
test('should return -1', async () => {
  const result = parcoursService.sortByRelevance(testParcoursMTI, testParcoursSRS, 'MTI')
  expect(result).toEqual(-1)
})

test('should return 0', async () => {
  const result = parcoursService.sortByRelevance(testParcoursMTI, testParcoursSRS, 'majeure')
  expect(result).toEqual(0)
})

test('should return 0', async () => {
  const result = parcoursService.sortByRelevance(testParcoursMTI, testParcoursSRS, 'test')
  expect(result).toEqual(0)
})

test('should return 1', async () => {
  const result = parcoursService.sortByRelevance(testParcoursMTI, testParcoursSCIA, 'majeure')
  expect(result).toEqual(1)
})