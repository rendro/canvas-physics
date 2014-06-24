var Force = require('./force.js');

class ConstantForce extends Force {

	constructor(force) {
		this.force = force;
	}

	applyTo(entity) {
		entity.velocity.add(this.force.clone().divide(10));
	}

	getForceForDebug() {
		return this.force;
	}

}

module.exports = ConstantForce;
