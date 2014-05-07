class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	sayHello() {
		return "Hello! I am " + this.name + " at the age of " + this.age;
	}
}

module.exports = Person;
