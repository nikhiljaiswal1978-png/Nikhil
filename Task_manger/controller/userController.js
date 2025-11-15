const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const taskModel = require('../models/taskModel');

const register = async(req, resp) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        await userModel.create({ username, email, password: hash });
        resp.redirect("/login");
    } catch (error) {
        console.log(error);
    }
}

const login = async(req, resp) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.username = username;
            req.session.userID = user._id;
            resp.redirect("/dashboard");
        } else {
            resp.redirect("/login");
        }
    } catch (error) {
        console.log(error);
    }
}

const dashboard = async(req, resp) => {
    try {
        if (!req.session.username) return resp.redirect("/login");

        const q = req.query.q || "";
        
        const filter = { owner: req.session.userID };
        if (q) filter.title = { $regex: q, $options: "i" };

        const tasks = await taskModel.find(filter);
        resp.render("dashboard", { username: req.session.username, tasks, q });
    } catch (error) {
        console.log(error);
    }
}

const logout = (req, resp) => {
    req.session.destroy(() => {
        resp.redirect("/login");
    });
}

module.exports = { register, login, dashboard, logout };
