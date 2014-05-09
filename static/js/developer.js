var Person = require('./person.js');

class Developer extends Person {
	constructor(name, age, ...languages) {
		super(name, age);
		this.languages = [...languages];
	}

	sayHello() {
		let result = super();
		result += " and I can code in these languages: \n\n";
		result += this.languages.map((lang) => "- " + lang).join("\n");
		return result;
	}
}

module.exports = Developer;
