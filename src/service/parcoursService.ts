import { Parcours } from '../entity/Parcours'
import { parcoursRepository } from '../repository'

export async function getAll(campus: string | undefined = undefined, type : string | undefined = undefined, cost : number | undefined = undefined): Promise<Parcours[]> {
  const parcours = await parcoursRepository.getAll(campus, type, cost)
  return parcours.reverse()
}

export async function getAllByRelevance(keywords: string): Promise<Parcours[]> {

  const parcours = (await parcoursRepository.getAll()).sort((p1, p2) => {
    return sortByRelevance(p1, p2, keywords)
  })
  return parcours
}

export function sortByRelevance(p1: Parcours, p2: Parcours, keywords: string): number {
  const p1Relevance = relevanceFormula(p1, keywords)
  const p2Relevance = relevanceFormula(p2, keywords)
  if (p1Relevance > p2Relevance)
    return -1
  if (p1Relevance == p2Relevance)
    return 0
  return 1
}

export function relevanceFormula(p: Parcours, keywords: string): number {
  let m = 0
  let o = 0
  const arr = keywords.split(' ')
  const n = arr.length

  arr.forEach(keyword => {
    const matched_words_count = (p.description.toUpperCase().match(new RegExp(keyword.toUpperCase(), 'g')) || []).length
    if (matched_words_count != 0)
      m += 1
    o += matched_words_count
  })
  return m * o - 0.5 * n * o
}

export async function insert(parcours: Parcours): Promise<Parcours> {
  return await parcoursRepository.insert(parcours)
}