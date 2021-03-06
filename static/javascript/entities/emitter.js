var Entity = require('./entity.js');
var Vec2D = require('../vec2d.js');

class Emitter extends Entity {

	constructor(position, ppt, particleDirection, particleVelocity, directionSpread, velocitySpread, ...particleTypeConstructors) {
		this.radius                   = 30;
		this.ppt                      = ppt;
		this.particleDirection        = particleDirection || 0;
		this.particleVelocity         = particleVelocity || 0;
		this.directionSpread          = directionSpread || 0;
		this.velocitySpread           = velocitySpread || 0;
		this.particleTypeConstructors = particleTypeConstructors;

		this.paused = false;

		super(position);

		this.lifecycle = 0;
		this.shouldEmit = 0;
	}

	generateRandomVelocity() {
		return this.particleVelocity + (1 - 2 * Math.random()) * this.velocitySpread;
	}

	generateRandomDirection() {
		let direction = Math.PI - this.particleDirection * (Math.PI / 180) + (1 - 2 * Math.random()) * this.directionSpread * (Math.PI / 180);
		let vec = new Vec2D(Math.sin(direction), Math.cos(direction));
		vec.normalize();
		return vec;
	}

	tick(world) {
		if (this.paused) {
			return;
		}

		this.shouldEmit += this.ppt / world.timePerAnimFrame;

		if (this.shouldEmit < 1) {
			return;
		}

		// does not move or is influenced by any forces or gravity but emits particles
		while(this.shouldEmit-- >= 1) {
			let particleConstructor = this.particleTypeConstructors[Math.floor(this.particleTypeConstructors.length * Math.random())];
			let position = this.position.clone();
			let velocity = this.generateRandomDirection().multiply(this.generateRandomVelocity());
			let particle = particleConstructor(position, velocity);
			world.addEntity(particle);
		}
	}

	render(ctx) {
		for (let i = 0; i < 3; i++) {
			let lifecycle = ((i * 300/3 + this.lifecycle++) % 300) / 300;
			ctx.beginPath();
			ctx.arc(this.position.x, this.position.y, this.radius * lifecycle, 0, Math.PI * 2, false);
			ctx.closePath();
			ctx.strokeStyle = `rgba(255,0,0,${1 - lifecycle})`;
			ctx.stroke();
		}
	}

	renderForces() {}

}

module.exports = Emitter;
