// if you run this file ur a dweeb - bash

import Matter from 'https://cdn.jsdelivr.net/npm/matter-js@0.20.0/+esm';

// Polyfill for requestAnimationFrame and cancelAnimationFrame
if (typeof globalThis !== 'undefined') {
    if (!globalThis.requestAnimationFrame) {
        globalThis.requestAnimationFrame = function(callback) {
            return setTimeout(callback, 1000 / 60);
        };
    }
    if (!globalThis.cancelAnimationFrame) {
        globalThis.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}

// module aliases
var Engine = Matter.Engine,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Bodies = Matter.Bodies,
    World = Matter.World

// create an engine
var engine = Engine.create();
var world = engine.world;

function createCloth(x, y, columns, rows, spacing, stiffness) {
    var group = Matter.Body.nextGroup(true);
    var particleOptions = { friction: 0, collisionFilter: { group: group }, render: { visible: true }, damping: 0 };
    var constraintOptions = { stiffness: stiffness, damping: 0 };

    var cloth = Matter.Composites.stack(x, y, columns, rows, spacing, spacing, function(x, y) {
        return Matter.Bodies.circle(x, y, 5, particleOptions);
    });

    Matter.Composites.mesh(cloth, columns, rows, false, constraintOptions);

    // Add constraints to hold the top row of the cloth
    for (var i = 0; i < columns; i++) {
        var particle = cloth.bodies[i];
        Matter.World.add(world, Matter.Constraint.create({
            pointA: { x: particle.position.x, y: 50 },
            bodyB: particle,
            pointB: { x: 0, y: 0 },
            stiffness: 1.0, // Increase stiffness to prevent sliding
            damping: 0.1
        }));
    }

    return cloth;
}

// Example usage
var cloth = createCloth(200, 100, 15, 9, 20, 0);
Matter.World.add(world, cloth);

Composite.add(world, [
    cloth,
    Bodies.circle(300, 500, 80, { isStatic: true, render: { fillStyle: '#060a19' }}),
    Bodies.rectangle(500, 480, 80, 80, { isStatic: true, render: { fillStyle: '#060a19' }}),
    Bodies.rectangle(400, 609, 800, 50, { isStatic: true })
]);

// Variables to track mouse state
var mouseX = 0, mouseY = 0, mouseDown = false;
var mouseConstraint;

// Function to update the mouse constraint
function updateMouseConstraint() {
    if (mouseDown) {
        if (!mouseConstraint) {
            // Find the body under the mouse
            var bodies = Matter.Composite.allBodies(world);
            var body = bodies.find(body => Matter.Bounds.contains(body.bounds, { x: mouseX, y: mouseY }));

            if (body) {
                // Create a constraint
                mouseConstraint = Constraint.create({
                    pointA: { x: mouseX, y: mouseY },
                    bodyB: body,
                    pointB: { x: mouseX - body.position.x, y: mouseY - body.position.y },
                    stiffness: 0.2
                });
                World.add(world, mouseConstraint);
            }
        } else {
            // Update the constraint position
            mouseConstraint.pointA = { x: mouseX, y: mouseY };
        }
    } else {
        if (mouseConstraint) {
            // Remove the constraint
            World.remove(world, mouseConstraint);
            mouseConstraint = null;
        }
    }
}

function render() {
    var bodies = Matter.Composite.allBodies(world);

    // Collect body data
    var bodyData = bodies.map(body => ({
        id: body.id,
        position: body.position,
        angle: body.angle,
        vertices: body.vertices.map(v => ({ x: v.x, y: v.y }))
    }));

    // Output body data (for example, log to console or send to server)
    // console.log(bodyData);

    Engine.update(engine);

    updateMouseConstraint();

    requestAnimationFrame(render);
}

render();

function boot({ resolution }) {
    resolution(800, 600);
}

function paint({ ink, wipe }) {
    wipe(255, 255, 255);

    var bodies = Matter.Composite.allBodies(world);

    bodies.forEach(body => {
        if (body.vertices.length > 1) {
            for (var i = 0; i < body.vertices.length; i++) {
                var vertexA = body.vertices[i];
                var vertexB = body.vertices[(i + 1) % body.vertices.length]; // Wrap around to the first vertex
                ink(0, 0, 0).line(vertexA.x, vertexA.y, vertexB.x, vertexB.y);
            }
        }
    });
}

function act({ event }) {
	// console.log(event)
    if (event.is("drag")) {
        mouseX = event.x;
        mouseY = event.y;
    }
    if (event.is("touch")) {
        mouseDown = true;
		mouseX = event.x;
		mouseY = event.y;
    }
    if (event.is("lift")) {
        mouseDown = false;
    }
}

render();