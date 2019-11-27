const router = require('express').Router();

const Users = require('./users-model');

router.post('/register', (req, res) => {
	let user = req.body;
	Users.add(user)
		.then((new_user) => {
			res.status(201).json({
				message : `${new_user.username} successfully registered!`
			});
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

//development only
router.get('/users-list', (req, res) => {
	Users.find().then((users) => res.status(200).json(users)).catch((err) => err.message);
});

module.exports = router;
