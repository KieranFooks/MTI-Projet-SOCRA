import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { parcoursService } from '../service'

const parcoursController = Router()

parcoursController.get('/', async (_, res) => {
  let parcours
  try {
    parcours = await parcoursService.getAll()
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
  res.send(parcours)
})
parcoursController.post('/', async (req, res) => {
  if (req.body == null || req.body.keywords == null)
    res.sendStatus(StatusCodes.BAD_REQUEST)
  let parcours
  try {
    parcours = await parcoursService.getAllByRelevance(req.body.keywords)
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
  res.send(parcours)
})
export default parcoursController