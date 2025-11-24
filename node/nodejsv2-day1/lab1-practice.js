const students = [
  { name: "Alice", age: 20, grade: 85, subjects: ["Math", "Physics"] },
  { name: "Bob", age: 22, grade: 92, subjects: ["Chemistry", "Biology"] },
  { name: "Charlie", age: 19, grade: 78, subjects: ["Math", "Chemistry"] },
  { name: "Diana", age: 21, grade: 95, subjects: ["Physics", "Biology"] },
  { name: "Eve", age: 20, grade: 88, subjects: ["Math", "Biology"] },
];

// array of student names only
const names = students.map((student) => student.name);
console.log(names);

// array of objects with `name` and `status` where status is "Pass" if grade >= 80, otherwise "Fail"
const statusArray = students.map((student) => ({
  name: student.name,
  status: student.grade >= 80 ? "Pass" : "Fail",
}));
console.log(statusArray);

// array of strings: "StudentName (Age years old)"
const info = students.map(
  (student) => `${student.name} (${student.age} years old)`
);
console.log(info);

// Filter students who passed (grade >= 80)
const passedStudents = students.filter((student) => student.grade >= 80);
console.log(passedStudents);

// Filter students who are 20 years old or younger
const youngStudents = students.filter((student) => student.age <= 20);
console.log(youngStudents);

// Filter students who study "Math"
const mathStudents = students.filter((student) =>
  student.subjects.includes("Math")
);
console.log(mathStudents);

// Calculate the average grade of all students
const avgGrade =
  students.reduce((sum, student) => sum + student.grade, 0) / students.length;
console.log(avgGrade);

// Count how many students study each subject (return an object with subject counts
const subjectCounts = students.reduce((counts, student) => {
  student.subjects.forEach((sub) => {
    counts[sub] = (counts[sub] || 0) + 1;
  });
  return counts;
}, {});
console.log(subjectCounts);

// Find the student with the highest grade
const topStudent = students.reduce((sum, student) =>
  student.grade > sum.grade ? student : sum
);
console.log(topStudent);

// Combine multiple methods to find the names of students who:

// - Are 21 or younger
// - Have a grade above 85
// - Study "Math"
const result = students
  .filter(
    (student) =>
      student.age <= 21 &&
      student.grade > 85 &&
      student.subjects.includes("Math")
  )
  .map((student) => student.name);

console.log(result);

//  Spread Operator
const fruits = ["apple", "banana"];
const vegetables = ["carrot", "broccoli"];
// Combine both arrays into one using spread operator
const combined = [...fruits, ...vegetables];
console.log(combined);

// Create a new array with "orange" at the beginning, then fruits, then "potato", then vegetables
const mixed = ["orange", ...fruits, "potato", ...vegetables];
console.log(mixed);

// Create a copy of the fruits array and add "grape" to the copy (original should remain unchanged
const fruitsCopy = [...fruits, "grape"];
console.log("Copy:", fruitsCopy);
console.log("Original:", fruits);

// Object Spread

const baseUser = { name: "John", age: 25 };
const address = { city: "New York", country: "USA" };

// 1. Create a new object combining baseUser and address
const userWithAddress = { ...baseUser, ...address };
console.log(userWithAddress);
// 2. Create a new user object with all baseUser properties but change the age to 26
const updatedUser = { ...baseUser, age: 26 };
console.log(updatedUser);

// 3. Create a user profile with baseUser, address, and additional property `isActive: true`
const userProfile = { ...baseUser, ...address, isActive: true };
console.log(userProfile);

// Function Parameters** Rest Operator
// 1. Create a function `sum(...numbers)` that accepts any number of arguments and returns their sum
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3));
console.log(sum(5, 10, 15, 20));

// 2. Create a function `introduce(name, age, ...hobbies)` that returns: "Hi, I'm [name], [age] years old, and I like [hobbies joined by ', ']"
function introduce(name, age, ...hobbies) {
  return `Hi, I'm ${name}, ${age} years old, and I like ${hobbies.join(", ")}`;
}

console.log(introduce("John", 25, "reading", "coding", "traveling"));

// **Exercise 8: Array Destructuring with Rest**

const colors = ["red", "green", "blue", "yellow", "purple", "orange"];

// 1. Destructure to get first color, second color, and all remaining colors in a separate array
const [first, second, ...remainingColors] = colors;

console.log(first);
console.log(second);
console.log(remainingColors);

// 2. Destructure to get first color and all others in a rest array
const [primary, ...otherColors] = colors;

console.log(primary);
console.log(otherColors);

// **Exercise 9: Object Destructuring with Rest**

const person = {
  name: "Sarah",
  age: 28,
  city: "Boston",
  job: "Developer",
  hobby: "Reading",
};

// 1. Destructure to get `name` and `age`, with all other properties in a rest object
const { name, age, ...otherInfo } = person;

console.log(name);
console.log(age);
console.log(otherInfo);

// 2. Destructure to get `name`, and group the rest as `details`
const { name: personName, ...details } = person;

console.log(personName);
console.log(details);

// **Exercise 10: Three Function Types**

// Create the same function `calculateArea(length, width)` using all three methods:
// 1. **Function Declaration**
console.log(calculateAreaDeclaration(5, 3));

function calculateAreaDeclaration(length, width) {
  return length * width;
}
// It is hoisted,can call it even before its definition in the file.

// 2. **Function Expression**
const calculateAreaExpression = function (length, width) {
  return length * width;
};

console.log(calculateAreaExpression(5, 3));
// Function expressions are not hoisted, so you can only call them after they are defined.
// It has its own this

// 3. **Arrow Function**
const calculateAreaArrow = (length, width) => length * width;

console.log(calculateAreaArrow(5, 3));
// don’t have their this,They are not hoisted

// **Exercise 11: `this` Context Difference**

const calculator = {
  value: 10,
  // Add three methods here that multiply 'value' by a given number:
  regularMethod: function (num) {
    return this.value * num;  //20
  },

  arrowMethod: (num) => {
    return this.value * num;  //NaN
  },
  shorthandMethod(num) {
    return this.value * num;   //20
  },
};

console.log("regularMethod:", calculator.regularMethod(2));
console.log("arrowMethod:", calculator.arrowMethod(2));
console.log("shorthandMethod:", calculator.shorthandMethod(2));


// ### Part 5: Higher-Order Functions

// **Exercise 12: Function as Parameter**

// 1. Create a function `processNumbers(numbers, operation)` that takes an array and a callback function
// 2. Test it with different operations:
//    - Double each number
//    - Square each number
//    - Check if each number is even (return true/false)


function processNumbers(numbers, operation) {
  const result = [];
  for (let num of numbers) {
    result.push(operation(num)); 
  }
  return result;
}


const numbers = [1, 2, 3, 4, 5];


const doubled = processNumbers(numbers, (n) => n * 2);
console.log("Doubled:", doubled); // [2, 4, 6, 8, 10]


const squared = processNumbers(numbers, (n) => n ** 2);
console.log("Squared:", squared); // [1, 4, 9, 16, 25]


const isEven = processNumbers(numbers, (n) => n % 2 === 0);
console.log("Is Even:", isEven); // [false, true, false, true, false]


// **Exercise 13: Function Returning Function**

// Create a function `createValidator(minLength)` that returns a validation function. The returned function should:

// - Take a string as input
// - Return `true` if string length >= minLength
// - Return `false` otherwise

// Example usage:

function createValidator(minLength) {
  return function (str) {
    return str.length >= minLength;
  };
}

const validatePassword = createValidator(8);
const validateUsername = createValidator(3);
console.log(validatePassword("hello")); // false
console.log(validatePassword("hello123")); // true
console.log(validateUsername("Al"));        // false 
console.log(validateUsername("Ali"));        // true

// ### Part 6: Shallow vs Deep Copy

// **Exercise 14: Understanding the Problem**


const originalData = {
  name: "Company ABC",
  employees: [
    { name: "John", department: "IT" },
    { name: "Jane", department: "HR" },
  ],
  location: {
    city: "New York",
    address: "123 Main St",
  },
  founded: new Date("2010-05-15"),
  getInfo: function () {
    return `${this.name} located in ${this.location.city}`;
  },
};


const shallowCopy = { ...originalData };


shallowCopy.name = "Company XYZ";              
shallowCopy.employees[0].department = "Sales"; 
shallowCopy.location.city = "Boston";          
console.log(" Original Object:", originalData);
console.log(" Shallow Copy:", shallowCopy);
//  What happens to the original object? Explain in comments.
// originalData.employees[0].department,shallowCopy.location.city = "Boston" => references affected on the original

// **Exercise 15: Deep Copy Methods**

// Using the same `originalData` from Exercise 14, implement deep copying using **THREE different methods**:


// 1. **Method 1: JSON.parse(JSON.stringify())**
const deepCopy1 = JSON.parse(JSON.stringify(originalData));


deepCopy1.location.city = "Cairo";
deepCopy1.employees[0].department = "Sales";

console.log("Method 1 - Original:", originalData.location.city); // New York 
console.log("Method 1 - Copy:", deepCopy1.location.city); // Cairo 


// - When does this method fail? (Hint: functions, dates, undefined)
// functions were removed,Dates convert to string,undefined

// 2. **Method 2: Recursive function**

  
   function deepCopy(obj) {
     if (typeof obj !== "object" || obj === null) return obj;

  
  if (obj instanceof Date) return new Date(obj);

  
  const copy = Array.isArray(obj) ? [] : {};

  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy;
   }
 const deepCopy2 = deepCopy(originalData);
deepCopy2.location.city = "London";
deepCopy2.employees[1].department = "Finance";

console.log("Method 2 - Original:", originalData.location.city); // New York 
console.log("Method 2 - Copy:", deepCopy2.location.city); // London 


// 3. **Method 3: Using a library (simulate with manual implementation)**
//    Create a function `lodashCloneDeep(obj)` that handles:
//    - Objects and arrays
//    - Nested structures
//    - Different data types

// **Hints for Deep Copy Implementation**:

// - Check if the value is an object: `typeof obj === 'object' && obj !== null`
// - Handle arrays: `Array.isArray(obj)`
// - Handle dates: `obj instanceof Date`
// - Use recursion for nested objects
function lodashCloneDeep(obj) {
  if (typeof obj !== "object" || obj === null) return obj;

  if (obj instanceof Date) return new Date(obj);
  if (Array.isArray(obj)) {
    return obj.map((item) => lodashCloneDeep(item)); 
  }

  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = lodashCloneDeep(obj[key]);
    }
  }
  return clonedObj;
}

const deepCopy3 = lodashCloneDeep(originalData);
deepCopy3.location.city = "Tokyo";
deepCopy3.employees[0].name = "Ali";

console.log("Method 3 - Original:", originalData.location.city); // New York 
console.log("Method 3 - Copy:", deepCopy3.location.city); // Tokyo 


// Test each method by modifying nested properties and verifying the original remains unchanged.



