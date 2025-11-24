const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const todoSchema = new mongoose.Schema({
    challenge: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'active', 'done'], default: 'pending' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);

module.exports = { User, Todo };
