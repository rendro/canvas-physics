var Force = require('./force.js');

class Drag extends Force {

	constructor(drag) {
		this.drag = drag;
	}

	applyTo(entity) {
		entity.velocity.multiply(1 - this.drag);
	}
}

module.exports = Drag;
