import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm'
import { Module } from './Module'

@Entity()
export class Parcours {

  constructor(title: string, campus: string, duration: number, type: string, cost: number, presential: number, start: string, modules: Module[], description: string) {
    this.title = title
    this.campus = campus
    this.duration = duration
    this.type = type
    this.cost = cost
    this.presential = presential
    this.start = start
    this.modules = modules
    this.description = description
  }

  @ObjectIdColumn()
    _id!: ObjectID

  @Column()
    title: string

  @Column()
    campus: string

  @Column()
    duration: number

  @Column()
    type: string

  @Column()
    cost: number

  @Column()
    presential: number

  @Column()
    start: string

  @Column(() => Module)
    modules: Module[]

  @Column()
    description: string

}
