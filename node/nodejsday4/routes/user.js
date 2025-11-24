const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await userController.getUsers();
    res.json(users);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await userController.getUserById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await userController.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await userController.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await userController.deleteUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message });
  }
});

module.exports = router;
