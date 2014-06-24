var Vec2D = require('../vec2d.js');

var drawLine = function(color, from, force, ctx) {
	ctx.beginPath();
	ctx.moveTo(from.x, from.y);
	let destination = from.clone().add(force);
	ctx.lineTo(destination.x, destination.y);
	ctx.closePath();
	ctx.strokeStyle = color;
	ctx.stroke();
};

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
			this.velocity.add(world.gravity.clone().divide(10));
		}

		this.position.add(this.velocity.clone().divide(10));

		world.constraints.forEach((constraint) => constraint.applyConstraint(world, this));
	}

	render(ctx) {}

	renderForces(world) {
		// velocity
		drawLine('red', this.position, this.velocity, world.ctx);

		// gravity
		drawLine('blue', this.position, world.gravity, world.ctx);

		// forces
		// tbd
	}

}

module.exports = Entity;
