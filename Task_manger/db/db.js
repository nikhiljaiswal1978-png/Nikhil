const mongoose = require('mongoose');

const connectDB = mongoose.connect("mongodb://localhost:27017/task_manager")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

module.exports = connectDB;
