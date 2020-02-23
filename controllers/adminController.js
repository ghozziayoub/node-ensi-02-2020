const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Admin } = require('./../models/admin');
const { Student } = require('./../models/student');
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


app.post('/login', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    Admin.findOne({email}).then((admin)=>{
        if(!admin){
            res.status(404).send({ message: 'Email Incorrect !' });
        }else{
            let compare = bcrypt.compareSync(password,admin.password);
            if(!compare){
                res.status(404).send({ message: 'Password Incorrect !' });
            }else{
                let token = jwt.sign({adminId:admin._id,role:'admin'},"secretKey");
                res.status(200).send({token});
            }
        }
    }).catch((error)=>{
        res.status(400).send(error);
    })

    
})


app.get('/students', (req, res) => {
    Student.find().then((students) => {
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

app.delete('/delete-student',(req,res)=>{

    let studentId = req.body.studentId;

    Student.findOneAndDelete({_id:studentId}).then(student=>{
        res.status(200).send({message:'student deleted !'});
    }).catch((error) => {
        res.status(400).send(error);
    })
});

module.exports = app