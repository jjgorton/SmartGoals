const router = require('express').Router();
const bcrypt = require('bcryptjs');
const tokenService = require('../../auth/token-service');
const Users = require('./users-model');
const authenticate = require('../../auth/authenticate');

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then((new_user) => {
            const token = tokenService.generateToken(new_user);
            res.status(201).json({
                message: `${new_user.username} successfully registered!`,
                token,
            });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = tokenService.generateToken(user);
                res.status(200).json({
                    message: `Welcome ${user.username}!`,
                    user_id: user.id,
                    username: user.username,
                    email: user.email,
                    created_at: user.created_at,
                    token,
                });
            } else {
                res.status(401).json({
                    message: 'Invalid username or password.',
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

router.delete('/', authenticate, (req, res) => {
    const userId = req.decodedJwt.subject;
    Users.remove(userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'Invalid user ID' });
            } else {
                res.status(204).end();
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: 'Oops, something went wrong',
                message: err.message,
            });
        });
});

router.get('/', authenticate, (req, res) => {
    const userId = req.decodedJwt.subject;
    Users.findById(userId)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(500).json({
                error: 'Oops, something went wrong',
                message: err.message,
            });
        });
});

// TODO: UPDATE user info with authenticate middelware!.

//development only
// router.get('/users-list', (req, res) => {
//     Users.find()
//         .then((users) => res.status(200).json(users))
//         .catch((err) => err.message);
// });

module.exports = router;
