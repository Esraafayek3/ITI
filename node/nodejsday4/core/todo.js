const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  challenge: { type: String, required: true },
  startDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "active", "done"], default: "pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;
