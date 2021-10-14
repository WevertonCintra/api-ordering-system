import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('clients')
class Client {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  city: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}

export { Client }