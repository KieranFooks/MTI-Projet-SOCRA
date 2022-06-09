import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { parcoursService } from '../service'

const parcoursController = Router()

parcoursController.get('/parcours', async (_, res) => {
  let parcours
  try {
    parcours = await parcoursService.getAll()
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }

  res.send(parcours)
})

export default parcoursController