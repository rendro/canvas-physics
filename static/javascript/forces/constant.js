var Force = require('./force.js');

class ConstantForce extends Force {

	constructor(force) {
		this.magnitude = force.magnitude();
		this.direction = force.normalize();

		this.active = true;
	}

	invert() {
		this.direction.multiply(-1);
	}

	applyTo(entity, world) {
		if (!this.active) {
			return;
		}
		entity.velocity.add(this.getForce().divide(world.timePerAnimFrame));
	}

	getForce() {
		return this.direction.clone().multiply(this.magnitude);
	}

	getForceForDebug() {
		return this.getForce();
	}

	render(ctx) {}

}

module.exports = ConstantForce;
