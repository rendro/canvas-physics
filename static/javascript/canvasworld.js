var Vec2D = require('./vec2d.js');

class CanvasWorld {

	constructor(canvas) {
		this.canvas = canvas;
		this.width = canvas.width;
		this.height = canvas.height;
		this.ctx = canvas.getContext('2d');
		this.entities = [];
		this.forces = [];
		this.constraints = [];
		this.debug = false;
		this.paused = false;

		this.scale = 1;
		this.rotate = 0;

		this.animationFramesPerSecond = 1000/60;
	}

	setSize(width, height) {
		this.canvas.width = this.width = width;
		this.canvas.height = this.height = height;
	}

	addForce(force) {
		this.forces.push(force);
	}

	removeForce(force) {
		this.forces.splice(this.forces.indexOf(force), 1);
	}

	addEntity(entity) {
		this.entities.push(entity);
	}

	removeEntity(entity) {
		this.entities.splice(this.entities.indexOf(entity), 1);
	}

	addConstraint(constraint) {
		this.constraints.push(constraint);
	}

	removeConstraint(constraint) {
		this.constraints.splice(this.constraints.indexOf(constraint), 1);
	}

	tick() {
		this.entities.forEach((entity) => entity.tick(this));
	}

	render() {
		this.clearCanvas();

		this.ctx.save();
		this.ctx.translate(this.width/2, this.height/2);
		this.ctx.rotate(this.rotate * Math.PI / 180);
		this.ctx.scale(this.scale, this.scale);
		this.ctx.translate(-this.width/2, -this.height/2);

		this.entities.forEach((entity) => entity.render(this.ctx));

		this.forces.forEach((force) => force.render(this.ctx));

		if (this.debug) {
			this.entities.forEach((entity) => entity.renderForces(this));
		}

		this.ctx.restore();
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		// this.ctx.fillStyle = '#000';
		// this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		// this.ctx.fillStyle = 'rgba(255,255,255,0.6)';
		// this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

module.exports = CanvasWorld;
