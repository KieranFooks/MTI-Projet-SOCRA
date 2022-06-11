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

const testModuleMTI1 : Module = new Module('S1', [new Subject('Systèmes d\'information', 'Autour de la gestion de l\'information'), new Subject('ERP', 'Préparation Certification SAP')])
const testModuleMTI2 : Module = new Module('S2', [new Subject('VueJS', 'Initiation au VueJS'), new Subject('SCRUM', 'Initiation au SCRUM')])
const testModuleSRS1 : Module = new Module('S1', [new Subject('Forensic et reverse engineering', 'Initiation aux forensic et reverse engineering'), new Subject('Supervision de sécurité, ingénierie des SOC, détection opérationnelle', 'Initiation à la supervision de sécurité, ingénierie des SOC, détection opérationnelle')])
const testModuleSRS2 : Module = new Module('S2', [new Subject('Stage en entreprise', 'Stage effectué en entreprise')])
const testParcoursMTI : Parcours = new Parcours('MTI', 'Paris', 24, 'Master', 20000, 80, new Date(), [testModuleMTI1, testModuleMTI2], 'Super Majeur')
const testParcoursSRS : Parcours = new Parcours('SRS', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Majeur bof bof')

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
