const express = require('express');
const Router = express.Router();

const { login, dashboard } = require('../controllers/main');

Router.route('/dashboard').get(dashboard);
Router.route('/login').post(login);

module.exports = Router;
