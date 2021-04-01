const router = require('express').Router();

const Workspaces = require('./workspaces-model');
const Users_Workspaces = require('../users_workspaces/users_workspaces-model');
const permissions = require('../../auth/permissions');

router.post('/createWorkspace', (req, res) => {
    let workspace = req.body;

    Workspaces.add(workspace)
        .then((new_workspace) => {
            // 'if/else' not needed here - handle higher up or as middleware
            if (new_workspace.id) {
                const userWorkspaceInfo = {
                    workspace_id: new_workspace.id,
                    user_id: req.decodedJwt.subject,
                    roles: 'admin',
                };
                Users_Workspaces.add(userWorkspaceInfo)
                    .then((userWorkspace) => {
                        res.status(201).json({
                            workspace_id: new_workspace.id,
                            roles: userWorkspace.roles,
                            name: new_workspace.name,
                            description: new_workspace.description,
                            created_at: new_workspace.created_at,
                        });
                    })
                    .catch((err) =>
                        res.status(500).json({ message: err.message })
                    );
            } else {
                res.status(400).json({
                    error: 'Missing user_id',
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

//Delete WS
router.delete('/:id', permissions.ws(['admin']), (req, res) => {
    const wsID = req.params.id;
    Workspaces.remove(wsID)
        .then((ws) => {
            if (!ws) {
                res.status(404).json({
                    message: 'Workspace ID does not exist.',
                });
            } else {
                res.status(200).json({
                    message: `Successfully deleted ${wsID}`,
                    wsID: wsID,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

//Update WS
router.put('/:id', permissions.ws(['admin']), (req, res) => {
    const wsID = req.params.id;
    const newInfo = req.body;
    Workspaces.update(wsID, newInfo)
        .then((ws) => {
            if (!ws) {
                res.status(404).json({
                    message: 'Workspace ID does not exist.',
                });
            } else {
                res.status(200).json(ws);
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

//Add user to a Workspace
router.post('/addUser', permissions.ws(['admin']), (req, res) => {
    const userWorkspaceInfo = req.body;

    //TODO check to see if user and workspace exist

    Users_Workspaces.add(userWorkspaceInfo)
        .then((userWorskspace) => {
            res.status(201).json({ userWorskspace });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
});

// GET all workspaces for a user with user's roles
router.get('/workspaceList', (req, res) => {
    const user_id = req.decodedJwt.subject;

    Users_Workspaces.listAllWorkspacesForUser(user_id)
        .then((workspaces) => {
            res.status(200).json({ workspaces });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
});

//Get all Users on a Workspace
router.get(
    'userList/:workspaces_id',
    permissions.ws(['admin', 'contrib', 'viewer']),
    (req, res) => {
        const workspace_id = req.params.workspaces_id;

        Users_Workspaces.listAllUsersOnWorkspace(workspace_id)
            .then((usersList) => {
                res.status(200).json({
                    usersList,
                });
            })
            .catch((err) => {
                err.message;
            });
    }
);

// TODO: remove users and update user's roles
// TODO: allow users to leave a WS if they are not the only admin.

//development only
// router.get('/', (req, res) => {
//     Workspaces.find()
//         .then((workspaces_list) => {
//             res.status(200).json(workspaces_list);
//         })
//         .catch((err) => err.message);
// });

module.exports = router;
