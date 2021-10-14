import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOrder1631920626154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'orders',
				columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'client_id',
            type: 'uuid'
          },
          {
            name: 'created_date',
            type: 'timestamp with time zone'
          },
          {
            name: 'delivery_date',
            type: 'timestamp with time zone'
          },
          {
            name: 'status',
            type: 'boolean',
            default: false
          },
          {
            name: 'status_delivery',
            type: 'boolean',
            default: false
          },
          {
            name: 'status_paid',
            type: 'boolean',
            default: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKClient',
            referencedTableName: 'clients',
            referencedColumnNames: ['id'],
            columnNames: ['client_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
			})
		)
	}

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders')
	}
}
