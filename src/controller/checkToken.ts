import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

export default function checkToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization']

  if (authHeader === undefined) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  const token = authHeader.split(' ')[1]
  if (token == null) {
    res.sendStatus(StatusCodes.UNAUTHORIZED)
    return
  }

  const check = jwt.verify(token, process.env.SECRET as string)
  if (!check) {
    res.sendStatus(StatusCodes.FORBIDDEN)
    return
  }

  next()
}
