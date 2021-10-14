import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { Client } from './Client'

@Entity('orders')
class Order {
  @PrimaryColumn()
  readonly id: string

  @Column() 
  client_id: string

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client

  @Column()
  created_date: Date

  @Column()
  delivery_date: Date

  @Column()
  status: boolean

  @Column()
  status_delivery: boolean

  @Column()
  status_paid: boolean

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

export { Order }