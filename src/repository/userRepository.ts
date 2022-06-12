import { AppDataSource } from '../data-source'
import { User } from '../entity/User'

export async function getUser(user: User): Promise<User | null> {
  return await AppDataSource.manager.findOne(User, {
    where: {
      ...user
    }
  })
}
