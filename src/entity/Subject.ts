import { Column } from 'typeorm'

export class Subject {

  constructor(title: string, description: string) {
    this.title = title
    this.description = description
  }

  @Column()
    title: string

  @Column()
    description: string
}