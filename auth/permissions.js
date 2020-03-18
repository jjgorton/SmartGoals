const Users_Workspaces = require('../api/users_workspaces/users_workspaces-model');
const Goals = require('../api/goals/goals-model');

module.exports = {
    ws,
    goal
};

function ws(role) {
    return (req, res, next) => {
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
}

function goal(role) {
    return (req, res, next) => {
        const user_id = req.decodedJwt.subject;
        const goalID = req.params.id || req.body.id;
        if (!goalID) {
            res.status(404).json({ message: 'Missing Goal ID' });
        } else {
            Goals.findById(goalID).then(goal => {
                const wsID = goal.workspace_id;

                Users_Workspaces.listAllUsersOnWorkspace(wsID)
                    .then(usersList => {
                        const access = usersList.find(
                            user => user.id === user_id
                        );
                        if (access && role.includes(access.roles)) {
                            next();
                        } else {
                            res.status(403).json({
                                message:
                                    'Access Denied: User does not have access.'
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).json(err.message);
                    });
            });
        }
    };
}
