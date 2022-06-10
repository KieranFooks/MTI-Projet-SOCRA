import { Parcours } from '../entity/Parcours'
import { parcoursRepository } from '../repository'

export async function getAll(): Promise<Parcours[]> {
  const parcours = await parcoursRepository.getAll()
  return parcours.reverse()
}