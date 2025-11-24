
// constructor function
function User(userName, userAge, userEmail) {
	if (!new.target) {
		throw Error("Cannot use User constructor function without new operator");
	}

	this.name = userName;
	this.age = userAge;
	this.email = userEmail;

    // cosuming memory  
	// this.printInfo = function () {
	// 	return `User's name: ${this.name}, User's age: ${this.age}, User's email: ${this.email}`;
	// };

	console.log(this);
}

User.prototype.printInfo = function () {
	return `User's name: ${this.name}, User's age: ${this.age}, User's email: ${this.email}`;
};

console.log(User);
console.log(User.prototype);
console.log(User.prototype.printInfo);
console.log(User.prototype.constructor);
console.log(User === User.prototype.constructor);

// instance from user
const user1 = new User("mohamed", 23, "mohamed@mail.com");
console.log(user1);
console.log(user1.name);
console.log(user1.age);
console.log(user1.email);
console.log(user1.printInfo());

console.log(user1.__proto__);
console.log(user1.__proto__ === User.prototype);


const user2 = new User2("Ali", 26, "ali@mail.com");
console.log(user2);
///// New operator
// 1) Create empty object
// 2) set this to newly created object
// 3) set values to the object
// 4) Return the object

//////////// Prototype === Object
