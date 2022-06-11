import { AppDataSource } from '../../../data-source'
import { Module } from '../../../entity/Module'
import { Parcours } from '../../../entity/Parcours'
import { Subject } from '../../../entity/Subject'
import { parcoursRepository } from '../../../repository'

/**
 * User integration test
 *
 * @group unit/repository/parcours
 */

const testModuleMTI1 : Module = new Module('S1', [new Subject('Systèmes d\'information', 'Autour de la gestion de l\'information'), new Subject('ERP', 'Préparation Certification SAP')])
const testModuleMTI2 : Module = new Module('S2', [new Subject('VueJS', 'Initiation au VueJS'), new Subject('SCRUM', 'Initiation au SCRUM')])
const testModuleSRS1 : Module = new Module('S1', [new Subject('Forensic et reverse engineering', 'Initiation aux forensic et reverse engineering'), new Subject('Supervision de sécurité, ingénierie des SOC, détection opérationnelle', 'Initiation à la supervision de sécurité, ingénierie des SOC, détection opérationnelle')])
const testModuleSRS2 : Module = new Module('S2', [new Subject('Stage en entreprise', 'Stage effectué en entreprise')])
const testParcoursMTI : Parcours = new Parcours('MTI', 'Paris', 24, 'Master', 20000, 80, new Date(), [testModuleMTI1, testModuleMTI2], 'Super Majeur')
const testParcoursSRS : Parcours = new Parcours('SRS', 'Rennes', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Majeur bof bof')

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