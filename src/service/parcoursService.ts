import { Parcours } from '../entity/Parcours'
import { parcoursRepository } from '../repository'

export async function getAll(campus: string | undefined = undefined, type : string | undefined = undefined, cost : number | undefined = undefined): Promise<Parcours[]> {
  const parcours = parcoursRepository.getAll(campus, type, cost)
  return (await parcours).reverse()
}