const router = require('express').Router();

const Workspaces = require('./workspaces-model');
const Users_Workspaces = require('../users_workspaces/users_workspaces-model');

router.post('/:user_id', (req, res) => {
	let workspace = req.body;

	Workspaces.add(workspace)
		.then((new_workspace) => {
			if (new_workspace.id) {
				const userWorkspaceInfo = {
					workspace_id : new_workspace.id,
					user_id      : req.params.user_id,
					roles        : 'admin'
				};
				Users_Workspaces.add(userWorkspaceInfo).then((userWorskspace) => {
					res.status(201).json({
						workspace      : new_workspace,
						userWorskspace
					});
				});
			}
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

//development only
router.get('/', (req, res) => {
	Workspaces.find()
		.then((workspaces_list) => {
			res.status(200).json(workspaces_list);
		})
		.catch((err) => err.message);
});

module.exports = router;
