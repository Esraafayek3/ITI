// 1. **Synchronous File Reading**

//    - Read a JSON file synchronously using `fs.readFileSync()`
//    - Parse the JSON data and log it to the console
//    - Handle any potential errors
const fs = require("fs");

try {
  const data = fs.readFileSync("data.json", "utf8");

  const jsonData = JSON.parse(data);

  console.log("File content:", jsonData);
} catch (error) {
  console.error("Error reading file:", error.message);
}

// 2. **Asynchronous File Reading (Callback Style)**

//    - Read the same file using `fs.readFile()` with a callback
//    - Parse and log the data
//    - Implement proper error handling
fs.readFile("data.json", "utf8", (error, data) => {
  if (error) {
    console.error("Error reading file:", error.message);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    console.log("File content (Async):", jsonData);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError.message);
  }
});

// 3. **Promise-based File Reading**

//    - Use `fs.promises.readFile()` or promisify the callback version
//    - Handle the promise with `.then()` and `.catch()`
const fs = require("fs").promises;

fs.readFile("data.json", "utf8")
  .then((data) => {
    const jsonData = JSON.parse(data);
    console.log("File content (Promise):", jsonData);
  })
  .catch((error) => {
    console.error("Error reading file:", error.message);
  });

// 4. **Async/Await File Reading**
//    - Create an async function that uses `await` with `fs.promises.readFile()`
//    - Wrap it in a try-catch block for error handling
const fs = require("fs").promises;

async function readFileAsync() {
  try {
    const data = await fs.readFile("data.json", "utf8");

    const jsonData = JSON.parse(data);

    console.log("File content (Async/Await):", jsonData);
  } catch (error) {
    console.error("Error reading file:", error.message);
  }
}

readFileAsync();

// ### Assignment 1.2: File Writing Operations

// Extend your `file-operations.js` to include:

// 1. **Adding Data to JSON File**

//    - Read the existing JSON file
//    - Add a new user object to the array
//    - Write the updated data back to the file
//    - Implement this using both synchronous and asynchronous methods
// 1-synchronous method

try {
  const data = fs.readFileSync("users.json", "utf8");

  const users = JSON.parse(data);

  const newUser = {
    id: 7,
    username: "esraa",
    email: "esraa@example.com",
    role: "user",
  };
  users.push(newUser);

  fs.writeFileSync("data.json", JSON.stringify(users));

  console.log(" Data added successfully (Sync)");
} catch (error) {
  console.error(" Error:", error.message);
}

// 2- asynchronous method
const fsPromises = require("fs").promises;

async function addUserAsync() {
  try {
    const data = await fsPromises.readFile("users.json", "utf8");

    const users = JSON.parse(data);

    const newUser = {
      id: 8,
      username: "amira",
      email: "amira@example.com",
      role: "user",
    };
    users.push(newUser);

    await fsPromises.writeFile("data.json", JSON.stringify(users));

    console.log(" Data added successfully (Async)");
  } catch (error) {
    console.error(" Error:", error.message);
  }
}

addUserAsync();

// 2. **Creating a Backup System**
//    - Create a function that backs up your data file
//    - Name the backup with a timestamp (e.g., `data-backup-2024-01-15.json`)

const fs = require("fs").promises;
const path = require("path");

async function backupDataFile() {
  try {
    const originalFile = "data.json";

    const data = await fs.readFile(originalFile, "utf8");

    const timestamp = new Date().toISOString().split("T")[0];
    const backupFile = `users-backup-${timestamp}.json`;

    await fs.writeFile(backupFile, data);

    console.log(`Backup created successfully: ${backupFile}`);
  } catch (error) {
    console.error(" Error creating backup:", error.message);
  }
}

backupDataFile();
