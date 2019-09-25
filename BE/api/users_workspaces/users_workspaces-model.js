const db = require('../../data/dbConfig');

module.exports = {
	find,
	add
};

function find() {
	return db('users_workspaces').select('*');
}

function findById(id, table) {
	return db(`${table}`).select('*').where({ id }).first();
}

function add(userWorkspaceInfo) {
	return db('users_workspaces').insert(userWorkspaceInfo, 'id').then(([ id ]) => {
		return findById(id, 'users_workspaces');
	});
}
