const db = require('./dbConfig');

module.exports = {
	find,
	findBy,
	findById,
	add
};

function find() {
	return db('users').select('*');
}

function findBy(filter) {
	return db('users').where(filter);
}

function findById(id) {
	return db('users').select('*').where({ id }).first();
}

async function add(user) {
	const [ id ] = await db('users').insert(user, 'id');

	return findById(id);
}

// still need to add update and delete (how does that effect CASCADE?)
