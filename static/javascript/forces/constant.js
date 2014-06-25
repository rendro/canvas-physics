var Force = require('./force.js');

class ConstantForce extends Force {

	constructor(force) {
		this.force = force;
	}

	applyTo(entity, world) {
		entity.velocity.add(this.force.clone().divide(world.animationFramesPerSecond));
	}

	getForceForDebug() {
		return this.force;
	}

	render(ctx) {}

}

module.exports = ConstantForce;
