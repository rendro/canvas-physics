var Attractor = require('./attractor.js');

class Absorber extends Attractor {

	constructor(position, force, radius) {
		super(position, force);
		this.radius = radius;
		this.growthFactor = 0;
		this.size = this.radius;
	}

	applyTo(entity, world) {
		super(entity, world);

		let distance = this.position.clone().distance(entity.position);

		if(distance <= this.radius){
			world.removeEntity(entity);
			this.size = this.radius+this.growthFactor;

			if(this.size > 50){
				this.size = this.radius;
				this.growthFactor = 0;
			}

			this.growthFactor += 0.4;
		}
	}

	render(ctx) {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fillStyle = 'rgba(44, 62, 80, 1.0)';
		ctx.fill();
	}
}

module.exports = Absorber;
