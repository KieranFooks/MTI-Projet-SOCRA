import { AppDataSource } from '../data-source'
import { Parcours } from '../entity/Parcours'

export async function getAll(): Promise<Parcours[]> {
  return await AppDataSource.manager.find(Parcours)
}