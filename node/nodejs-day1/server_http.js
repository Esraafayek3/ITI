const http = require("http");
const { URL } = require("url");

let todos = [
  {
    id: 1,
    challenge: "learn Http",
    startDate: "2025-02-03",
    status: "pending",
  },
];
let nextId = 2;

function send(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// read ( POST/PUT)
function getBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        resolve(null);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // GET /todos
  if (req.method === "GET" && url.pathname === "/todos") {
    return send(res, 200, todos);
  }

  // GET /todos/:id
  if (req.method === "GET" && url.pathname.startsWith("/todos/")) {
    const id = +url.pathname.split("/")[2];
    const todo = todos.find((t) => t.id === id);
    return todo
      ? send(res, 200, todo)
      : send(res, 400, { message: "tobic not found" });
  }

  // POST /todos
  if (req.method === "POST" && url.pathname === "/todos") {
    const body = await getBody(req);
    if (body === null) return send(res, 400, { message: "invalid json" });

    const newTodo = {
      id: nextId++,
      challenge: body.challenge,
      startDate: body.startDate || null,
      status: body.status || "pending",
    };
    todos.push(newTodo);
    return send(res, 200, { message: "tobic created", todo: newTodo });
  }

  // PUT /todos/:id
  if (req.method === "PUT" && url.pathname.startsWith("/todos/")) {
    const id = +url.pathname.split("/")[2];
    const todo = todos.find((t) => t.id === id);
    if (!todo) return send(res, 400, { message: "tobic not found" });

    const body = await getBody(req);
    if (body.challenge) todo.challenge = body.challenge;
    if (body.startDate) todo.startDate = body.startDate;
    if (body.status) todo.status = body.status;

    return send(res, 200, { message: "tobic updated", todo });
  }

  // DELETE /todos/:id
  if (req.method === "DELETE" && url.pathname.startsWith("/todos/")) {
    const id = +url.pathname.split("/")[2];
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) return send(res, 400, { message: "tobic not found" });

    const deleted = todos.splice(index, 1)[0];
    return send(res, 200, { message: "tobic deleted", todo: deleted });
  }

  send(res, 404, { message: "Not Found" });
});

server.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);

// Postman
// GET http://localhost:3000/todos
// curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"challenge":"study Node"}'
