const express = require('express');

const { Admin } = require('./../models/admin');
const { mongoose } = require('./../config/connector');

const app = express();


app.get('/', (req, res) => {
    res.status(200).send('Welcome to Admin Controller')
})

app.post('/register', (req, res) => {
    let data = req.body;

    var salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    let admin = new Admin({
        email: data.email,
        password: data.password
    })

    admin.save().then((adminFromDataBase) => {
        res.status(200).send({ message: 'You are registered successfully' });
    }).catch((error) => {
        res.status(400).send(error);
    });
})

app.get('/students', (req, res) => {

    Student.find().then((students) => {
        res.status(200).send(students);
    }).catch((error) => {
        res.status(400).send(error);
    })
})


module.exports = app