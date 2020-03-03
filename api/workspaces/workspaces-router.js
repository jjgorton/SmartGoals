const router = require('express').Router();

const Workspaces = require('./workspaces-model');
const Users_Workspaces = require('../users_workspaces/users_workspaces-model');

router.post('/createWorkspace/:user_id', (req, res) => {
    let workspace = req.body;
    console.log('create workspace');
    Workspaces.add(workspace)
        .then(new_workspace => {
            if (new_workspace.id) {
                const userWorkspaceInfo = {
                    workspace_id: new_workspace.id,
                    user_id: req.params.user_id,
                    roles: 'admin'
                };
                Users_Workspaces.add(userWorkspaceInfo)
                    .then(userWorskspace => {
                        res.status(201).json({
                            workspace: new_workspace,
                            userWorskspace
                        });
                    })
                    .catch(err =>
                        res.status(500).json({ message: err.message })
                    );
            } else {
                res.status(400).json({
                    error: 'Missing user_id'
                });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
});

//Add user to a Workspace
router.post('/addUser', (req, res) => {
    console.log('add user to workspace');
    const userWorkspaceInfo = req.body;

    //TODO check to see if user and workspace exist

    Users_Workspaces.add(userWorkspaceInfo)
        .then(userWorskspace => {
            res.status(201).json({ userWorskspace });
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

// GET all workspaces for a user with user's roles
router.get('/workspaceList/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    Users_Workspaces.listAllWorkspacesForUser(user_id)
        .then(workspaces => {
            res.status(200).json({ workspaces });
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

//Get all Users on a Workspace
router.get('userList/:workspaces_id', (req, res) => {
    const workspace_id = req.params.workspaces_id;

    Users_Workspaces.listAllUsersOnWorkspace(workspace_id)
        .then(usersList => {
            res.status(200).json({
                usersList
            });
        })
        .catch(err => {
            err.message;
        });
});

// TODO: update and delete workspace and user's role

//development only
router.get('/', (req, res) => {
    Workspaces.find()
        .then(workspaces_list => {
            res.status(200).json(workspaces_list);
        })
        .catch(err => err.message);
});

module.exports = router;
