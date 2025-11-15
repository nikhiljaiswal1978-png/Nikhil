const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title:      { type: String, required: true },
    description:{ type: String, required: true },
    priority:   { type: String, enum: ["Low", "Medium", "High"], required: true },
    dueDate:    { type: Date, required: true },
    owner:      { type: String, required: true }
});

module.exports = mongoose.model("task", taskSchema);
