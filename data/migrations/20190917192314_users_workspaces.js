exports.up = function(knex) {
	return knex.schema.createTable('users_workspaces', (tbl) => {
		tbl.increments();

		tbl
			.integer('user_id')
			.unsigned()
			.notNullable() //not needed?  cause error?
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl
			.integer('workspace_id')
			.unsigned()
			.notNullable() //not needed?  cause error?
			.references('id')
			.inTable('workspaces')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.string('roles', 128).notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('users_workspaces');
};
