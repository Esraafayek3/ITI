let numbers = [8, 12, 6, 9, 20, 60, 80];

let ascending = numbers.sort((a, b) => a - b);
console.log(`ascending:  ${ascending}`);

let descending = numbers.sort((a, b) => b - a);
console.log(`descending: ${descending}`);

let numbersgreater = numbers.filter((num) => num > 50);
console.log(`numbersgreater: ${numbersgreater}`);

let max = Math.max(...numbers);
console.log(`max: ${max}`);

let min = Math.min(...numbers);
console.log(`min: ${min}`);

// task2
function calc(op, ...numbers) {
  let result;
  if ((op === "+")) {
    result = numbers.reduce((x, y) => x + y);
  } else if ((op === "-")) {
    result = numbers.reduce((x, y) => x - y);
  } else if ((op === "*")) {
    result = numbers.reduce((x, y) => x * y);
  } else if ((op === "/")) {
    result = numbers.reduce((x, y) => x / y);
  }

  console.log(
    `result of ${op} operation for ${numbers.join(",")} is ${result}`
  );
}
calc("+", 2, 6, 5);
calc("*", 2, 6, 5);
calc("/", 2, 6, 5);
calc("-", 2, 6, 5);

// task3

let id = prompt("enter your project id:");
while (isNaN(id) || id.trim() === "" || id<=0){
  id = prompt("enter a valid id:");
}

let name = prompt("enter your project name:");
while (name.trim() === "" || !isNaN(name)){
  name = prompt("enter a valid name:");
}

let duration = prompt("enter your project duration:");
while (isNaN(duration || duration.trim() === "" || id<=0)){
  duration = prompt("enter a valid duration:");
}

const project = {
  projectId: id.trim(),
  projectName: name.trim(),
  projectDuration: duration.trim(),
  printData: function () {
    console.log(`project id is ${this.projectId}`);
    console.log(`project name is ${this.projectName}`);
    console.log(`project duration ${this.projectDuration}`);
  },
};
project.printData();
