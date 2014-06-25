var Attractor = require('./attractor.js');

class Absorber extends Attractor {

	constructor(position, force, radius) {
		super(position, force);
		this.radius = radius;
		this.opacity = 1;
	}

	applyTo(entity, world) {
		super(entity, world);

		let distance = this.position.clone().distance(entity.position);

		if(distance <= this.radius){
			world.removeEntity(entity);
			this.opacity *= 0.1;
		}
	}

	render(ctx) {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fillStyle = 'rgba(0,0,0,' + this.opacity + ')';
		ctx.fill();
		this.opacity = 1;
	}
}

module.exports = Absorber;
