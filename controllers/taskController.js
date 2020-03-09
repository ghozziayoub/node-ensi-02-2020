const express = require('express');
const _ = require('lodash');

const { Task } = require('./../models/task');
const { mongoose } = require('./../config/connector');

const app = express();


app.get('/', (req, res) => {
    res.status(200).send('Welcome to task Controller')
})

app.post('/add', (req, res) => {
    let data = req.body;

    let task = new Task({
        title: data.title,
        studentId: data.studentId
    })

    task.save().then((taskFromDataBase) => {
        res.status(200).send({ message: 'Task added successfully' });
    }).catch((error) => {
        res.status(400).send(error);
    });
})

app.get('/all/:studentId', (req, res) => {
    let studentId = req.params.studentId;

    Task.find({ studentId }).then((tasks) => {
        let tasksList = _.filter(tasks, { "completed": false });
        let doneList = _.filter(tasks, { "completed": true });
        res.status(200).send({ tasksList, doneList });
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.delete('/delete/:taskId', (req, res) => {
    let taskId = req.params.taskId;

    Task.findOneAndDelete({ _id: taskId }).then((task) => {
        res.status(200).send({ message: "Task Deleted !" });
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.put('/endTask', (req, res) => {

    let taskId = req.body.taskId;

    Task.findOne({ _id: taskId }).then((task) => {
        task.completed = !task.completed;
        task.completedAt = new Date();
        task.save();
        res.status(200).send({ message: "Task Ended !" });
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.put('/update', (req, res) => {

    let taskId = req.body.taskId;
    let title = req.body.title;

    Task.findOne({ _id: taskId }).then((task) => {
        task.title = title;
        task.save();
        res.status(200).send({ message: "Task updated !" });
    }).catch((error) => {
        res.status(400).send(error);
    })
})

module.exports = app