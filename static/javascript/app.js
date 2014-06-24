var World           = require('./CanvasWorld.js');
var Vec2D           = require('./vec2d.js');
var ConstantForce   = require('./forces/constant.js');
var Drag            = require('./forces/drag.js');
var Attractor       = require('./forces/attractor.js');
var EdgesConstraint = require('./constraints/edges.js');
var Circle          = require('./entities/circle.js');
var DyingCircle     = require('./entities/dyingcircle.js');
var Emitter         = require('./entities/emitter.js');

// pause checkbox
var pausedCheckbox = document.getElementById('pause');
var pause = false;
pausedCheckbox.addEventListener('change', function() {
	pause = pausedCheckbox.checked;
});

var canvas = document.getElementById('world');
var world = new World(canvas);
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

world.addForce(new Attractor(new Vec2D(500, 250), 50));


var inversegravity = document.getElementById('inversegravity');
inversegravity.addEventListener('change', function() {
	world.gravity.multiply(-1);
});

var debug = document.getElementById('debug');
debug.addEventListener('change', function() {
	world.debug = debug.checked;
});

var dyingCircleConstructor = function(position, velocity) {
	let minRadius = 2;
	let maxRadius = 7;
	let r = minRadius + (maxRadius - minRadius) * Math.random();
	return new DyingCircle(position, velocity, r, 3);
};

world.addEntity(new Emitter(new Vec2D(250, 180), 1, 0, 40, 10, 10, dyingCircleConstructor));
world.addEntity(new Emitter(new Vec2D(700, 300), 1, -45, 40, 10, 10, dyingCircleConstructor));
world.addEntity(new Emitter(new Vec2D(300, 400), 1, 0, 90, 5, 10, dyingCircleConstructor));

// world.addEntity(new Circle(new Vec2D(100, 100), new Vec2D(50, -40), 5));

var count = document.getElementById('pcount');

// tick
var tick = function() {
	if (!pause) {
		world.tick();
		world.render();
		count.value = world.entities.length;
	}
	requestAnimationFrame(tick);
};

var nextStep = document.getElementById('nextTick');
nextStep.addEventListener('click', function() {
	world.tick();
	world.render();
	count.value = world.entities.length;
});

// run
tick();
