// server_express.js
const express = require("express");
const morgan = require("morgan");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const DATA_FILE = path.join(__dirname, "todos.json");

// middlewares
app.use(express.json()); // read JSON body
app.use(morgan("dev")); // logging (morgan)
app.use((req, res, next) => {
  // logger  method, originalUrl
  console.log("->", req.method, req.originalUrl);
  if (Object.keys(req.body || {}).length) console.log("   body:", req.body);
  next();
});


async function readTodos() {
  try {
    const txt = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(txt);
  } catch (e) {
    if (e.code === "ENOENT") return []; 
    throw e;
  }
}
async function writeTodos(todos) {
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), "utf8");
}

// Middleware createdBy in POST
function requireCreatedBy(req, res, next) {
  if (!req.body || !req.body.createdBy) {
    const err = new Error("createdBy is required");
    err.statusCode = 400;
    return next(err);
  }
  next();
}

// Middleware updatedBy in PUT
function requireUpdatedBy(req, res, next) {
  if (!req.body || !req.body.updatedBy) {
    const err = new Error("updatedBy is required");
    err.statusCode = 400;
    return next(err);
  }
  next();
}

/* ROUTES */

// GET /todos 
app.get("/todos", async (req, res, next) => {
  try {
    const todos = await readTodos();
    res.json(todos);
  } catch (e) {
    next(e);
  }
});

// GET /todos/:id 
app.get("/todos/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const todos = await readTodos();
    const todo = todos.find((t) => t.id === id);
    if (!todo) return res.status(400).json({ message: "tobic not found" });
    res.json(todo);
  } catch (e) {
    next(e);
  }
});

// POST /todos 
app.post("/todos", requireCreatedBy, async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.challenge)
      return res.status(400).json({ message: "challenge is required" });

    const todos = await readTodos();
    const nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    const newTodo = {
      id: nextId,
      challenge: body.challenge,
      startDate: body.startDate || null,
      status: body.status || "pending",
      createdBy: body.createdBy,
      updatedBy: body.updatedBy || null,
    };
    todos.push(newTodo);
    await writeTodos(todos);
    res.status(200).json({ message: "tobic created", todo: newTodo });
  } catch (e) {
    next(e);
  }
});

// PUT /todos/:id 
app.put("/todos/:id", requireUpdatedBy, async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    const todos = await readTodos();
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(400).json({ message: "tobic not found" });


    if (body.challenge !== undefined) todos[idx].challenge = body.challenge;
    if (body.startDate !== undefined) todos[idx].startDate = body.startDate;
    if (body.status !== undefined) todos[idx].status = body.status;
    todos[idx].updatedBy = body.updatedBy;

    await writeTodos(todos);
    res.status(200).json({ message: "tobic updated", todo: todos[idx] });
  } catch (e) {
    next(e);
  }
});

// DELETE /todos/:id 
app.delete("/todos/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const todos = await readTodos();
    const idx = todos.findIndex((t) => t.id === id);
    if (idx === -1) return res.status(400).json({ message: "tobic not found" });

    const deleted = todos.splice(idx, 1)[0];
    await writeTodos(todos);
    res.status(200).json({ message: "tobic deleted", todo: deleted });
  } catch (e) {
    next(e);
  }
});

/* Error handling middleware */
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message });
});

/* start server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Express server running on http://localhost:${PORT}`)
);


// postman 
// http://localhost:3000/todos
// GET http://localhost:3000/todos/1
// post http://localhost:3000/todos
// {
//   "challenge": "build simple API",
//   "startDate": "2025-09-21",
//   "status": "pending",
//   "createdBy": "Esraa"
// }
// http://localhost:3000/todos/2
// put http://localhost:3000/todos/2
// {
//   "status": "done",
//   "updatedBy": "Esraa"
// }
