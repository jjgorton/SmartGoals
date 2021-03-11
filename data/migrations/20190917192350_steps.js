exports.up = function (knex) {
    return knex.schema.createTable('steps', (tbl) => {
        tbl.increments();

        tbl.string('name', 128).notNullable();

        tbl.text('description');

        tbl.string('category');

        tbl.integer('rank').notNullable();

        tbl.datetime('start_time');

        tbl.datetime('end_time');

        tbl.boolean('completed').notNullable().defaultTo(false); //string or 0?

        tbl.integer('goal_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('goals')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        tbl.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('steps');
};
