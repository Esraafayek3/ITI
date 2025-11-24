const express = require("express");
const todoController = require("../controllers/todo");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await todoController.getTodos();
    res.json(todos);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await todoController.getTodoById(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = await todoController.createTodo(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const todo = await todoController.updateTodo(req.params.id, req.body);
    res.json(todo);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await todoController.deleteTodo(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
});

module.exports = router;
