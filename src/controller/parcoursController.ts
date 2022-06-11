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

parcoursController.post('/', async (req, res) => {
  // #swagger.description = 'Get all parcours by keywords relevance'

  if (req.body == null || req.body.keywords == null)
  {
    // #swagger.responses[400] = { description: 'body/keywords are null' }
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }
  let parcours
  try {
    parcours = await parcoursService.getAllByRelevance(req.body.keywords)
  } catch (error) {
    // #swagger.responses[500] = { description: 'Server encountered an internal error' }
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
  // #swagger.responses[200] = { description: 'Parcours successfully obtained' }
  res.send(parcours)
})
export default parcoursController