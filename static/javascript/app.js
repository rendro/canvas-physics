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
// world.addForce(wind);

// drag
world.addForce(new Drag(0.01));

//Attractor
world.addForce(new Attractor(new Vec2D(500, 250), -50));
world.addForce(new Attractor(new Vec2D(200, 250), 50));

//Absorber
world.addForce(new Absorber(new Vec2D(200, 250), 0, 3));
world.addForce(new Absorber(new Vec2D(50, 50), 50, 40));


world.addForce(new Absorber(new Vec2D(0, world.height), 5, 20));
world.addForce(new Absorber(new Vec2D(world.width, world.height), 5, 20));

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

let e1 = new Emitter(new Vec2D(250, 180), 10, 0, 40, 10, 10, circleConstructor);
let e2 = new Emitter(new Vec2D(700, 300), 10, -55, 100, 10, 30, circleConstructor);
let e3 = new Emitter(new Vec2D(300, 400), 10, 0, 90, 5, 10, circleConstructor);
world.addEntity(e1);
world.addEntity(e2);
world.addEntity(e3);
// world.addEntity(new Circle(new Vec2D(100, 100), new Vec2D(50, -40), 5));

//Sniper Emitter
let sniperEmitter = new Emitter(new Vec2D(700, 300), 2, -50, 100, 0, 10, circleConstructor);
world.addEntity(sniperEmitter);

let uiControlableEmitter = [sniperEmitter, e1, e2, e3];


var count = document.getElementById('pcount');
var timeconst = document.getElementById('timeconst');
// tick
var tick = function() {
	world.tick();
	world.render();
	count.value = world.entities.length;
	timeconst.innerHTML = world.TIMECONST.toFixed(2);
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
UiElement('#timewarp', 'change', (e) => world.TIMECONST = e.target.value);
UiElement('#nextTick', 'click', tick);

// run
tick();
