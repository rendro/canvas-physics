var dat = require('./ext/dat.gui.js');

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
world.addForce(gravity);

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
world.addForce(new Absorber(new Vec2D(650, 320), 500, 10));
world.addForce(new Absorber(new Vec2D(180, 340), 500, 10));

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
let se2 = new Emitter(new Vec2D(400, 160), 5, 20, 50, 100, 0, orbConstructor);
let se3 = new Emitter(new Vec2D(600, 120), 3, 45, -200, 0, 10, circleConstructor);
// world.addEntity(se1);
world.addEntity(se2);
// world.addEntity(se3);

let uiControlableEmitter = [
	se1, se2, se3, e1, e2, e3
];

world.addEntity(new ClickEmitter(world, orbConstructor));


world.loop();


// GUI
var gui = new dat.GUI();

var f1 = gui.addFolder('World');
f1.add(world, 'scale', 0, 2);
f1.add(world, 'rotate', 0, 360);
f1.add(world, 'paused');
f1.add(world, 'debug');
f1.add(world, 'timePerAnimFrame', 1000/60, 200);

f1.open();

var f2 = gui.addFolder('Gravity');
f2.add(gravity, 'invert');

var f2 = gui.addFolder('Wind');
f2.add(wind, 'invert');


