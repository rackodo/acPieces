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
    Bodies = Matter.Bodies,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();
var world = engine.world;

// create two boxes and a ground
var boxA = Bodies.rectangle(190, 100, 20, 20, { restitution: 0.8 });
var boxB = Bodies.rectangle(150, 150, 80, 80, { restitution: 0.8 });
var ground = Bodies.rectangle(0, 290, 600, 10, { isStatic: true });
var wall1 = Bodies.rectangle(0, 0, 10, 600, { isStatic: true });
var wall2 = Bodies.rectangle(300, 0, 10, 600, { isStatic: true });

// add all of the bodies to the world
World.add(world, [boxA, boxB, ground, wall1, wall2]);

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

function boot({ resolution }) {
    resolution(300);
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
    if (event.is("draw")) {
        mouseX = event.x;
        mouseY = event.y;
    }
    if (event.is("touch")) {
        mouseDown = true;
    }
    if (event.is("lift")) {
        mouseDown = false;
    }
}

render();