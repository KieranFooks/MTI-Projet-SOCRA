import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { parcoursService } from '../service'

const parcoursController = Router()

parcoursController.get('/', async (req, res) => {
  // #swagger.description = 'Get all parcours ordered by creation date DESC'
  /* #swagger.parameters['campus'] = {
    in: 'query',
    description: 'Filter search with campus name',
    required: false,
    type: 'string',
  } */
  /* #swagger.parameters['type'] = {
    in: 'query',
    description: 'Filter search with type of parcour',
    required: false,
    type: 'string',
  } */
  /* #swagger.parameters['cost'] = {
    in: 'query',
    description: 'Filter search with filter with a lower price than the one given',
    required: false,
    type: 'integer',
  } */

  const campus : string | undefined = req.query.campus?.toString()
  const type : string | undefined = req.query.type?.toString()
  let cost : number | undefined = undefined
  try {
    cost = req.query.cost ? parseInt(req.query.cost.toString()) : undefined
  } catch {
    // #swagger.responses[400] = { description: 'Bad request' }
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }


  let parcours
  try {
    parcours = await parcoursService.getAll(campus, type, cost)
  } catch (error) {
    // #swagger.responses[500] = { description: 'Server encountered an internal error' }
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    return
  }

  /* #swagger.responses[200] = {
    description: 'Parcours successfully obtained',
    schema: { $ref: '#/definitions/myParcours' }
  }*/
  res.send(parcours)
})

export default parcoursController