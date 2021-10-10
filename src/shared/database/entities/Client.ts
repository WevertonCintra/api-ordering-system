import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, JoinTable } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Order } from './Order'

@Entity('clients')
class Client {
  @PrimaryColumn()
  readonly id: string

  @Column()
  name: string

  @Column()
  phone: string

  @Column()
  city: 'local' | 'another_city'

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