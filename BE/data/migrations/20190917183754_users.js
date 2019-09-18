exports.up = function(knex) {
	return knex.schema.creatTable('users', (tbl) => {
		tbl.increments();
		tbl.string('username', 128).notNullable().unique();
		tbl.string('password', 128).notNullable();
		tbl.string('email', 128).unique();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users');
};
