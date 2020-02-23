const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Student } = require('./../models/student');
const { mongoose } = require('./../config/connector');

const app = express();


app.get('/', (req, res) => {
    res.status(200).send('Welcome to Admin Controller')
})

app.post('/register', (req, res) => {

    var salt = bcrypt.genSaltSync(10);
    var password = bcrypt.hashSync("123456789", salt);

    let admin = new Student({
        firstname:'admin' ,
        lastname: 'admin',
        cin:'00000001' ,
        address:'admin' ,
        phone:'20000000' ,
        email: 'admin@admin.com',
        role:'admin',
        password
    })

    admin.save().then((adminFromDataBase) => {
        res.status(200).send({ message: 'You are registered successfully' });
    }).catch((error) => {
        res.status(400).send(error);
    });
})



app.get('/students', (req, res) => {
    Student.find({role:'student'}).then((students) => {
        res.status(200).send(students);
    }).catch((error) => {
        res.status(400).send(error);
    })
})

app.put('/state',(req,res)=>{

    let studentId = req.body.studentId;

    Student.findOne({_id:studentId}).then(student=>{
        student.state = !student.state;
        student.save();
        res.status(200).send({message:'state updated !'});
    }).catch((error) => {
        res.status(400).send(error);
    })
});

app.delete('/delete-student/:studentId',(req,res)=>{

    let studentId = req.params.studentId;

    Student.findOneAndDelete({_id:studentId}).then(student=>{
        res.status(200).send({message:'student deleted !'});
    }).catch((error) => {
        res.status(400).send(error);
    })
});

module.exports = app