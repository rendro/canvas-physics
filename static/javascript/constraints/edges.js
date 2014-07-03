var Constraint = require('./constraint.js');

class Edges extends Constraint {

	applyConstraint(world, entity) {
		if (!this.active) { return; }

		// bottom & top
		if (entity.position.y > world.height && entity.velocity.y > 0) {
			entity.velocity.y = -1 * Math.abs(entity.velocity.y);
		} else if (entity.position.y < 0 && entity.velocity.y < 0) {
			entity.velocity.y = Math.abs(entity.velocity.y);
		}

		// left & right
		if (entity.position.x > world.width && entity.velocity.x > 0) {
			entity.velocity.x = -1 * Math.abs(entity.velocity.x);
		} else if (entity.position.x < 0 && entity.velocity.x < 0) {
			entity.velocity.x = Math.abs(entity.velocity.x);
		}
	}

}

module.exports = Edges;
