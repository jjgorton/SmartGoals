const db = require('../../data/dbConfig');

module.exports = {
	find,
	add
};

function find() {
	return db('workspaces').select('*');
}

function findById(id) {
	return db('workspaces').select('*').where({ id }).first();
}

async function add(workspace) {
	const [ id ] = await db('workspaces').insert(workspace, 'id');

	return findById(id);
}
