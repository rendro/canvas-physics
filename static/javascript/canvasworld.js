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

		this.entities.forEach((entity) => entity.render(this.ctx));

		this.forces.forEach((force) => force.render(this.ctx));

		if (this.debug) {
			this.entities.forEach((entity) => entity.renderForces(this));
		}
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		// this.ctx.fillStyle = 'rgba(255,255,255,0.6)';
		// this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

module.exports = CanvasWorld;
