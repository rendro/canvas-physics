var Force = require('./force.js');
var Vec2D = require('../vec2d.js');

class Attractor extends Force {

	constructor(position, force) {
		this.position = position;
		this.force = force * 1e3;
		this.radius = Math.min(Math.max(Math.abs(force/100), 40), 100);
		this.lifecycle = 10;
	}

	getForceAtPosition(entityPosition) {
		let distance = this.position.clone().distance(entityPosition);
		return this.position.clone().subtract(entityPosition).normalize().multiply(this.force / (distance * distance));
	}

	applyTo(entity, world) {
		let integrationSteps = 8;
		let pos = entity.position.clone();
		let force = new Vec2D();
		for (let i = 0; i < integrationSteps; ++i) {
			force.add(this.getForceAtPosition(pos).divide(integrationSteps));
		}
		entity.velocity.add(force.divide(entity.mass).divide(world.animationFramesPerSecond));
	}

	getForceForDebug(entity) {
		return this.getForceAtPosition(entity.position);
	}

	render(ctx) {
		let numOfCircles = 3;
		for (let i = 0; i < numOfCircles; i++) {
			let lifecycle = ((i * 180/numOfCircles + this.lifecycle++) % 180) / 180;

			if (this.force < 0) {
				lifecycle = 1 - lifecycle;
			}

			ctx.beginPath();
			ctx.arc(this.position.x, this.position.y, this.radius * 2 * (1 - lifecycle), 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = `rgba(0,0,255,${lifecycle})`;
			ctx.stroke();
		}
	}

}

module.exports = Attractor;
