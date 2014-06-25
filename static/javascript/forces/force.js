var Vec2D = require('../vec2d.js');

class Force {

	applyTo(entity, world) {}

	getForceForDebug() {
		return new Vec2D();
	}

	render(ctx) {}
}

module.exports = Force;
