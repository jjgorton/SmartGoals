const db = require('../../data/dbConfig');

module.exports = {
    find,
    add,
    remove,
    update,
    listAllUsersOnWorkspace,
    listAllWorkspacesForUser
};

function find() {
    return db('users_workspaces').select('*');
}

function findById(id, table) {
    return db(`${table}`)
        .select('*')
        .where({ id })
        .first();
}

// function addUser(users_id, workspaces_id) {
// 	return db('users_workspaces').insert()
// }

function listAllWorkspacesForUser(user_id) {
    return db('users_workspaces')
        .join('workspaces', {
            'workspaces.id': 'users_workspaces.workspace_id'
        })
        .select(
            'users_workspaces.workspace_id',
            'users_workspaces.roles',
            'workspaces.name',
            'workspaces.description',
            'workspaces.created_at'
        )
        .where({ user_id });
}

function listAllUsersOnWorkspace(workspace_id) {
    return db('users_workspaces')
        .join('users', { 'users.id': 'users_workspaces.user_id' })
        .select('username', 'roles')
        .where({ workspace_id });
}

function add(userWorkspaceInfo) {
    return db('users_workspaces')
        .insert(userWorkspaceInfo, 'id')
        .then(([id]) => {
            return findById(id, 'users_workspaces');
        });
}

function remove(id) {
    return db('users_workspaces')
        .where('id', id)
        .del();
}

function update(id, changes) {
    return db('users_workspaces')
        .where({ id })
        .update(changes);
}
