const mongoose = require('mongoose');

mongoose.connect('mongodb://ds243812.mlab.com:43812/studentsTasksApp',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true
})

module.exports = {mongoose}