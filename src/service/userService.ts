import jwt from 'jsonwebtoken'
import { User } from '../entity/User'
import { userRepository } from '../repository'

function generateAccessToken(email: string): string {
  const token = jwt.sign(email, process.env.SECRET as string)

  return `Bearer ${token}`
}

export async function authenticateUser(email: string, password: string): Promise<string | null> {
  const user = new User(email, password)

  if (await userRepository.getUser(user) == null) {
    return null
  }

  return generateAccessToken(email)
}
