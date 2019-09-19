const knex = require('knex');

const knexCongig = require('../knexfile');

const dbEnv = process.env.DB_ENV || 'development';

module.exports = knex(knexCongig[dbEnv]);
