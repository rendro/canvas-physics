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


var dyingCircleConstructor = function(position, velocity) {
	var minRadius = 2;
	var maxRadius = 7;
	var r = minRadius + (maxRadius - minRadius) * Math.random();
	return new DyingCircle(position, velocity, r, 3);
};

var circleConstructor = function(position, velocity) {
	var minRadius = 2;
	var maxRadius = 7;
	var r = minRadius + (maxRadius - minRadius) * Math.random();
	return new Circle(position, velocity, r);
};

var orbConstructor = function(position, velocity) {
	return new Orb(position, velocity);
};


////////////////////////////////////////////////////////////////////////////////
// BASIC SETUP
////////////////////////////////////////////////////////////////////////////////
var world = new World(document.getElementById('world'));
world.setSize(800, 500);
setTimeout(() => world.loop(), 0);

// important constraint that removes particels that are out of bounds
world.addConstraint(new ClearLost());

// GUI
var gui = new dat.GUI({width:400});

var worldGui = gui.addFolder('World');
worldGui.add(world, 'scale', 0, 2);
worldGui.add(world, 'rotate', 0, 360);
worldGui.add(world, 'paused');
worldGui.add(world, 'debug');
worldGui.add(world, 'frame');
worldGui.add(world, 'timePerAnimFrame', 1000/60, 200);
worldGui.open();

////////////////////////////////////////////////////////////////////////////////
// Click emitter
////////////////////////////////////////////////////////////////////////////////
world.addEntity(new ClickEmitter(world, circleConstructor));


////////////////////////////////////////////////////////////////////////////////
// drag
////////////////////////////////////////////////////////////////////////////////
var drag = new Drag(0);
world.addForce(drag);
var dragGui = gui.addFolder('Drag');
dragGui.add(drag, 'drag', 0, 1);


////////////////////////////////////////////////////////////////////////////////
// gravity
////////////////////////////////////////////////////////////////////////////////
var gravity = new ConstantForce(new Vec2D(0, 9.81));
gravity.active = false;
world.addForce(gravity);
var gavityGui = gui.addFolder('Gravity');
gavityGui.add(gravity, 'magnitude', 0, 100);
gavityGui.add(gravity, 'active');
gavityGui.add(gravity, 'invert');


////////////////////////////////////////////////////////////////////////////////
// edge bounce
////////////////////////////////////////////////////////////////////////////////
var edges = new EdgesConstraint();
edges.active = false;
world.addConstraint(edges);
worldGui.add(edges, 'active');


////////////////////////////////////////////////////////////////////////////////
// Wind
////////////////////////////////////////////////////////////////////////////////
var wind = new ConstantForce(new Vec2D(10, 0));
wind.active = false;
world.addForce(wind);
var windGui = gui.addFolder('Wind');
windGui.add(wind, 'magnitude', 0, 100);
windGui.add(wind, 'active');
windGui.add(wind, 'invert');


////////////////////////////////////////////////////////////////////////////////
// Attractor
////////////////////////////////////////////////////////////////////////////////
// world.addForce(new Attractor(new Vec2D(400, 300), -50));

// world.addForce(new Attractor(new Vec2D(200, 300), 400));
// world.addForce(new Attractor(new Vec2D(600, 300), 400));


////////////////////////////////////////////////////////////////////////////////
// Absorber
////////////////////////////////////////////////////////////////////////////////
// world.addForce(new Absorber(new Vec2D(650, 320), 500, 10));
// world.addForce(new Absorber(new Vec2D(180, 340), 500, 10));

// // edge particle killer
// world.addForce(new Absorber(new Vec2D(0, 0), 3, 20));
// world.addForce(new Absorber(new Vec2D(0, world.height), 3, 20));
// world.addForce(new Absorber(new Vec2D(world.width, 0), 3, 20));
// world.addForce(new Absorber(new Vec2D(world.width, world.height), 3, 20));


////////////////////////////////////////////////////////////////////////////////
// Emitter
////////////////////////////////////////////////////////////////////////////////
// var e1 = new Emitter(new Vec2D(250, 180), 10, 110, 90, 20, 50, circleConstructor);
// var e2 = new Emitter(new Vec2D(700, 300), 0.1, 0, 150, 10, 30, circleConstructor);
// var e3 = new Emitter(new Vec2D(300, 400), 0, 0, 90, 5, 10, circleConstructor);
// // world.addEntity(e1);
// // world.addEntity(e2);
// // world.addEntity(e3);

// //Snipper Emitters
// var se1 = new Emitter(new Vec2D(200, 110), 3, -45, -200, 0, 0, circleConstructor);
// var se2 = new Emitter(new Vec2D(400, 160), 5, 20, 50, 100, 0, circleConstructor);
// var se3 = new Emitter(new Vec2D(600, 120), 3, 45, -200, 0, 10, circleConstructor);
// world.addEntity(se1);
// world.addEntity(se2);
// world.addEntity(se3);

// class EmitterController {

// 	constructor() {
// 		this.emitter = [];
// 		this._emit = true;
// 	}

// 	set emit(value) {
// 		this.emitter.forEach((e) => e.paused = !value);
// 		this._emit = value;
// 	}

// 	get emit() {
// 		return this._emit;
// 	}

// 	addEmitter(...emitter) {
// 		emitter.forEach((e) => this.emitter.push(e));
// 	}

// }

// var emitterController = new EmitterController();

// emitterController.addEmitter(se1, se2, se3, e1, e2, e3);

// var emitterGui = gui.addFolder('Emitter');
// emitterGui.add(emitterController, 'emit');
