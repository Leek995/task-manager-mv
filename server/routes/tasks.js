const express = require("express");
const router = express.Router();
const { Task } = require("../models");
const checkInputValues = require("../middleware/checkInputValues");

// GET /tasks  all tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.send(tasks);
  } catch (error) {
    next(error);
  }
});

// GET /category  all tasks
router.get("/completed/:completed", async (req, res, next) => {
  try {
    const tasks = await Task.findAll({where : {completed:req.params.completed}});
    res.send(tasks);
  } catch (error) {
    next(error);
  }
});

// GET /id  one task
router.get("/:id", async (req, res, next) => {
  try {
    const tasks = await Task.findOne({where : {id:req.params.id}});
    res.send(tasks);
  } catch (error) {
    next(error);
  }
});

// POST adding an task
router.post("/", checkInputValues, async (req, res, next) => {
  try{
    const [task, created] = await Task.findOrCreate( {
      where: {title: req.body.title},
      defaults:{
        completed: req.body.completed,
      }
    });
    if (!created){
      console.log("Task Exists!")
      res.send(task);
    }
    else if(created){
      console.log("New task created!")
      res.send("New task created!")
    }
  }
  catch(error)
  {
    next(error)
  }
})

// PUT updating an task
router.put("/:id", checkInputValues, async (req, res, next) => {
  try{
    const task = await Task.update(req.body,{
      where: {id: req.params.id},
    });
    res.send("updated")
  }
  catch(error)
  {
    next(error)
  }
})

// DELETE a task
router.delete("/:id", async (req, res, next) => {
  try {
    const tasks = await Task.destroy({ where: { id: req.params.id } });
    if (tasks === 0) {
      throw new Error("No Task deleted");
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
