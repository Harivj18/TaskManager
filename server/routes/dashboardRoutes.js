const express = require('express');
const routes = express.Router();
const {routesAuthentication} = require('../middleware/authMiddleware');
const {createTask, fetchAllTask, fetchTask, updateTask, deleteTask, importantTask, getImportantTask, AISuggestion} = require('../controllers/dashboardController');

routes.post('/addTask', routesAuthentication, createTask);
routes.get('/allTask/:userId', routesAuthentication, fetchAllTask);
routes.get('/getImportantTask', routesAuthentication, getImportantTask);
routes.get('/getTask/:taskNo', routesAuthentication, fetchTask);
routes.post('/updateTask', routesAuthentication, updateTask);
routes.post('/importantTask', routesAuthentication, importantTask);
routes.post('/deleteTask', routesAuthentication, deleteTask);
routes.post('/getAISuggestion', routesAuthentication, AISuggestion)

module.exports = routes;