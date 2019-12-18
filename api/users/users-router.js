const router = require('express').Router();

const Users = require('./users-model');

router.post('/register', (req, res) => {
    let user = req.body;
    Users.add(user)
        .then(new_user => {
            res.status(201).json({
                message: `${new_user.username} successfully registered!`
            });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    Users.remove(userId)
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'Invalid user ID' });
            } else {
                res.status(204).end();
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'Oops, something went wrong',
                message: err.message
            });
        });
});

// TODO: update user info and GET all workspaces for a user with user's roles.

//development only
router.get('/users-list', (req, res) => {
    Users.find()
        .then(users => res.status(200).json(users))
        .catch(err => err.message);
});

module.exports = router;
