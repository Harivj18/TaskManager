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
        type: String,
        required: true
    },
    priority: { 
        type: String, 
        enum: ["Low", "Medium", "High"], 
        default: "Medium" 
    },
    status: { 
        type: String, 
        enum: ["Open","Pending", "InProgress", "Completed"], 
        default: "Open" 
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    isImportantTask: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})

taskSchema.pre("save", async function (next) {
    if (!this.taskNo) {
        const count = await mongoose.model("tasks").countDocuments({ userId: this.userId })
        this.taskNo = count + 1;
    }
    next();
});

const taskModel = mongoose.model('tasks',taskSchema);

module.exports = taskModel;