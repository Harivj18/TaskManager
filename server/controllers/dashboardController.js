const tasks = require('../models/taskModel');

const createTask = async (req, res) => {
    try {
        let {
            taskNo,
            taskTitle,
            taskDescription,
            dueDate,
            priority,
            status,
            userId
        } = req.body;


        if (taskTitle) {
            const createTask = new tasks({
                taskNo,
                taskTitle,
                taskDescription,
                dueDate,
                priority,
                status,
                userId
            })

            await createTask.save();

            return res.status(200).send({
                "status": "Success",
                "message": "Task Added Successfully"
            })
        }
        return res.status(200).send({
            "status": "Success",
            "message": "Task Title is Required"
        })

    } catch (error) {
        console.log('dashboardController.js : createTask => Error while Creating New Task',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Unable to Create Task"
        })
    }
}

const fetchAllTask = async (req, res) => {
    try {
       let userId = req.params.userId;
        const taskList = await tasks.find({userId});
        return res.status(200).send({
            "status": "Success",
            "message": "Task List Fetched",
            "data": taskList
        })
    } catch (error) {
        console.log('dashboardController.js : fetchTask => Error while Fetching Task List',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Unable to Fetch Task List"
        })
    }
}

const fetchTask = async (req, res) => {
    try {
        const taskNo = req.params.taskNo
        
        const fetchTask = await tasks.findOne({taskNo});
        return res.status(200).send({
            "status": 200,
            "message": "Task Fetched",
            "data": fetchTask
        })
    } catch (error) {
        console.log('dashboardController.js : fetchTask => Error while Fetching Task List',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Unable to Fetch Task List"
        })
    }
} 

const updateTask = async (req, res) => {
    try {
        let {
            taskNo,
            taskTitle,
            taskDescription,
            dueDate,
            priority,
            status,
        } = req.body;        

        const updateTask = await tasks.updateOne({taskNo}, {$set: req.body}, {upsert: true});
        return res.status(200).send({
            "status": "success",
            "message": "Task updated",
            "data": updateTask
        })
    } catch (error) {
        console.log('dashboardController.js : updateTask => Error while Update a specific Task Status',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Unable to update task status"
        })
    }
}

const importantTask = async (req, res) => {
    try {
        let {
            taskNo,
            isImportant
        } = req.body;

        const ImportantTask = await tasks.updateOne({taskNo}, {$set: {"isImportantTask": isImportant}}, {upsert: true});
        return res.status(200).send({
            "status": "success",
            "message": "ImportantTask Status updated",
            "data": ImportantTask
        })
    } catch (error) {
        console.log('dashboardController.js : importantTask => Error while Update a important Task Status',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Unable to Update Important task status"
        })
    }
}

const getImportantTask = async (req, res) => {
    try {
        const taskList = await tasks.find({"isImportantTask": true});
        return res.status(200).send({
            "status": "Success",
            "message": "Important List Fetched",
            "data": taskList
        })
    } catch (error) {
        console.log('dashboardController.js : fetchTask => Error while Fetching Important Task List',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Unable to Fetch Task List"
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
            "status": "success",
            "message": "Task Deleted",
            "data": deleteTask
        })
    } catch (error) {
        console.log('dashboardController.js : deleteTask => Error while deleteTask a specific Task from dashboard',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Unable to deleteTask"
        })
    }
}

const AISuggestion = async (req, res) => {
    try {
       
        const { GoogleGenerativeAI } = require("@google/generative-ai");


        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = 'Give me a random new task suggestion every time I prompt  within 50 words only Headlines Line by line, show some suggestion for Health Related & MERN Related technology,'

        const result = await model.generateContent(prompt);
   

        return res.status(200).send({
            "status": "Success",
            "message": "AI Suggestion Completed",
            "data": result.response.text()
        })
    } catch (error) {
        console.log('dashboardController.js : AISuggestion => Error while getting AI Based Suggestion',error);
        return res.status(200).send({
            "status": "Failed",
            "message": "Getting AI Based Suggestion"
        })
    }
}

module.exports = {createTask, fetchAllTask, fetchTask, updateTask, deleteTask, importantTask, getImportantTask, AISuggestion};