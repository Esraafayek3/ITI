const { Todo } = require('../core/schemas');

exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(400).json({ message: 'tobic not found' });
        }
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createTodo = async (req, res) => {
    const { challenge, userId } = req.body;
    try {
        const newTodo = new Todo({ challenge, userId });
        await newTodo.save();
        res.status(200).json({ message: 'tobic created', tobic: newTodo });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(400).json({ message: 'tobic not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(400).json({ message: 'tobic not found' });
        }
        res.status(200).json(deletedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
