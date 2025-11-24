const todoModel = require("../core/todo");

class TodoController {
  async getTodos() {
    return await todoModel.find().populate("userId", "userName email");
  }

  async getTodoById(id) {
    const todo = await todoModel.findById(id).populate("userId", "userName email");
    if (!todo) {
      const err = new Error("todo not found");
      err.statusCode = 404;
      throw err;
    }
    return todo;
  }

  async createTodo(data) {
    return await todoModel.create(data);
  }

  async updateTodo(id, data) {
    const todo = await todoModel.findByIdAndUpdate(id, data, { new: true });
    if (!todo) {
      const err = new Error("todo not found");
      err.statusCode = 404;
      throw err;
    }
    return todo;
  }

  async deleteTodo(id) {
    const todo = await todoModel.findByIdAndDelete(id);
    if (!todo) {
      const err = new Error("todo not found");
      err.statusCode = 404;
      throw err;
    }
    return todo;
  }
}

module.exports = new TodoController();
