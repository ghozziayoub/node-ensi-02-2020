const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Student } = require('./../models/student');
const { mongoose } = require('./../config/connector');

const app = express();


app.get('/', (req, res) => {
    res.status(200).send('Welcome to Student Controller')
})

app.post('/register', (req, res) => {
    let data = req.body;

    var salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    let student = new Student({
        firstname: data.firstname,
        lastname: data.lastname,
        cin: data.cin,
        address: data.address,
        phone: data.phone,
        email: data.email,
        password: data.password
    })

    student.save().then((studentFromDataBase) => {
        res.status(200).send({ message: 'You are registered successfully' });
    }).catch((error) => {
        res.status(400).send(error);
    });
})


app.post('/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    Student.findOne({ email }).then((student) => {
        if (!student) {
            res.status(404).send({ message: 'Email Incorrect !' });
        } else {
            let compare = bcrypt.compareSync(password, student.password);
            if (!compare) {
                res.status(404).send({ message: 'Password Incorrect !' });
            } else {
                if (!student.state) {
                    res.status(400).send({ message: 'You are not allowed !' });
                } else {
                    let token = jwt.sign({ studentId: student._id, role: student.role }, "secretKey");
                    res.status(200).send({ token });
                }
            }
        }
    }).catch((error) => {
        res.status(400).send(error);
    })


})

module.exports = app