import app from '../../app'
import supertest from 'supertest'
import { AppDataSource } from '../../data-source'
import { Parcours } from '../../entity/Parcours'
import { User } from '../../entity/User'
import { Module } from '../../entity/Module'
import { Subject } from '../../entity/Subject'

const request = supertest(app)

/**
 * User integration test
 *
 * @group integration/hello
 */

const testUser : User = new User("test@gmail.fr", "password")

const testModule1 : Module = new Module("S1", [new Subject("Systèmes d'information", "Autour de la gestion de l'information"), new Subject("ERP", "Préparation Certification SAP")])
const testModule2 : Module = new Module("S2", [new Subject("VueJS", "Initiation au VueJS"), new Subject("SCRUM", "Initiation au SCRUM")])
const testParcours : Parcours = new Parcours("MTI", "Paris", 24, "Master", 20000, 80, new Date(), [testModule1, testModule2], "Super Majeur")

beforeAll(async () => {
  await AppDataSource.initialize()
})

beforeEach(async () => {
  await AppDataSource.manager.save(testUser);
  await AppDataSource.manager.save(testParcours);

})

afterEach(async () => {
  await AppDataSource.dropDatabase()
})

afterAll(async () => {
  await AppDataSource.destroy()
})

test('GET / should return "Hello World!"', async () => {
  const expected = 'Hello World!'

  const get = await request.get('/')

  expect(get.statusCode).toBe(200)
  expect(get.text).toBe(expected)
})

test('GET /mongo should return "Hello World!"', async () => {

  const get = await request.get('/mongo')

  expect(get.statusCode).toBe(200)
  expect(get.body.length).toBe(1)
  expect(get.body[0].title).toBe("MTI")
})