const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskNo: {
        type: Number
    },
    taskDescription: {
        type: String
    },
    taskTitle: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date
    },
    priority: { 
        type: String, 
        enum: ["Low", "Medium", "High"], 
        default: "Medium" 
    },
    status: { 
        type: String, 
        enum: ["Pending", "In Progress", "Completed"], 
        default: "Pending" 
    },
    createdAt: { 
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
})

taskSchema.pre("save", async function (next) {
    if (!this.taskNo) {
        const count = await mongoose.model("tasks").countDocuments();
        this.taskNo = count + 1;
    }
    next();
});

const taskModel = mongoose.model('tasks',taskSchema);

module.exports = taskModel;