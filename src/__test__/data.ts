import { Module } from '../entity/Module'
import { Parcours } from '../entity/Parcours'
import { Subject } from '../entity/Subject'
import { User } from '../entity/User'

const testModuleMTI1: Module = new Module('S1', [new Subject('Systèmes d\'information', 'Autour de la gestion de l\'information'), new Subject('ERP', 'Préparation Certification SAP')])
const testModuleMTI2: Module = new Module('S2', [new Subject('VueJS', 'Initiation au VueJS'), new Subject('SCRUM', 'Initiation au SCRUM')])
const testModuleSRS1: Module = new Module('S1', [new Subject('Forensic et reverse engineering', 'Initiation aux forensic et reverse engineering'), new Subject('Supervision de sécurité, ingénierie des SOC, détection opérationnelle', 'Initiation à la supervision de sécurité, ingénierie des SOC, détection opérationnelle')])
const testModuleSRS2: Module = new Module('S2', [new Subject('Stage en entreprise', 'Stage effectué en entreprise')])
export const testParcoursMTI: Parcours = new Parcours('MTI', 'Paris', 24, 'Master', 20000, 80, new Date(), [testModuleMTI1, testModuleMTI2], 'Super Majeur MTI')
export const testParcoursSRS: Parcours = new Parcours('SRS', 'Rennes', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Majeur SRS: bof bof')

export const testRelevanceFormula1: Parcours = new Parcours('Test1', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Après les études vous serez capable de participer aux Comités d’Architecture pour garantir la bonne conformité des bonnes pratiques des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)')
export const testRelevanceFormula2: Parcours = new Parcours('Test2', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Après les études vous serez capable de participer aux Comités d’Architecture pour garantir la bonne conformité des bonnes pratiques de développement.')
export const testRelevanceFormula3: Parcours = new Parcours('Test3', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Après les études vous serez capable de garantir la bonne conformité des bonnes pratiques des APIs. Promouvoir les pratiques API First au sein du groupe. Rédiger / Maintenir un Guideline de développement d’API (création de modèle d’API, ...)')
export const testRelevanceFormula4: Parcours = new Parcours('Test4', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Après les études vous serez capable de développer l’expérience utilisateur du produit.')
export const testRelevanceFormula5: Parcours = new Parcours('Test5', 'Paris', 24, 'Master', 10000, 100, new Date(), [testModuleSRS1, testModuleSRS2], 'Après les études vous serez capable de garantir la bonne conformité des bonnes pratiques des APIs. Promouvoir les pratiques API First au sein du groupe. Développement en Java. Mise en place une architecture micro-services avec une structure de code reposant sur une architecture hexagonale.')

export const user1: User = new User('user1@gmail.com', 'password')
export const user2: User = new User('user2@hotmail.com', '123456')
export const user3: User = new User('user3@orange.fr', 'pwd')