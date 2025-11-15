const taskModel = require('../models/taskModel');
const addTask = async(req, resp) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        await taskModel.create({
            title,
            description,
            priority,
            dueDate,
            owner: req.session.userID
        });
        resp.redirect("/dashboard");
    } catch (err) {
        console.log(err);
    }
}
const editTaskForm = async(req, resp) => {
    const task = await taskModel.findById(req.params.id);
    resp.render("edit", { task });
}
const updateTask = async(req, resp) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        await taskModel.findByIdAndUpdate(req.params.id, {
            title, description, priority, dueDate
        });
        resp.redirect("/dashboard");
    } catch (err) {
        console.log(err);
    }
}
const deleteTask = async(req, resp) => {
    try {
        await taskModel.findByIdAndDelete(req.params.id);
        resp.redirect("/dashboard");
    } catch (err) {
        console.log(err);
    }
}
module.exports = { addTask, editTaskForm, updateTask, deleteTask };
