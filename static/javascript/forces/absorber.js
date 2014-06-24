var Force = require('./force.js');

class Absorber extends Force {

	constructor(position, force, radius) {
		this.position = position;
		this.force = force;
		this.radius = radius;
		this.maxForce = 50;
	}

	getForceForEntity(entity) {
		// let distance = this.position.clone().distance(entity.position) / 50;
		return this.position.clone().subtract(entity.position).normalize().multiply(this.force);// / (distance * distance)).limit(this.maxForce);
	}

	applyTo(entity, world) {
		let distance = this.position.clone().distance(entity.position);

		if(distance <= this.radius){
			world.removeEntity(entity);
			return;
		}

		let force = this.getForceForEntity(entity).divide(world.TIMECONST);
		entity.velocity.add(force);
	}

	getForceForDebug(entity) {
		return this.getForceForEntity(entity);
	}

	render(ctx) {
		let numOfCircles = 3;
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fillStyle = 'rgba(0,0,0,0.1)';
		ctx.fill();
	}
}

module.exports = Absorber;
