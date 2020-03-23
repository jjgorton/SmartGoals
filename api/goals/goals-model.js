const db = require('../../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove,
    findByWorkspace
};

function find() {
    return db('goals').select('*');
}

function findBy(filter) {
    return db('goals').where(filter);
}

function findByWorkspace(id) {
    return db('goals').where({ workspace_id: id });
}

async function add(info) {
    const [id] = await db('goals').insert(info, 'id');
    return findById(id);
}

function findById(id) {
    return db('goals')
        .select('*')
        .where({ id })
        .first();
}

async function update(id, changes) {
    await db('goals')
        .where({ id })
        .update(changes);
    return findById(id);
}

function remove(id) {
    return db('goals')
        .where('id', id)
        .del();
}
