exports.up = function (knex) {
    return knex.schema.table('goals', (tbl) => {
        tbl.integer('rank').defaultTo(0).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table('goals', (tbl) => {
        tbl.dropColumn('rank');
    });
};
