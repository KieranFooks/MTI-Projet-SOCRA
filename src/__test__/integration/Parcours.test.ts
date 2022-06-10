import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../app'
import { AppDataSource } from '../../data-source'
import { Module } from '../../entity/Module'
import { Parcours } from '../../entity/Parcours'
import { Subject } from '../../entity/Subject'

const request = supertest(app)

/**
 * User integration test
 *
 * @group integration/parcours
 */

const testModuleMTI1 : Module = new Module('S1', [new Subject('Systèmes d\'information', 'Autour de la gestion de l\'information'), new Subject('ERP', 'Préparation Certification SAP')])
const testModuleMTI2 : Module = new Module('S2', [new Subject('VueJS', 'Initiation au VueJS'), new Subject('SCRUM', 'Initiation au SCRUM')])
const testModuleSRS1 : Module = new Module('S1', [new Subject('Forensic et reverse engineering', 'Initiation aux forensic et reverse engineering'), new Subject('Supervision de sécurité, ingénierie des SOC, détection opérationnelle', 'Initiation à la supervision de sécurité, ingénierie des SOC, détection opérationnelle')])
const testModuleSRS2 : Module = new Module('S2', [new Subject('Stage en entreprise', 'Stage effectué en entreprise')])
const testParcoursMTI : Parcours = new Parcours('MTI', 'Paris', 24, 'Master', 20000, 80, new Date(), [testModuleMTI1, testModuleMTI2], 'Super Majeur')
const testParcoursSRS : Parcours = new Parcours('SRS', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Majeur bof bof')

beforeAll(async () => {
  await AppDataSource.initialize()
})

afterEach(async () => {
  await AppDataSource.dropDatabase()
})

afterAll(async () => {
  await AppDataSource.destroy()
})


test('GET /parcours should return 0 parcours', async () => {
  const get = await request.get('/parcours')

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(0)
})

test('GET /parcours should return the MTI parcours', async () => {
  await AppDataSource.manager.save(testParcoursMTI)

  const get = await request.get('/parcours')

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(1)
  expect(get.body[0].title).toBe(testParcoursMTI.title)
})

test('GET /parcours should return the MTI and SRS parcours ordered by creation date DESC', async () => {
  await AppDataSource.manager.save(testParcoursMTI)
  await AppDataSource.manager.save(testParcoursSRS)

  const get = await request.get('/parcours')

  expect(get.statusCode).toBe(StatusCodes.OK)
  expect(get.body.length).toBe(2)
  expect(get.body[0].title).toBe(testParcoursSRS.title)
  expect(get.body[1].title).toBe(testParcoursMTI.title)
})