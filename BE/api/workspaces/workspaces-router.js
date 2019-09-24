const router = require('express').Router();

const Workspaces = require('./workspaces-model');

router.post('/', (req, res) => {
	let workspace = req.body;

	Workspaces.add(workspace)
		.then((new_workspace) => {
			res.status(201).json({
				message : new_workspace //workspace id from here
			});
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});

	//Users_Workspaces.add(workspace)
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
