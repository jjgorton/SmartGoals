exports.up = function(knex) {
	return knex.schema.createTable('workspaces', (tbl) => {
		tbl.increments();

		tbl.string('name', 128).notNullable().unique();

		tbl.text('description');

		tbl.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('workspaces');
};
