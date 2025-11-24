// console.log(number1);
// console.log(number2);
// console.log(number3);
var number1 = 3;
var number2 = 2.9;
var number3 = 0xff;

var firstName = "esraa";
var middleName = 'fayek';
var lastName = `abdelnaby`;

var flag = true;

console.log`this is the External Javascript File`;



// when remove key var
// console.log(number4);   //error in this step because number4 is a global variable and JavaScript does not hoist the variable
// number4 = 10;

var firstName = "Esraa";
firstName[3] = "A";
console.log(firstName); // not change

console.log(typeof number1);
console.log(typeof number2);
console.log(typeof number3);
console.log(typeof firstName);
console.log(typeof middleName);
console.log(typeof lastName);

console.log(number1 + number2);
console.log(flag + number1);
console.log(firstName + flag);
console.log(number1 + firstName);
console.log(number1 + number2 + firstName);
console.log(number1 + firstName + number2);
console.log(number1 * flag);
console.log(number1 / lastName);
console.log(`My full name is ${firstName} ${middleName} ${lastName}`);
let numbers = [6, 10, 14, 18, 20];
console.table(numbers);

let number = 1;
if (number % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}

for(i=1; i<=10; i++) {
    console.log(i);
}

let num = 0;
if (num > 0) {
  console.log("+ve");
} else if (num < 0) {
  console.log("-ve");
} else {
  console.log("Zero");
}

let n = 9;
for (let i = 1; i <= 10; i++) {
  console.log(`${n} x ${i} = ${n * i}`);
}


let day = 1;
switch (day) {
  case 1: 
  console.log("Saturday"); 
  break;
  case 2: 
  console.log("Sunday"); 
  break;
  case 3: 
  console.log("Monday"); 
  break;
  case 4: 
  console.log("Tuesday"); 
  break;
  case 5: 
  console.log("Wednesday");
   break;
  case 6: 
  console.log("Thursday");
   break;
  case 7: 
  console.log("Friday"); 
  break;
  default: 
  console.log("Invalid day");
}


let dayNum = 6;
if (dayNum >= 1 && dayNum <= 6) {
  console.log("Weekday");
} else if (dayNum === 7) {
  console.log("Weekend");
}
