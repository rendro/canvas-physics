var Entity = require('./entity.js');
var Circle = require('./circle.js');
var Vec2D = require('../vec2d.js');

var drawCircle = function(ctx, pos, r, color='#000') {
	ctx.beginPath();
	ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fillStyle = color;
	ctx.fill();
};

class OrbParticle extends Circle {

	constructor(orb, idx, num) {
		super(orb.position, orb.velocity, 2);
		this.velocity = new Vec2D(Math.sin(2 * Math.PI * idx / num), Math.cos(2 * Math.PI * idx / num)).normalize().multiply(3);
		this.delta = new Vec2D();
	}

	tick(world) {
		if (this.delta.magnitude() > 15) {
			this.velocity.multiply(-1);
		}
		this.velocity.rotate(2 * Math.PI / 180);
		this.delta.add(this.velocity.clone().divide(world.timePerAnimFrame));
	}

	render(ctx) {
		drawCircle(ctx, Vec2D.sum(this.position, this.delta), 2, '#be2221');
	}

	renderForces() {}

}

class Orb extends Circle {

	constructor(position, velocity, radius) {
		super(position, velocity, radius);
		this.mass = 1;
		this.particles = [0,1,2,3,4,5,6,7].map((i) => new OrbParticle(this, i, 8));
	}

	tick(world) {
		this.particles.forEach((p) => p.tick(world));
		super(world);
	}

	render(ctx) {
		this.particles.forEach((p) => p.render(ctx));
		drawCircle(ctx, this.position, 5);
	}
}

module.exports = Orb;
