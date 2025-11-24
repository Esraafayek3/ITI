// task1
// console.log("Start"); //synchronous 1

// setTimeout(() => console.log("Timeout 1"), 0); //event loop 5
// setImmediate(() => console.log("Immediate 1")); //event loop 6

// Promise.resolve().then(() => console.log("Promise 1")); //Promise microtasks queue 4
// process.nextTick(() => console.log("Next Tick 1")); //nextTick queue > microtasks queue 3

// console.log("End"); //synchronous 2

// task2
// console.log('Start'); //synchronous 1

// setTimeout(() => console.log('Timeout 1'), 0); //timers 6
// setTimeout(() => console.log('Timeout 2'), 0); //timers 7

// Promise.resolve().then(() => { //.then microtasks
//   console.log('Promise 1'); //Promise microtasks queue 4
//   process.nextTick(() => console.log('Next Tick inside Promise'));  //microtasks  5
// });

// process.nextTick(() => console.log('Next Tick 1')); //nextTick queue > microtasks queue 3

// console.log('End'); //synchronous 2

// task 3
// const fs = require("fs");

// console.log("Start"); //synchronous 1

// fs.readFile(__filename, () => {  //I/O — callback
//   console.log("File Read Complete"); //5
//   setTimeout(() => console.log("Timeout inside I/O"), 0); //7
//   setImmediate(() => console.log("Immediate inside I/O")); //8
//   process.nextTick(() => console.log("Next Tick inside I/O")); //6
// });

// setTimeout(() => console.log("Timeout 1"), 0); //timers 3
// setImmediate(() => console.log("Immediate 1")); //timers 4
// //event loop، الـ timers (اللي جاهزة) بتتفضّى قبل ما الـ callback بتاع fs.readFile يدخل.

// console.log("End"); //synchronous 2

// task4

// console.log('Start');  //synchronous 1

// setTimeout(() => {
//   console.log('Timeout 1'); //timers 5
//   process.nextTick(() => console.log('Next Tick inside Timeout')); //6
// }, 0);

// setTimeout(() => {
//   console.log('Timeout 2');  //timers 7
//   Promise.resolve().then(() => console.log('Promise inside Timeout')); //8
// }, 0);

// Promise.resolve().then(() => { //microtask queue
//   console.log('Promise 1'); // 4
//   setTimeout(() => console.log('Timeout inside Promise'), 0); //9 بيتأجّل للـ timers phase الي بعد كده
// });

// process.nextTick(() => console.log('Next Tick 1')); //nextTick queue 3

// console.log('End');  //synchronous 2

// task5

// const fs = require('fs');

// console.log('Start');  //synchronous 1

// fs.readFile(__filename, () => {
//   console.log('File Read Complete 1'); //poll 5
//   setTimeout(() => console.log('Timeout inside I/O 1'), 0); // 9 لن يُنفَّذ في نفس دورة الـ event loop الحالية.
//   setImmediate(() => console.log('Immediate inside I/O 1')); // 7 نفّذ كل callbacks الـ I/O في الـ poll
// });

// fs.readFile(__filename, () => {
//   console.log('File Read Complete 2'); //poll 6
//   setTimeout(() => console.log('Timeout inside I/O 2'), 0); // 10 لن يُنفَّذ في نفس دورة الـ event loop الحالية.
//   setImmediate(() => console.log('Immediate inside I/O 2')); // 8 نفّذنا كل callbacks الـ I/O في الـ poll
// });

// setTimeout(() => console.log('Timeout 1'), 0); //timers 3
// setImmediate(() => console.log('Immediate 1')); //timers 4  الأولى (لأن poll ما كانش فيه I/O جاهز وقتها)

// console.log('End'); //synchronous 2

// task6

// function infiniteMicrotasks() {
//   Promise.resolve().then(() => {
//     console.log("Microtask");
//     infiniteMicrotasks();
//   });
// }

// infiniteMicrotasks();

// setTimeout(() => console.log("Timeout"), 0);
//  لـ setTimeout موجود مستني في timers phase. 
// لكن الـ event loop عمره ما هيوصل لمرحلة timers، لأن كل مرة بيخلص microtask، بيضيف microtask جديد


// task7

const fs = require('fs');

console.log('Start'); //synchronous 1

setTimeout(() => console.log('Timeout 1'), 0);
setImmediate(() => console.log('Immediate 1'));

fs.readFile(__filename, () => {
  console.log('File Read Complete');
  setTimeout(() => console.log('Timeout inside I/O'), 0);
  setImmediate(() => console.log('Immediate inside I/O'));
  process.nextTick(() => console.log('Next Tick inside I/O'));
});

Promise.resolve().then(() => {
  console.log('Promise 1'); //4
  process.nextTick(() => console.log('Next Tick inside Promise')); // 5
});

process.nextTick(() => console.log('Next Tick 1')); //3

console.log('End'); //synchronous 2