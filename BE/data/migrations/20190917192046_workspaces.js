exports.up = function(knex) {
	return knex.schema.createTable('workspaces', (tbl) => {
		tbl.increments();

		tbl.string('name', 128).notNullable().unique();

		tbl.text('description');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('workspaces');
};
