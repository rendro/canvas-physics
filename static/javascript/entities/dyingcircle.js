var Circle = require('./circle.js');

class DyingCircle extends Circle {

	constructor(position, velocity, radius) {
		this.maxLifetime = 60 * 10;
		this.lifetime = 60 * 10;
		super(position, velocity, radius);
	}

	tick(world) {
		if (this.lifetime--) {
			super(world);
		} else {
			world.removeEntity(this);
		}
	}

	render(ctx) {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fillStyle = `rgba(0,0,0,${this.lifetime / this.maxLifetime})`;
		ctx.fill();
	}

}

module.exports = DyingCircle;
