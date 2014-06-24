var Force = require('./force.js');

class Absorber extends Force {

	constructor(position, force, world) {
		this.world = world;
		this.position = position;
		this.force = force;
		this.radius = Math.abs(this.force / 2);
		this.lifecycle = 10;
	}

	applyTo(entity) {
		let distance = this.position.clone().distance(entity.position);
		let force = this.position.clone().subtract(entity.position).normalize().multiply(this.force).divide(10);
		entity.velocity.add(force);

		if(distance <= this.force){
			this.world.removeEntity(entity);
		}
	}

	getForceForDebug(entity) {
		let distance = this.position.clone().distance(entity.position);
		return this.position.clone().subtract(entity.position).normalize().multiply(this.force);
	}

	render(ctx) {
		let numOfCircles = 3;
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius*2, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fillStyle = `rgba(0,0,0,0.1)`;
		ctx.fill();
	}
}

module.exports = Absorber;
