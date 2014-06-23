var World = require('./CanvasWorld.js');
var Vec2D = window.v = require('./vec2d.js');
var EdgesConstraint = require('./constraints/edges.js');
var Circle = require('./entities/dyingcircle.js');

// pause checkbox
var pausedCheckbox = document.getElementById('pause');
var pause = false;
pausedCheckbox.addEventListener('change', function() {
	pause = pausedCheckbox.checked;
});

var canvas = document.getElementById('world')
var world = new World(canvas);
world.setSize(800, 500);
world.addConstraint(new EdgesConstraint());


var inversegravity = document.getElementById('inversegravity');
inversegravity.addEventListener('change', function() {
	world.gravity.multiply(-1);
});


// add particles
var particles = 1;
var maxSpeed = 10;
var maxRadius = 5;
var minRadius = 2;
var createParticle = function(x, y) {
	let position = new Vec2D(x || world.width * Math.random(), y || world.height * Math.random());
	let velocity = new Vec2D((maxSpeed/2) - (maxSpeed * Math.random()), (maxSpeed/2) - (maxSpeed * Math.random()));
	let circle = new Circle(position, velocity, minRadius + (maxRadius - minRadius) * Math.random());
	world.addEntity(circle);
};
for (let i = 0; i < particles; i++) {
	createParticle();
}

canvas.addEventListener('click', function(e) {
	var x;
	var y;
	if (e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	}
	else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	createParticle(x, y);
});


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

// run
tick();
