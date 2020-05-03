const db = require('../../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
    findByGoal,
};

function find() {
    return db('steps').select('*');
}

function findBy(filter) {
    return db('steps').where(filter);
}

function findByGoal(id) {
    return db('steps').where({ goal_id: id });
}

async function add(info) {
    const [id] = await db('steps').insert(info, 'id');
    return findById(id);
}

function findById(id) {
    return db('steps').select('*').where({ id }).first();
}

async function update(id, changes) {
    await db('steps').where({ id }).update(changes);
    return findById(id);
}

function remove(id) {
    return db('steps').where('id', id).del();
}
