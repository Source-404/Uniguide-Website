const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/users", async (req, res) => {
  const user = User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// router.post("/users/login", async (req, res) => {
//   try {
//     const user = await User.findByCredentials(
//       req.body.email,
//       req.body.password
//     );
//     const token = await user.generateAuthToken();
//     console.log("verified");
//     res.send({ user, token });
//   } catch (e) {
//     res.status(400).send();
//   }
// });

router.post("/users/login", urlencodedParser, async (req, res) => {
  console.log("here");
  try {
    const user = await User.findByCredentials(req.body.user, req.body.pass);
    console.log("verified");
    console.log(user);
    const token = await user.generateAuthToken();
    res.render("welcome", {
      title: "Welcome",
      name: user.name,
    });
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
  //   const user = await User.find({});
  //   try {
  //     res.send(user);
  //   } catch (e) {
  //     res.status(500).send();
  //   }

  //   User.find({})
  //     .then((users) => {
  //       res.send(users);
  //     })
  //     .catch((e) => {
  //       res.status(500).send();
  //     });
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id);

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }

  //   User.findById(_id)
  //     .then((user) => {
  //       if (!user) {
  //         return res.status(404).send();
  //       }
  //       res.send(user);
  //     })
  //     .catch((e) => {
  //       res.status(500).send();
  //     });
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));

    await user.save();

    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send;
  }
});

module.exports = router;
