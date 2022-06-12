import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Parcours } from '../entity/Parcours'
import { parcoursService } from '../service'
import checkToken from './checkToken'

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
    schema: { $ref: '#/definitions/parcoursList' }
  }*/
  res.send(parcours)
})

parcoursController.post('/', async (req, res) => {
  // #swagger.description = 'Get all parcours by keywords relevance'

  if (req.body == null || req.body.keywords == null) {
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
    return
  }
  // #swagger.responses[200] = { description: 'Parcours successfully obtained' }
  res.send(parcours)
})

parcoursController.post('/create', checkToken, async (req, res) => {
  /**
   * #swagger.description = 'Create a new parcours'
   * #swagger.responses[201] = {
     description: 'Parcours successfully created',
     schema: { $ref: '#/definitions/parcours' }
    }
   * #swagger.responses[400] = { description: 'The request is not valid. Body format is incorrect.' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error' }
   *
   * #swagger.parameters['object'] = {
         in: 'body',
         description: 'Parcours to create',
         required: true,
         schema: { $ref: '#/definitions/parcours' }
    }
  * #swagger.security = [{
        "Bearer": []
    }]
  */

  let parcours: Parcours
  try {
    parcours = req.body as Parcours
  } catch (error) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    const createdParcours = await parcoursService.insert(parcours)

    res.status(StatusCodes.CREATED)
    res.send(createdParcours)
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default parcoursController
