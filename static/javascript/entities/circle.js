var Entity = require('./entity.js');

class Circle extends Entity {

	constructor(position, velocity, radius) {
		this.radius = radius;
		this.mass = radius;
		super(position, velocity);
	}

	render(ctx) {
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fillStyle = '#000';
		ctx.fill();
	}

}

module.exports = Circle;
