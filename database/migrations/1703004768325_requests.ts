import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'requests'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('user_email', 255).references('email').inTable('users').onDelete('CASCADE')
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('request_title', 255).notNullable()
      table.text('request_text').notNullable()
      table.binary('file_data')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
