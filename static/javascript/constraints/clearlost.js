var Constraint = require('./constraint.js');

class ClearLost extends Constraint {

	constructor(threshold=100) {
		this.threshold = threshold;
	}

	applyConstraint(world, entity) {
		if (!entity.position.inRect(-this.threshold, -this.threshold, world.width + (this.threshold * 2), world.height + (this.threshold * 2))) {
			console.log('no');
			world.removeEntity(entity);
		}
	}

}

module.exports = ClearLost;
