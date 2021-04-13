const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.post("/tasks", async (req, res) => {
  try {
    const task = Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }

  //   const task = Task(req.body);

  //   task
  //     .save()
  //     .then(() => {
  //       res.status(201).send(task);
  //     })
  //     .catch((e) => {
  //       res.status(400).send(e);
  //     });
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }

  //   Task.find({})
  //     .then((tasks) => {
  //       res.send(tasks);
  //     })
  //     .catch((e) => {
  //       res.status(500).send();
  //     });
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

  //   Task.findById(_id)
  //     .then((task) => {
  //       if (!task) {
  //         return res.status(404).send();
  //       }
  //       res.send(task);
  //     })
  //     .catch((e) => {
  //       res.status(500).send();
  //     });
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();
    //   try {
    //     const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //       new: true,
    //       runValidators: true,
    //     });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send;
  }
});

module.exports = router;
