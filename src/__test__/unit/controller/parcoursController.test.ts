import { StatusCodes } from 'http-status-codes'
import supertest from 'supertest'
import app from '../../../app'
import { Module } from '../../../entity/Module'
import { Parcours } from '../../../entity/Parcours'
import { Subject } from '../../../entity/Subject'
import { parcoursService } from '../../../service'

/**
 * User integration test
 *
 * @group unit/controller/parcours
 */

const request = supertest(app)

const testModuleMTI1 : Module = new Module('S1', [new Subject('Systèmes d\'information', 'Autour de la gestion de l\'information'), new Subject('ERP', 'Préparation Certification SAP')])
const testModuleMTI2 : Module = new Module('S2', [new Subject('VueJS', 'Initiation au VueJS'), new Subject('SCRUM', 'Initiation au SCRUM')])
const testModuleSRS1 : Module = new Module('S1', [new Subject('Forensic et reverse engineering', 'Initiation aux forensic et reverse engineering'), new Subject('Supervision de sécurité, ingénierie des SOC, détection opérationnelle', 'Initiation à la supervision de sécurité, ingénierie des SOC, détection opérationnelle')])
const testModuleSRS2 : Module = new Module('S2', [new Subject('Stage en entreprise', 'Stage effectué en entreprise')])
const testParcoursMTI : Parcours = new Parcours('MTI', 'Paris', 24, 'Master', 20000, 80, new Date(), [testModuleMTI1, testModuleMTI2],'La Majeure MTI a pour ambition de former les « Leaders du Numérique», capables d’innover, de proposer de nouveaux contenus, de nouveaux usages, de nouveaux services, et cela autour des technologies libres ou celles des grands éditeurs (Microsoft, Apple…). Dans une société mondialisée où les enjeux du numérique deviennent stratégiques, l’ingénieur MTI s’intègre dans tous les secteurs économiques comme architecte de nouveaux services ou conducteur de chantiers innovants, avec une rigueur technologique couplée à une qualité d’écoute et un management du facteur humain lié aux nouvelles situations d’usage.')
const testParcoursSRS : Parcours = new Parcours('SRS', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Majeur bof bof')

test('should return 2 parcours when there is 2 parcours', async () => {
  parcoursService.getAll = jest.fn(async () => {
    return [testParcoursSRS, testParcoursMTI]
  })

  const get = await request.get('/parcours')

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.body.length).toEqual(2)
  expect(get.body[0].title).toEqual(testParcoursSRS.title)
  expect(get.body[1].title).toEqual(testParcoursMTI.title)
})

test('should return no parcours when there is 0 parcours', async () => {
  parcoursService.getAll = jest.fn(async () => {
    return []
  })

  const get = await request.get('/parcours')

  expect(get.statusCode).toEqual(StatusCodes.OK)
  expect(get.body.length).toEqual(0)
})

test('should return an internal server error when an error is catched', async () => {
  parcoursService.getAll = jest.fn(async () => {
    throw new Error('Database error')
  })

  const get = await request.get('/parcours')

  expect(get.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(get.body).toEqual({})
})

test('should return MTI parcours first', async () => {
  parcoursService.getAllByRelevance = jest.fn(async () => {
    return [testParcoursMTI,testParcoursSRS]
  })
  const post = await request.post('/parcours').send({keywords:'MTI'}).set('Accept', 'application/json')

  expect(post.statusCode).toEqual(StatusCodes.OK)
  expect(post.body.length).toEqual(2)
  expect(post.body[0].title).toEqual(testParcoursMTI.title)
  expect(post.body[1].title).toEqual(testParcoursSRS.title)
})

test('should return error 400', async () => {
  parcoursService.getAllByRelevance = jest.fn(async () => {
    return [testParcoursMTI,testParcoursSRS]
  })
  const post = await request.post('/parcours')
  expect(post.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  expect(post.body).toEqual({})
})

test('should return error 500', async () => {
  parcoursService.getAllByRelevance = jest.fn(async () => {
    throw new Error('Database error')
  })

  const post = await request.post('/parcours').send({keywords:'MTI'})
  expect(post.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(post.body).toEqual({})
})
