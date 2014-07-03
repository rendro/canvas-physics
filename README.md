# Physics Canvas 

By using the experimental frontend boilerplate and a little self written 2D vector class we built an environment where you can play around with some basic physical laws and built your own little physics world on a canvas. By utilizing the boilerplate which comes already with some really awesome modern technologies, this demo is written all in handy beautiful and readable ecmascript 6 syntactic sugar. Give it a try, you will not regret it!

Here the link if you are interested how the Boilerplate is built: [Experimental Frontend Boilerplate](https://github.com/rendro/experimental-frontend-boilerplate)

## Physical Laws

**v = velocity**

**a = acceleration**

**t = time**

**d = distance**

**f = Force**

**F = Sum of Forces**

**m = mass (In our Model the mass is always 1 ...)**

# Most important law:
(Newtons 1st law of motion)

**F = m*a**

Velocity is the difference in distance divided by the difference in time

**v = ds/dt**

Acceleration is the difference in velocity divided by the difference in time

**a = dv/dt**

which results in the following statements also known as the the first law of Newton:

* An object that is at rest will stay at rest unless an external force acts upon it.<cite>Newtons 1st Law </cite>
* An object that is in motion will not change its velocity unless an external force acts upon it.<cite>Newtons 1st Law </cite>

## Creating a world in Physics Canvas

```js
var world = new World(document.getElementById('world'));
world.setSize(800, 500);
setTimeout(() => world.loop(), 0);
```

## Constraints

Create a Constraint ...

```js
var constraint = new Constraint 
world.addConstraint(constraint);
```

but be careful this is just the base class. We built you already an example which extends from the base class.

```js
var edges = new EdgesConstraint();
world.addConstraint(edges);
```

## Forces:

Some of the forces and entities are not precisely modelled if you compare it to the real world, but for this demonstration it was enough.

# Constant Forces:

We already built some basic constant forces like wind, gravity or drag. They all look the same and just have different values. The base class is force and all other forces inherit what force has implemented.

Wind:

```js
var wind = new ConstantForce(new Vec2D(10, 0));
world.addForce(wind);
```

# Position dependent forces:

Absorber:

```js
world.addForce(new Absorber(new Vec2D(180, 340), 500, 10));
```

Attractor/Distractor:

```js
world.addForce(new Attractor(new Vec2D(400, 300), -50));
```

## Particles

We implemented already circles, dyingcircles and orbs.

```js
var orbConstructor = function(position, velocity) {
    return new Orb(position, velocity);
};
```

## Particle Emitter

```js
var e1 = new Emitter(new Vec2D(300, 400), 0, 0, 90, 5, 10, orbConstructor);
world.addEntity(e1);
```

## GUI

To control and also change the values of the different Units in our modelled world we used the **dat-gui JavaScript Controller Library** which suits perfectly for our purpose, but if want can easily built your own controls.

Reference:  
[dat-gui JavaScript Controller Library](http://code.google.com/p/dat-gui)


## How to start?

First, you need to install all packages via npm:

```
$ npm install
```

Start the server:

```
$ npm start
```

Then visit [http://localhost:3000](http://localhost:3000)

If you want to run the server on a different port:

```
$ PORT=12345 npm start
```
