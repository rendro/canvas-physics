var UiElement       = require('./uielement.js');
var World           = require('./CanvasWorld.js');
var Vec2D           = require('./vec2d.js');

var ConstantForce   = require('./forces/constant.js');
var Drag            = require('./forces/drag.js');
var Attractor       = require('./forces/attractor.js');
var Absorber        = require('./forces/absorber.js');

var EdgesConstraint = require('./constraints/edges.js');
var ClearLost       = require('./constraints/clearlost.js');

var Circle          = require('./entities/circle.js');
var DyingCircle     = require('./entities/dyingcircle.js');
var Emitter         = require('./entities/emitter.js');
var ClickEmitter    = require('./entities/clickemitter.js');
var Orb             = require('./entities/orb.js');


var world = new World(document.getElementById('world'));

world.setSize(800, 500);

world.addConstraint(new EdgesConstraint());
world.addConstraint(new ClearLost());

// gravity
let gravity = new ConstantForce(new Vec2D(0, 9.81));
// world.addForce(gravity);

// wind
let wind = new ConstantForce(new Vec2D(0, 0));
world.addForce(wind);

// drag
world.addForce(new Drag(0.01));

// Attractor or Deflector
world.addForce(new Attractor(new Vec2D(400, 300), -50));

// world.addForce(new Attractor(new Vec2D(200, 300), 400));
// world.addForce(new Attractor(new Vec2D(600, 300), 400));

//CenterAbsorber
world.addForce(new Absorber(new Vec2D(650, 320), 500, 40));
world.addForce(new Absorber(new Vec2D(180, 340), 500, 40));

// edge particle killer
world.addForce(new Absorber(new Vec2D(0, 0), 3, 20));
world.addForce(new Absorber(new Vec2D(0, world.height), 3, 20));
world.addForce(new Absorber(new Vec2D(world.width, 0), 3, 20));
world.addForce(new Absorber(new Vec2D(world.width, world.height), 3, 20));

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

var orbConstructor = function(position, velocity) {
	return new Orb(position, velocity);
};

let e1 = new Emitter(new Vec2D(250, 180), 10, 110, 90, 20, 50, circleConstructor);
let e2 = new Emitter(new Vec2D(700, 300), 0.1, 0, 150, 10, 30, circleConstructor);
let e3 = new Emitter(new Vec2D(300, 400), 0, 0, 90, 5, 10, circleConstructor);
// world.addEntity(e1);
// world.addEntity(e2);
// world.addEntity(e3);

//Snipper Emitters
let se1 = new Emitter(new Vec2D(200, 110), 3, -45, -200, 0, 0, circleConstructor);
let se2 = new Emitter(new Vec2D(400, 160), 1, 0, 200, 0, 10, orbConstructor);
let se3 = new Emitter(new Vec2D(600, 120), 3, 45, -200, 0, 10, circleConstructor);
// world.addEntity(se1);
world.addEntity(se2);
// world.addEntity(se3);

let uiControlableEmitter = [
	se1, se2, se3, e1, e2, e3
];

world.addEntity(new ClickEmitter(world, orbConstructor));


var count = document.getElementById('pcount');
var animationFramesPerSecond = document.getElementById('animationFramesPerSecond');
// tick
var tick = function() {
	world.tick();
	world.render();
	count.value = world.entities.length;
	animationFramesPerSecond.innerHTML = world.animationFramesPerSecond.toFixed(2);
	if (!world.paused) {
		requestAnimationFrame(tick);
	}
};

/**
 * UI ELEMENTS FOR CONTROLS
 */
UiElement('#pause', 'change', function(e){
	world.paused = e.target.checked;
	!world.paused && tick();
});
UiElement('#inversegravity', 'change', () => gravity.force.multiply(-1));
UiElement('#debug', 'change', (e) => world.debug = e.target.checked );
UiElement('#pauseemitter', 'change', (e) => uiControlableEmitter.forEach((em) => em.paused = e.target.checked));
UiElement('#timewarp', 'change', (e) => world.animationFramesPerSecond = parseFloat(e.target.value));
UiElement('#windstrength', 'change', (e) => wind.force = new Vec2D(e.target.value, 0));
UiElement('#nextTick', 'click', () => world.paused && tick());

// run
// tick();
