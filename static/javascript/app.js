var UiElement       = require('./uielement.js');
var World           = require('./CanvasWorld.js');
var Vec2D           = require('./vec2d.js');
var ConstantForce   = require('./forces/constant.js');
var Drag            = require('./forces/drag.js');
var Attractor       = require('./forces/attractor.js');
var Absorber        = require('./forces/absorber.js');
var EdgesConstraint = require('./constraints/edges.js');
var Circle          = require('./entities/circle.js');
var DyingCircle     = require('./entities/dyingcircle.js');
var Emitter         = require('./entities/emitter.js');


var world = new World(document.getElementById('world'));

world.setSize(800, 500);

world.addConstraint(new EdgesConstraint());

// gravity
let gravity = new ConstantForce(new Vec2D(0, 9.81));
world.addForce(gravity);

// wind
let wind = new ConstantForce(new Vec2D(4, 0));
world.addForce(wind);

// drag
world.addForce(new Drag(0.01));

//Attractor
//world.addForce(new Attractor(new Vec2D(500, 250), 50));

//Absorber
world.addForce(new Absorber(new Vec2D(50, 50), 30, world));

var dyingCircleConstructor = function(position, velocity) {
	let minRadius = 2;
	let maxRadius = 7;
	let r = minRadius + (maxRadius - minRadius) * Math.random();
	return new DyingCircle(position, velocity, r, 3);
};

var circleConstructor = function(position, velocity) {
	let minRadius = 2;
	let maxRadius = 7;
	let r = minRadius + (maxRadius - minRadius) * Math.random();
	return new Circle(position, velocity, r);
};

//world.addEntity(new Emitter(new Vec2D(250, 180), 1, 0, 40, 10, 10, dyingCircleConstructor));
//world.addEntity(new Emitter(new Vec2D(700, 300), 1, -45, 40, 10, 10, dyingCircleConstructor));
//world.addEntity(new Emitter(new Vec2D(300, 400), 1, 0, 90, 5, 10, dyingCircleConstructor));
// world.addEntity(new Circle(new Vec2D(100, 100), new Vec2D(50, -40), 5));

//Snipper Emitter
world.addEntity(new Emitter(new Vec2D(700, 300), 0.2, -50, 100, 0, 10, circleConstructor));

/**
 * UI ELEMENTS FOR CONTROLS
 */
UiElement('#pause', 'change', (e) => world.paused = e.target.checked );
UiElement('#inversegravity', 'change', () => gravity.force.multiply(-1));
UiElement('#debug', 'change', (e) => world.debug = e.target.checked );


var count = document.getElementById('pcount');
// tick
var tick = function() {
	if (!world.paused) {
		world.tick();
		world.render();
		count.value = world.entities.length;
	}
	requestAnimationFrame(tick);
};

UiElement('#nextTick', 'click', function() {
	world.tick();
	world.render();
	count.value = world.entities.length;
});

// run
tick();
