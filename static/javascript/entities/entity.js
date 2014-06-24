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

var emptyForce = new Vec2D();

class Entity {

	constructor(position = new Vec2D(), velocity = new Vec2D()) {
		this.position = position;
		this.velocity = velocity;

		this.mass = 1;

		this.maxSpeed = Infinity;
	}

	tick(world) {
		// apply all forces
		world.forces.forEach((force) => force.applyTo(this, world));

		this.velocity.limit(this.maxSpeed);

		// move particle
		this.position.add(this.velocity.clone().divide(world.TIMECONST));

		// check all constraints
		world.constraints.forEach((constraint) => constraint.applyConstraint(world, this));
	}

	render(ctx) {}

	renderForces(world) {
		// velocity
		drawLine('rgba(255,0,0,.5)', this.position, this.velocity, world.ctx);

		// all forces
		world.forces.forEach((force) => {
			let vecForce = force.getForceForDebug(this);
			if (!vecForce.equals(emptyForce)) {
				drawLine('rgba(0,0,255,.5)', this.position, vecForce, world.ctx);
			}
		});
	}

}

module.exports = Entity;
