const express = require('express');
const connectDB = require('./db/db');
const session = require('express-session');
const methodOverride = require('method-override');
const userRouter = require('./router/userRouter');
const taskRouter = require('./router/taskRouter');
const app = express();
connectDB;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(session({
    secret: "tasksecret",
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride("_method"));
app.use("/", userRouter);
app.use("/", taskRouter);
app.listen(4000, () => {
    console.log("Server Running on 4000");
});
