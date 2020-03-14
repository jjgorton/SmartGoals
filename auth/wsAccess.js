const Users_Workspaces = require('../api/users_workspaces/users_workspaces-model');

module.exports = role => (req, res, next) => {
    //the role parameter should be an array with
    //  the allowed access level ['admin', 'contrib', 'viewer']
    const user_id = req.decodedJwt.subject;
    const wsID = req.params.id || req.body.workspace_id;

    Users_Workspaces.listAllUsersOnWorkspace(wsID)
        .then(usersList => {
            const access = usersList.find(user => user.id === user_id);
            if (access && role.includes(access.roles)) {
                next();
            } else {
                res.status(403).json({
                    message: 'Access Denied: User does not have access.'
                });
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
};
