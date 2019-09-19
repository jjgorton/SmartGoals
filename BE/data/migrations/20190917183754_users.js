exports.up = function(knex) {
	return knex.schema.createTable('users', (tbl) => {
		tbl.increments();

		tbl.string('username', 128).notNullable().unique();

		tbl.string('password', 128).notNullable();

		tbl.string('email', 128).unique();

		tbl.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users');
};
