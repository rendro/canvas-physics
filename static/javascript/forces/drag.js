var Force = require('./force.js');

class Drag extends Force {

	constructor(drag) {
		this.drag = drag;
	}

	applyTo(entity, world) {
		entity.velocity.multiply(1 - this.drag * 1000 / 60 / world.animationFramesPerSecond);
	}
}

module.exports = Drag;
