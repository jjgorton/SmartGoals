const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/users-router');
const workspacesRouter = require('./workspaces/workspaces-router');
const authenticate = require('../auth/authenticate');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/user', usersRouter);
server.use('/workspace', authenticate, workspacesRouter);

server.get('/', (req, res) => {
    res.send(
        'Welcome to the Smart Goals API.  Please see our readme to learn more.'
    );
});

module.exports = server;
