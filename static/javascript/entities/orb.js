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

	constructor(orb) {
		super(orb.position, orb.velocity, 2);
		this.x = new Vec2D(0,0);
	}

	tick() {
		this.x.add(new Vec2D(1 - 2 * Math.random(), 1 - 2 * Math.random())).limit(20);
	}

	render(ctx) {
		drawCircle(ctx, Vec2D.sum(this.position, this.x), 2, '#be2221');
	}

	renderForces() {}

}

class Orb extends Circle {

	constructor(position, velocity, radius) {
		super(position, velocity, radius);
		this.mass = 1;
		this.particles = [1,2,3,4,5,6,7].map((i) => new OrbParticle(this));
	}

	tick(world) {
		this.particles.forEach((p) => p.tick(world));
		super(world);
	}

	render(ctx) {
		drawCircle(ctx, this.position, 5);
		this.particles.forEach((p) => p.render(ctx));
	}
}

module.exports = Orb;
