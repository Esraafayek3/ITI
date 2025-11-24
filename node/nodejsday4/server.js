const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// routers
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");

async function startServer() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/lab4", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Connected to MongoDB");

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));

    // custom logger middleware
    app.use((req, res, next) => {
      console.log(
        `url: ${req.url}, method: ${req.method}, params: ${JSON.stringify(
          req.params
        )}, body: ${JSON.stringify(req.body)}`
      );
      next();
    });

    // routers
    app.use("/users", userRouter);
    app.use("/todos", todoRouter);

    // not found route
    app.all("*", (req, res, next) => {
      next(new Error(` url ${req.url} with method ${req.method} not exist`));
    });

    // error handler middleware
    app.use((error, req, res, next) => {
      res.status(500).json({ message: error.message });
    });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to connect to DB:", err.message);
  }
}

startServer();
