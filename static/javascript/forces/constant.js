var Force = require('./force.js');

class ConstantForce extends Force {

	constructor(force) {
		this.force = force;
	}

	invert() {
		this.force.multiply(-1);
	}

	applyTo(entity, world) {
		entity.velocity.add(this.force.clone().divide(world.timePerAnimFrame));
	}

	getForceForDebug() {
		return this.force;
	}

	render(ctx) {}

}

module.exports = ConstantForce;
