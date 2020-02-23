const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    studentId: {
        type: String,
        required: true,
    },
    dateAdded: {
        type: Date,
        default: new Date()
    },
    completedAt: {
        type: Date,
        default: null
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Task = mongoose.model('task', TaskSchema);

module.exports = { Task };