//question 1
// const tips = [
//   "javascipt is scripted language",
//   "javascipt is high level language",
//   "javascipt is human language",
//   "javascipt is hoisting",
//   "javascipt using use strict",
// ];

// const random = Math.floor(Math.random() * tips.length);
// const newtips = tips[random];
// alert(newtips);
//////////

// function strings(email) {
//   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   while (!regex.test(email)) {
//     email = prompt("Enter a valid email:");
//   }
//   return email;
// }
// let userEmail = prompt("Enter your email:");

///////////////////////
let studentsMarks = [60, 100, 10, 15, 85];
studentsMarks.sort(function (x, y) {
  return x - y;
});

console.log(studentsMarks);
let result = studentsMarks.find(function (x) {
  return x >= 100;
});

console.log(result);

let lowerDegree = studentsMarks.filter(function (e) {
  return e < 60;
});
console.log(lowerDegree);

//////////////////////////
const students = [
  {
    name: "esraa",
    degree: 95,
  },
  {
    name: "yehia",
    degree: 55,
  },
  {
    name: "mohamed",
    degree: 70,
  },
];

let result1 = students.find(function (x) {
  return x.degree >= 90 && x.degree <= 100;
});

console.log(result1.name);

const result2 = students.find(function (x) {
  return x.degree < 60;
});
console.log(result2.name);

students.push({
  name: "ahmed",
  degree: 66,
});

students.forEach(function (e) {
  console.log(`students name after add student is ${e.name}`);
});
console.log(students.pop());
console.log("////////");

students.forEach(function (e) {
  console.log(`students name after remove student is ${e.name}`);
});
console.log("////////");
// console.log(`students names after sorted ${students.sort().name}`);
let namesSorted = students.sort(function (x, y) {
  x.name > y.name ? 1 : -1;
});
students.forEach((student) =>
  console.log(`students names after sorted ${student.name}`)
);
console.log("////////");
students.splice(
  2,
  0,
  {
    name: " hager",
    degree: 90,
  },
  {
    name: "amira",
    degree: 80,
  }
);
students.forEach((student) =>
  console.log(`students name after splice ${student.name}`)
);
console.log("////////");
students.splice(3, 1);
students.forEach((student) =>
  console.log(`students name after splice ${student.name}`)
);
console.log("////////");

function checkDate(date) {
  const regex = /^\d{2}-\d{2}-\d{4}$/;

  if (regex.test(date)) {

    const [day, month, year] = date.split("-");
    const birthDate = new Date(year, month - 1, day); 
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[birthDate.getDay()];

    alert("Your birth date is: " + birthDate.toDateString());
  } else {
    alert("Wrong Date");
  }
}

const userInput = prompt("Enter your birth date (DD-MM-YYYY):");
checkDate(userInput);

function validateMobile(mobile) {
  const regex = /^00201(0|1|2)\d{8}$/;

  if (regex.test(mobile)) {
    alert("Valid mobile number");
  } else {
    alert("Invalid mobile number ");
  }
}

const input = prompt("Enter your mobile number in this format: 00201xxxxxxxxx");
validateMobile(input);

////////////////////
function getDay(datastring) {
  const date =new Date(datastring);
  if(isNaN(date)) 
    return "invalid date";

  const options = {weeekday: 'long'};
  return date.toLocaleDateString('en-uk' ,options);

}

let datestr = new Date().toDateString()
console.log(`today is ${getDay(datestr)}`)