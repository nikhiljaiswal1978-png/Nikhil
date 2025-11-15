const express = require('express');
const { register, login, dashboard, logout } = require('../controller/userController');
const router = express.Router();

router.get("/register", (req, resp) => resp.render("register"));
router.post("/register", register);

router.get("/login", (req, resp) => resp.render("login"));
router.post("/login", login);

router.get("/dashboard", dashboard);

router.get("/logout", logout);

module.exports = router;
