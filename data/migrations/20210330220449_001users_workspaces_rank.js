exports.up = function (knex) {
    return knex.schema.table('users_workspaces', (tbl) => {
        tbl.integer('rank').defaultTo(0).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.table('users_workspaces', (tbl) => {
        tbl.dropColumn('rank');
    });
};
