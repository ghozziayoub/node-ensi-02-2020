const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const student = require('./controllers/studentController')
const admin = require('./controllers/adminController')

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/student',student);
app.use('/admin',admin);

app.get('/', (req, res) => { res.status(200).send('Welcome to FormaLab Server') })

app.listen(3000,() => console.log('Server Started'))