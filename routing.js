const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const student = require('./controllers/studentController')
const admin = require('./controllers/adminController')
const task = require('./controllers/taskController')


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/student',student);
app.use('/admin',admin);
app.use('/task',task);

app.get('/', (req, res) => { res.status(200).send('Welcome to FormaLab Server') })

app.listen(port,() => console.log('Server Started'))