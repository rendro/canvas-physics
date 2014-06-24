var World = require('./CanvasWorld.js');
var Vec2D = window.v = require('./vec2d.js');
var EdgesConstraint = require('./constraints/edges.js');
var DyingCircle = require('./entities/dyingcircle.js');
var Circle = require('./entities/circle.js');

var Emitter = require('./entities/emitter.js');

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

world.addEntity(new Emitter(new Vec2D(100, 100), 1, 0, 40, 180, 10, dyingCircleConstructor));
world.addEntity(new Emitter(new Vec2D(700, 300), 1, -45, 40, 10, 10, dyingCircleConstructor));
world.addEntity(new Emitter(new Vec2D(300, 400), 1, 0, 70, 5, 10, dyingCircleConstructor));

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
