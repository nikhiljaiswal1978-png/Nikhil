const express = require('express');
const { addTask, editTaskForm, updateTask, deleteTask } = require('../controller/taskController');

const router = express.Router();

router.get("/add", (req, resp) => resp.render("add"));
router.post("/add", addTask);

router.get("/edit/:id", editTaskForm);
router.put("/edit/:id", updateTask);

router.delete("/delete/:id", deleteTask);

module.exports = router;
