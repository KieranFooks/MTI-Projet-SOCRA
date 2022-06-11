import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Parcours } from './entity/Parcours'
import { User } from './entity/User'

const PORTDB = parseInt(process.env.PORTDB ?? '27017')

export const AppDataSource = new DataSource({
  type: 'mongodb',
  host: 'mongodb',
  port: PORTDB,
  authSource: 'admin',
  username: 'root',
  password: 'password',
  database: 'SOCRA',
  synchronize: false,
  logging: true,
  entities: [User, Parcours],
  migrations: [],
  subscribers: [],
  useUnifiedTopology: true
})