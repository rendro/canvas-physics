var Vec2D = require('../vec2d.js');

class Force {

	applyTo(entity) {}

	getForceForDebug() {
		return new Vec2D(0, 0);
	}
}

module.exports = Force;
