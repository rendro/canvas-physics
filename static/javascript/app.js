var World = require('./CanvasWorld.js');
var Vec2D = window.v = require('./vec2d.js');
var EdgesConstraint = require('./constraints/edges.js');
var Circle = require('./entities/circle.js');

// pause checkbox
var pausedCheckbox = document.getElementById('pause');
var pause = false;
pausedCheckbox.addEventListener('change', function() {
	pause = pausedCheckbox.checked;
});


var world = new World(document.getElementById('world'));
world.setSize(800, 500);
world.addConstraint(new EdgesConstraint());


var inversegravity = document.getElementById('inversegravity');
inversegravity.addEventListener('change', function() {
	world.gravity.multiply(-1);
});

// add particles
var particles = 1000;
var maxSpeed = 10;
var maxRadius = 5;
var minRadius = 2;
for (let i = 0; i < particles; i++) {
	let position = new Vec2D(world.width * Math.random(), world.height * Math.random());
	let velocity = new Vec2D((maxSpeed/2) - (maxSpeed * Math.random()), (maxSpeed/2) - (maxSpeed * Math.random()));
	let circle = new Circle(position, velocity, minRadius + (maxRadius - minRadius) * Math.random());
	world.addEntity(circle);
}

// tick
var tick = function() {
	if (!pause) {
		world.tick();
		world.render();
	}
	requestAnimationFrame(tick);
};

// run
tick();
