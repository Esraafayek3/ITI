const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


const DATA_FILE = path.join(__dirname, "users.json");
const BACKUP_DIR = path.join(__dirname, "backups");


app.use(express.json());

// loadUsers
function loadUsers() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data file:", error.message);
    return [];
  }
}

// saveUsers
function saveUsers(users) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing data file:", error.message);
  }
}

// backupData
function backupData() {
  try {
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(BACKUP_DIR, `users-backup-${timestamp}.json`);

    const data = fs.readFileSync(DATA_FILE, "utf8");
    fs.writeFileSync(backupFile, data);

    console.log(` Backup created: ${backupFile}`);
  } catch (error) {
    console.error("Error creating backup:", error.message);
  }
}


// (Validation)

function validateUserData(username, email, role) {
  if (!username || !email || !role) {
    return "Missing required fields (username, email, role)";
  }
  if (!email.includes("@")) {
    return "Invalid email format";
  }
  if (username.length < 3) {
    return "Username must be at least 3 characters long";
  }
  return null; 
}




app.get("/", (req, res) => {
  res.send(" Server is running");
});


// GET /users - Get all users
app.get("/users", (req, res) => {
  try {
    const users = loadUsers();
    res.status(200).json({
      success: true,
      message: "All users retrieved successfully",
      data: users,
    });
  } catch (err) {
    console.error(" Error loading users:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error while loading users",
    });
  }
});


// GET /users/:id - Get user by ID
app.get("/users/:id", (req, res) => {
  try {
    const users = loadUsers();
    const user = users.find((u) => u.id === parseInt(req.params.id));

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(" Error reading user:", err.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error while getting user",
    });
  }
});

//  POST /users 

app.post("/users", (req, res) => {
  try {
    const users = loadUsers();
    const { username, email, role } = req.body;

    const errorMsg = validateUserData(username, email, role);
    if (errorMsg) {
      return res.status(400).json({ success: false, message: errorMsg });
    }

    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, username, email, role };

    users.push(newUser);
    saveUsers(users);
    backupData(); 
    console.log(`[${new Date().toLocaleString()}] User created:`, newUser);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//  PUT /users/:id — تعديل مستخدم

app.put("/users/:id", (req, res) => {
  try {
    const users = loadUsers();
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { username, email, role } = req.body;

    const errorMsg = validateUserData(
      username || users[userIndex].username,
      email || users[userIndex].email,
      role || users[userIndex].role
    );
    if (errorMsg) {
      return res.status(400).json({ success: false, message: errorMsg });
    }

    if (username) users[userIndex].username = username;
    if (email) users[userIndex].email = email;
    if (role) users[userIndex].role = role;

    saveUsers(users);
    backupData();

    console.log(`[${new Date().toLocaleString()}] User updated:`, users[userIndex]);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: users[userIndex],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//  DELETE /users/:id 

app.delete("/users/:id", (req, res) => {
  try {
    const users = loadUsers();
    const id = parseInt(req.params.id);
    const newUsers = users.filter((u) => u.id !== id);

    if (users.length === newUsers.length) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    saveUsers(newUsers);
    backupData();

    console.log(`[${new Date().toLocaleString()}]  User deleted: ID ${id}`);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


//  Bonus 1: Search by username

app.get("/users/search", (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ success: false, message: "Username query required" });
  }

  const users = loadUsers();
  const results = users.filter((u) =>
    u.username.toLowerCase().includes(username.toLowerCase())
  );

  res.status(200).json({
    success: true,
    message: `Found ${results.length} user(s) matching '${username}'`,
    data: results,
  });
});


//  Bonus 2: User count by role

app.get("/users/count", (req, res) => {
  const users = loadUsers();
  const total = users.length;
  const admins = users.filter((u) => u.role === "admin").length;
  const normalUsers = users.filter((u) => u.role === "user").length;

  res.status(200).json({
    success: true,
    totalUsers: total,
    admins,
    normalUsers,
  });
});


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
