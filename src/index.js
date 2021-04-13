const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const path = require("path");
const hbs = require("hbs");

// paths for config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

// handle bars setup
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partials);

//seperate routers
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up", {
    title: "Sign-up",
  });
});

// app.post("/welcome", (req, res) => {
//   // const name = req.query.name;
//   res.render("welcome", {
//     title: "Welcome",
//     name: "source",
//   });
// });

app.post("/welcome", async (req, res) => {
  const name = User(req.body.name);
  console.log(name);
});

app.get("/log-in", (req, res) => {
  res.render("log-in", {
    title: "Log-in",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

//background-color: #e67e22;
