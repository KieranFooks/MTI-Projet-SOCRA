import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userService } from '../service'

const authController = Router()

authController.post('/', async (req, res) => {
  /**
   * #swagger.description = 'Authenticate user.'
   * #swagger.responses[200] = {
     description: 'User authentificated.',
    }
   * #swagger.responses[400] = { description: 'The request is not valid. Body format is incorrect.' }
   * #swagger.responses[403] = { description: 'User with password not found.' }
   * #swagger.responses[500] = { description: 'Server encountered an internal error.' }
  */
  const { email, password } = req.body
  if (email == null || password == null) {
    res.sendStatus(StatusCodes.BAD_REQUEST)
    return
  }

  try {
    const token = await userService.authenticateUser(email, password)
    if (token == null) {
      res.sendStatus(StatusCodes.UNAUTHORIZED)
      return
    }

    res.send(token)
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

export default authController
