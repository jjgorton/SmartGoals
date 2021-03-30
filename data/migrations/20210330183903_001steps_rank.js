exports.up = function (knex) {
    return knex.schema.table('steps', (tbl) => {
        tbl.integer('rank').defaultTo(0).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table('steps', (tbl) => {
        tbl.dropColumn('rank');
    });
};
