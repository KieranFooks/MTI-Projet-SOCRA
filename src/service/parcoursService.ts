import { Parcours } from '../entity/Parcours'
import { parcoursRepository } from '../repository'

export async function getAll(campus: string | undefined = undefined, type : string | undefined = undefined, cost : number | undefined = undefined): Promise<Parcours[]> {
  const parcours = await parcoursRepository.getAll(campus, type, cost)
  return parcours.reverse()
}

export async function insert(parcours: Parcours): Promise<Parcours> {
  return await parcoursRepository.insert(parcours)
}
