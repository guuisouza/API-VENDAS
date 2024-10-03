import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrderIdToOrdersProducts1727916651972 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('orders_products', new TableColumn({
      name: 'order_id',
      type: 'uuid',
      isNullable: true
    }))

    await queryRunner.createForeignKey('orders_products', new TableForeignKey({
      name: 'OrdersProductsOrder', // um ou mais registros de uma mesma order
      columnNames: ['order_id'],
      referencedTableName: 'orders',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL' // campo order_id ficará nulo
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder')

    await queryRunner.dropColumn('orders_products', 'order_id')
  }

}
