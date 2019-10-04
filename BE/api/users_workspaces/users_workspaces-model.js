const db = require('../../data/dbConfig');

module.exports = {
	find,
	add,
	listAllUsersOnWorkspace
};

function find() {
	return db('users_workspaces').select('*');
}

function findById(id, table) {
	return db(`${table}`).select('*').where({ id }).first();
}

// function addUser(users_id, workspaces_id) {
// 	return db('users_workspaces').insert()
// }

function listAllUsersOnWorkspace(workspace_id) {
	return db('users_workspaces')
		.join('users', { 'users.id': 'users_workspaces.user_id' })
		.select('username', 'roles')
		.where({ workspace_id });
}

function add(userWorkspaceInfo) {
	return db('users_workspaces').insert(userWorkspaceInfo, 'id').then(([ id ]) => {
		return findById(id, 'users_workspaces');
	});
}
