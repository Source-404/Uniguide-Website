const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const Project = require("./models/project");
const auth = require("./middleware/auth");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const projRouter = require("./routers/project");
const path = require("path");
const hbs = require("hbs");

// paths for config
const publicDirectoryPath = path.join(__dirname, "..");
const viewPath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT;

// handle bars setup
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partials);

//seperate routers
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(projRouter);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up", {
    title: "Sign-up",
  });
});

app.get("/gallery", (req, res) => {
  res.render("gallery");
});

app.get("/add", (req, res) => {
  res.render("add");
});
app.get("/profile", (req, res) => {
  res.render("profile");
});
// app.post("/welcome", (req, res) => {
//   // const name = req.query.name;
//   res.render("welcome", {
//     title: "Welcome",
//     name: "source",
//   });
// });

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//background-color: #e67e22;
