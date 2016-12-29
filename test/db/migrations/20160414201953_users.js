'use strict'

exports.up = (knex) => knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('first_name')
    table.string('last_name')
    table.string('email')
    table.timestamps()
})

exports.down = (knex) => knex.schema.dropTable('users')
