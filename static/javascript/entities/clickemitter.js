var Entity = require('./entity.js');
var Vec2D  = require('../vec2d.js');

var drawLine = function(color, from, to, ctx) {
	ctx.beginPath();
	ctx.moveTo(from.x, from.y);
	ctx.lineTo(to.x, to.y);
	ctx.closePath();
	ctx.strokeStyle = color;
	ctx.stroke();
};

class ClickEmitter extends Entity {

	constructor(world, ...particleTypeConstructors) {
		this.world = world;
		this.particleTypeConstructors = particleTypeConstructors;

		this.mouseDown = false;
		this.startPos = null;
		this.particle = null;


		this.world.canvas.addEventListener('mousedown', (event) => this.initializeParticle(event));
		this.world.canvas.addEventListener('mousemove', (event) => this.captureVelocity(event));
		this.world.canvas.addEventListener('mouseup', (event) => this.releaseParticle(event));
	}

	getPositionOfEvent(event) {
		let x;
		let y;
		if (event.pageX || event.pageY) {
			x = event.pageX;
			y = event.pageY;
		} else {
			x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		x -= this.world.canvas.offsetLeft;
		y -= this.world.canvas.offsetTop;
		return new Vec2D(x, y);
	}

	initializeParticle(event) {
		let particleConstructor = this.particleTypeConstructors[Math.floor(this.particleTypeConstructors.length * Math.random())];
		this.mouseDown = true;
		this.startPos = this.getPositionOfEvent(event);
		this.destination = this.startPos.clone();
		this.particle = particleConstructor(this.startPos);
		this.particle.frozen = true;
		this.world.addEntity(this.particle);
	}

	captureVelocity(event) {
		if (!this.mouseDown) { return; }
		this.destination = this.getPositionOfEvent(event);
	}

	releaseParticle(event) {
		if (!this.mouseDown) { return; }
		this.mouseDown = false;
		this.particle.velocity = this.destination.subtract(this.particle.position);
		this.particle.frozen = false;
	}

	tick() {}
	renderForces() {}

	render(ctx) {
		if (this.mouseDown) {
			drawLine('pink', this.startPos, this.destination, ctx);
		}
	}


}

module.exports = ClickEmitter;
