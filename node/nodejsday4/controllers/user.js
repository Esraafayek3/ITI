const userModel = require("../core/user");
const todoModel = require("../core/todo");

class UserController {
  async getUsers() {
    return await userModel.find();
  }

  async getUserById(id) {
    const user = await userModel.findById(id);
    if (!user) throw new Error("user not found");

    const todos = await todoModel.find({ userId: user._id });
    return { user, todos };
  }

  async createUser(data) {
    const exists = await userModel.findOne({ email: data.email });
    if (exists) {
      const err = new Error("user already exist");
      err.statusCode = 409;
      throw err;
    }
    return await userModel.create(data);
  }

  async updateUser(id, data) {
    delete data._id;
    const user = await userModel.findByIdAndUpdate(id, data, { new: true });
    if (!user) {
      const err = new Error("user not found");
      err.statusCode = 404;
      throw err;
    }
    return user;
  }

  async deleteUser(id) {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      const err = new Error("user not found");
      err.statusCode = 404;
      throw err;
    }
    return user;
  }
}

module.exports = new UserController();
