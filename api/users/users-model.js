const db = require('../../data/dbConfig');

module.exports = {
    find,
    findBy,
    findById,
    add,
    remove,
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
    console.log('******users.add');
    const [id] = await db('users').insert(user, 'id');

    return findById(id);
}

function remove(id) {
    return db('users').where('id', id).del();
}

// still need to add update
