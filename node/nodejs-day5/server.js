const express = require('express');
const connectDB = require('./core/db');
const userRoutes = require('./routers/userRoutes');
const todoRoutes = require('./routers/todoRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));