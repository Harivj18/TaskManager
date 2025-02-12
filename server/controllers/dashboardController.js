const tasks = require('../models/taskModel');

const createTask = async (req, res) => {
    try {
        let {
            taskNo,
            taskTitle,
            taskDescription,
            dueDate,
            priority,
            status
        } = req.body;

        console.log('req.bpdy',req.body);

        if (taskTitle) {
            const createTask = new tasks({
                taskNo,
                taskTitle,
                taskDescription,
                dueDate,
                priority,
                status
            })

            await createTask.save();

            return res.status(200).send({
                "status": "Success",
                "message": "Task Added Successfully"
            })
        }
        return res.status(500).send({
            "status": "Success",
            "message": "Task Title is Required"
        })

    } catch (error) {
        console.log('dashboardController.js : createTask => Error while Creating New Task',error);
        return res.status(500).send({
            "status": "Failed",
            "message": "Unable to Create Task"
        })
    }
}

const fetchAllTask = async (req, res) => {
    try {
        const taskList = await tasks.find();
        return res.status(200).send({
            "status": 200,
            "message": "Task List Fetched",
            "data": taskList
        })
    } catch (error) {
        console.log('dashboardController.js : fetchTask => Error while Fetching Task List',error);
        return res.status(500).send({
            "status": "Failed",
            "message": "Unable to Fetch Task List"
        })
    }
}

const fetchTask = async (req, res) => {
    try {
        const taskNo = req.params.taskNo
        console.log('taskNo',taskNo);
        
        const fetchTask = await tasks.findOne({taskNo});
        return res.status(200).send({
            "status": 200,
            "message": "Task Fetched",
            "data": fetchTask
        })
    } catch (error) {
        console.log('dashboardController.js : fetchTask => Error while Fetching Task List',error);
        return res.status(500).send({
            "status": "Failed",
            "message": "Unable to Fetch Task List"
        })
    }
} 

const updateTask = async (req, res) => {
    try {
        let {
            taskNo,
        } = req.body;

        console.log('req.body',req.body);
        

        const updateTask = await tasks.updateOne({taskNo}, {$set: req.body}, {upsert: true});
        return res.status(200).send({
            "status": 200,
            "message": "Task updated",
            "data": updateTask
        })
    } catch (error) {
        console.log('dashboardController.js : updateTask => Error while Update a specific Task Status',error);
        return res.status(500).send({
            "status": "Failed",
            "message": "Unable to update task status"
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        let {
            taskNo
        } = req.body;

        const deleteTask = await tasks.deleteOne({taskNo});
        return res.status(200).send({
            "status": 200,
            "message": "Task Deleted",
            "data": deleteTask
        })
    } catch (error) {
        console.log('dashboardController.js : deleteTask => Error while deleteTask a specific Task from dashboard',error);
        return res.status(500).send({
            "status": "Failed",
            "message": "Unable to deleteTask"
        })
    }
}

module.exports = {createTask, fetchAllTask, fetchTask, updateTask, deleteTask};