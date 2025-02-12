const express = require('express');
const routes = express.Router();
const authRoutes = require('../middleware/authMiddleware');
const {createTask, fetchAllTask, fetchTask, updateTask, deleteTask} = require('../controllers/dashboardController');

routes.post('/addTask', createTask);
routes.get('/allTask', fetchAllTask);
routes.get('/getTask/:taskNo', fetchTask);
routes.post('/updateTask', updateTask);
routes.post('/deleteTask', deleteTask);

module.exports = routes;