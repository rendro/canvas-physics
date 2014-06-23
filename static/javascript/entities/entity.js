var Vec2D = require('../vec2d.js');

class Entity {

	constructor(position = new Vec2D(), velocity = new Vec2D()) {
		this.position = position;
		this.velocity = velocity;

		this.mass = 1;
	}

	tick(world) {
		if (world.drag) {
			this.velocity.multiply(1 - world.drag);
		}

		if (world.gravity) {
			this.velocity.add(world.gravity);
		}

		this.position.add(this.velocity);

		world.constraints.forEach((constraint) => constraint.applyConstraint(world, this));
	}

	render(ctx) {}

}

module.exports = Entity;
