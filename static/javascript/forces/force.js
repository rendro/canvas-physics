var Vec2D = require('../vec2d.js');

class Force {

	constructor() {
		this.active = true;
	}

	applyTo(entity, world) {}

	getForceForDebug() {
		return new Vec2D();
	}

	render(ctx) {}
}

module.exports = Force;
