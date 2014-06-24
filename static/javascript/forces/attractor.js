var Force = require('./force.js');

class Attractor extends Force {

	constructor(position, force) {
		this.position = position;
		this.force = force;
		this.radius = Math.abs(this.force);
		this.isAttractor = this.force > 0;
		this.lifecycle = 10;
	}

	applyTo(entity) {
		let distance = this.position.clone().distance(entity.position);
		let force = this.position.clone().subtract(entity.position).normalize().multiply(this.force).divide(10);
		entity.velocity.add(force);
	}

	getForceForDebug(entity) {
		let distance = this.position.clone().distance(entity.position);
		return this.position.clone().subtract(entity.position).normalize().multiply(this.force);
	}

	render(ctx) {
		let numOfCircles = 3;
		for (let i = 0; i < numOfCircles; i++) {
			let lifecycle = ((i * 180/numOfCircles + this.lifecycle++) % 180) / 180;

			if (!this.isAttractor) {
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
