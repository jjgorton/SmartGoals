const db = require('../../data/dbConfig');

module.exports = {
	find,
	add
	// addWorkspace
};

function find() {
	return db('workspaces').select('*');
}

function findById(id, table) {
	return db(`${table}`).select('*').where({ id }).first();
}

function add(workspace) {
	return db('workspaces').insert(workspace, 'id').then(([ id ]) => {
		return findById(id, 'workspaces');
	});
}

// function addWorkspace(workspace) {
// 	db('workspaces').insert(workspace.ws, 'id');
// 	return db('users_workspaces').insert(workspace.user, 'id');
// }

// function addUserWorkspace(userWorkspace) {
//     return db('users_workspaces').insert(userWorkspace, 'id');
// }

// async function addWorkspace(workspace) {
// 	const [ id ] = await db('workspaces').insert(workspace, 'id');
// 	console.log(id);
// 	// return add(userWorkspace);
// 	return findById(id, 'workspaces');
// }

// async function add(userWorkspace) {
// 	const [ id ] = await db('users_workspaces').insert(userWorkspace, 'id');

// 	return findById(id, 'users_workspaces');
// }
