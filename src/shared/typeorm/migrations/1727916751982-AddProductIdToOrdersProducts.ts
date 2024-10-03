import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductIdToOrdersProducts1727916751982 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('orders_products', new TableColumn({
      name: 'product_id',
      type: 'uuid',
      isNullable: true
    }))

    await queryRunner.createForeignKey('orders_products', new TableForeignKey({
      name: 'OrdersProductsProduct', // um ou mais registros de uma mesma order
      columnNames: ['product_id'],
      referencedTableName: 'products',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL' // campo order_id ficará nulo
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsProduct')

    await queryRunner.dropColumn('orders_products', 'product_id')
  }

}
