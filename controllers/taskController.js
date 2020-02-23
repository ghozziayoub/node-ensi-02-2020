const express = require('express');

const { Task } = require('./../models/task');
const { mongoose } = require('./../config/connector');

const app = express();


app.get('/', (req, res) => {
    res.status(200).send('Welcome to task Controller')
})

app.post('/add', (req, res) => {
    let data = req.body;

    let task = new Task({
        title:data.title,
        studentId:data.studentId
    })

    task.save().then((taskFromDataBase) => {
        res.status(200).send({ message: 'Task added successfully' });
    }).catch((error) => {
        res.status(400).send(error);
    });
})



module.exports = app