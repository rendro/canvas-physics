var Attractor = require('./attractor.js');

class Absorber extends Attractor {

	constructor(position, force, radius) {
		super(position, force);
		this.radius = radius;
		this.size = radius;

		this.growthFactor = 0.4;
		this.maxSize = 50;

		this.shrink = false;
	}

	applyTo(entity, world) {
		super(entity, world);

		let distance = this.position.clone().distance(entity.position);

		if(distance <= this.size){
			world.removeEntity(entity);
			this.size += this.growthFactor;

			if (this.size > this.maxSize){
				this.shrink = true;
			}
		}
	}

	render(ctx) {

		if (this.size < this.radius){
			this.shrink = false;
		}

		if (this.shrink) {
			this.size *= 0.9;
		}

		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fillStyle = 'rgba(44, 62, 80, 1.0)';
		ctx.fill();
	}
}

module.exports = Absorber;
