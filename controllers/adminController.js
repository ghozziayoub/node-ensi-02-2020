const express = require('express');

const { Student } = require('./../models/student');
const { mongoose } = require('./../config/connector');

const app = express();


app.get('/', (req, res) => {
    res.status(200).send('Welcome to Admin Controller')
})

app.get('/all', (req, res) => {

    Student.find().then((students) => {
        res.status(200).send(students);
    }).catch((error) => {
        res.status(400).send(error);
    })
})


module.exports = app