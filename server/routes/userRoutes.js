const express = require('express');
const routes = express.Router();
const {userRegistration, loginUser} = require('../controllers/userController');

routes.post('/signup', userRegistration)
routes.post('/login', loginUser)

module.exports = routes;