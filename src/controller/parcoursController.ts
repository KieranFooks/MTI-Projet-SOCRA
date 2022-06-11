import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { parcoursService } from '../service'

const parcoursController = Router()

parcoursController.get('/', async (req, res) => {
  // #swagger.description = 'Get all parcours ordered by creation date DESC'

  const campus : string | undefined = req.query.campus?.toString()
  const type : string | undefined = req.query.type?.toString()
  let cost : number | undefined = undefined
  try {
    cost = req.query.cost ? parseInt(req.query.cost.toString()) : undefined
  } catch {
    // #swagger.responses[400] = { description: 'Parcours successfully obtained' }
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }


  let parcours
  try {
    // #swagger.responses[500] = { description: 'Server encountered an internal error' }
    parcours = await parcoursService.getAll(campus, type, cost)
  } catch (error) {

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }

  // #swagger.responses[200] = { description: 'Parcours successfully obtained' }
  res.send(parcours)
})

export default parcoursController