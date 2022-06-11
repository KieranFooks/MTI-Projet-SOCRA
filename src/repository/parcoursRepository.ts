import { AppDataSource } from '../data-source'
import { Parcours } from '../entity/Parcours'

export async function getAll(campus: string | undefined = undefined, type : string | undefined = undefined, cost : number | undefined = undefined): Promise<Parcours[]> {
  let parameters = {}
  if (campus !== undefined) {
    parameters = { ...parameters, campus: { $eq: campus} }
  }
  if (type !== undefined) {
    parameters = { ...parameters, type: { $eq: type } }
  }
  if (cost !== undefined) {
    parameters = { ...parameters, cost: { $lt: cost } }
  }

  return await AppDataSource.manager.find(Parcours, { where: { ...parameters } })
}

export async function insert(parcours: Parcours): Promise<Parcours> {
  await AppDataSource.manager.insert(Parcours, parcours)
  return parcours
}
