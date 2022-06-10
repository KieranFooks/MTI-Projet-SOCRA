import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { parcoursService } from '../service'

const parcoursController = Router()

parcoursController.get('/', async (_, res) => {
  // #swagger.description = 'Get all parcours ordered by creation date DESC'

  let parcours
  try {
    // #swagger.responses[500] = { description: 'Server encountered an internal error' }
    parcours = await parcoursService.getAll()
  } catch (error) {

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }

  // #swagger.responses[200] = { description: 'Parcours successfully obtained' }
  res.send(parcours)
})

export default parcoursController