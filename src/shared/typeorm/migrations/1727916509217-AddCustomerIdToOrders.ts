import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToOrders1727916509217 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('orders', new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true // quando um cliente for apagado, vai ficar nulo
    }))

    await queryRunner.createForeignKey('orders', new TableForeignKey({
      name: 'OrdersCustomer',
      columnNames: ['customer_id'],
      referencedTableName: 'customers',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL' // campo customer_id ficará nulo
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'OrdersCustomer')

    await queryRunner.dropColumn('orders', 'customer_id')
  }

}
