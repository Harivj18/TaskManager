const express = require('express');
const routes = express.Router();
const {userRegistration, loginUser, userLogout} = require('../controllers/userController');
const {routesAuthentication, verifyAuthorization} = require('../middleware/authMiddleware');

routes.post('/signup', userRegistration)
routes.post('/login', loginUser)
routes.post('/logout', userLogout)
routes.get('/authCheck', verifyAuthorization)

module.exports = routes;