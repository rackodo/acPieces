let birdSprite = "@bash/2024.8.02.15.01.30.875"

// Random code grabbed from https://www.youtube.com/watch?v=XD-7anXSOp0.
function randomNumBetween(min, max) {
	return min + Math.random() * (max - min);
}

function boxCollision(objA_x, objA_y, objA_width, objA_height, objB_x, objB_y, objB_width, objB_height) {
	if (
		objA_x + objA_width >= objB_x &&
		objA_x <= objB_x + objB_width &&
		objA_y + objA_height >= objB_y &&
		objA_y <= objB_y + objB_height
	) {
		return true
	} else {
		return false
	}
}

// Vector code grabbed from https://www.youtube.com/watch?v=XD-7anXSOp0.
class Vector {
	constructor(x, y) {
		this.x = x,
		this.y = y
	}
	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}
	mult(scalar) {
		this.x += scalar;
		this.y += scalar;
	}
	sub(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}
	copy() {
		return new Vector(this.x, this.y);
	}
	static random(minX, minY, maxX, maxY) {
		return new Vector(
			randomNumBetween(minX, maxX),
			randomNumBetween(minY, maxY)
		);
	}
}

let hasFailed = false;
let points = 0;
let debug = false;
let scoreProgressed = false;
let gravity = new Vector(0, 0.03)

String.prototype.toRGB = function() {
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    var rgb = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255;
        rgb[i] = value;
    }
    return [rgb[0], rgb[1], rgb[2]];
}

let playerColour;

class Bird {
	constructor() {
		this.pos = new Vector(60, 200)
		this.vel = new Vector(0, 0)
		this.isTouching = false,

		this.width = 24;
		this.height = 20;

		this.fallFactor = 1,
		this.jumpFactor = 1.5
		this.bounds = [
			new Vector(0, 0),
			new Vector(this.width, 0),
			new Vector(0, this.height),
			new Vector(this.width, this.height)
		]
	}

	draw(ink) {
		// ink(playerColour).box(this.pos.x, this.pos.y, this.width, this.height, (debug ? "outline" : ""))
		ink().stamp(birdSprite, this.pos.x + (this.width / 2), this.pos.y + (this.height / 2));
	}

	drawBounds(ink) {
		for (let i = 0; i < this.bounds.length; i++) {
			ink(255, 0, 0).circle((this.pos.x + this.bounds[i].x), (this.pos.y + this.bounds[i].y), 3 )
		}
	}

	update() {
		this.vel.add(gravity)
		this.pos.add(this.vel)
	}
}

class Pipes {
	constructor() {
		this.width = 20,
		this.centrePos = new Vector(220, 200),
		this.speed = new Vector(-0.5, 0)
		this.gap = 50

		this.pipeTop = {
			w: this.width * 2,
			h: 0,
			pos: new Vector(0, 0)
		}

		this.pipeBottom = {
			w: this.width * 2,
			h: 0,
			pos: new Vector(0, 0)
		}
	}

	draw(ink) {
		ink(0, 255, 255).
		box(this.centrePos.x - this.width, 0, (this.width * 2), (this.centrePos.y - this.gap), (debug ? "outline" : "")).
		box(this.centrePos.x - this.width, this.centrePos.y + this.gap, this.width * 2, 400 - this.centrePos.y - this.gap, (debug ? "outline" : ""))
	}

	drawCentre(ink) {
		ink(255, 0, 0).
		circle(this.centrePos.x, this.centrePos.y, 5).
		circle(this.centrePos.x, this.centrePos.y - this.gap, 5).
		circle(this.centrePos.x, this.centrePos.y + this.gap, 5).
		circle(this.pipeTop.pos.x, this.pipeTop.pos.y, 5).
		circle(this.pipeTop.pos.x + this.pipeTop.w, this.pipeTop.pos.y + this.pipeTop.h, 5).
		circle(this.pipeBottom.pos.x, this.pipeBottom.pos.y, 5).
		circle(this.pipeBottom.pos.x + this.pipeBottom.w, this.pipeBottom.pos.y + this.pipeBottom.h, 5)
	}
	
	update() {
		this.pipeTop.pos.x = this.centrePos.x - this.width
		this.pipeTop.pos.y = 0
		this.pipeTop.h = this.centrePos.y - this.gap
	
		this.pipeBottom.pos.x = this.centrePos.x - this.width
		this.pipeBottom.pos.y = this.centrePos.y + this.gap
		this.pipeBottom.h = 400 - (this.centrePos.y + this.gap)
		
		this.centrePos.add(this.speed)

		if (this.centrePos.x <= -20) {
			this.centrePos.x = 220;
			this.centrePos.y = randomNumBetween(100, 300)
			this.speed.x -= 0.025
			scoreProgressed = false;
		}
	}
}

let bird = new Bird();
let pipes = new Pipes();

// 🥾 Boot
function boot({ wipe, resolution, handle }) {
	if (handle()) {
		let hndl = Array.from(handle())
		hndl.splice(0, 1)
		hndl = hndl.join("")
		console.log(hndl)
		playerColour = hndl.toRGB()
	}
	else {
		playerColour = [255, 255, 0]
	}

	// Runs once at the start.
	resolution(200, 400)
	wipe(255);
	pipes.centrePos.y = randomNumBetween(100, 300)
}

// 🎨 Paint
function paint({ ink, screen, wipe, clear }) {
	wipe(hasFailed ? [255, 0, 0] : 0);
	pipes.draw(ink)
	bird.draw(ink);
	
	if (debug) {
		pipes.drawCentre(ink)
		bird.drawBounds(ink)
	}
	ink(255).box(1, 1, screen.width - 2, screen.height - 2, "outline")
	ink("white").write(points.toString(), {x: bird.pos.x + bird.height / 2, y: bird.pos.y + 25, center: "y"})
}

// 🎪 Act
function act({ event, resolution, sound: { play, synth }}) {
	const flapSound = () => {
		synth({
		  type: "sine",
		  tone: 300,
		  attack: 0.1,
		  decay: 0.99,
		  volume: 0.75,
		  duration: 0.1,
		});
	}
	// Respond to user input here.
	if (event.is("keyboard:down:space") && !event.repeat || event.is("touch")) {
		flapSound()
		bird.vel.y = -1.2;
	}

	if (event.is("reframed")) {
		resolution(200, 400)
	}
}

// 🧮 Sim
function sim({sound: { play, synth }}) {
	const crash = () => {
		synth({
		  type: "square",
		  tone: 50,
		  attack: 0,
		  decay: 0,
		  volume: 0.75,
		  duration: 0.2,
		});
	}

	const ping = () => {
		synth({
		  type: "sine",
		  tone: 600,
		  attack: 0,
		  decay: 0.9,
		  volume: 0.75,
		  duration: 0.2,
		});
	}

	bird.update();
	pipes.update()

	hasFailed = (
		boxCollision(
			bird.pos.x, 
			bird.pos.y, 
			bird.width, 
			bird.height, 
			pipes.pipeTop.pos.x, 
			pipes.pipeTop.pos.y, 
			pipes.pipeTop.w, 
			pipes.pipeTop.h
		) || 
		boxCollision(
			bird.pos.x, 
			bird.pos.y, 
			bird.width, 
			bird.height, 
			pipes.pipeBottom.pos.x, 
			pipes.pipeBottom.pos.y, 
			pipes.pipeBottom.w, 
			pipes.pipeBottom.h
		) ||
		bird.pos.y <= 0 ||
		bird.pos.y >= 380
	)

	if (hasFailed) {
		crash()
		fail()
	}

	if (pipes.centrePos.x <= 60 && scoreProgressed == false) {
		scoreProgressed = true;
		ping()
		points += 1;
	}
}

// 📰 Meta
function meta() {
	return {
	title: "bird",
	desc: "Flappy Bird Clone in Aesthetic.",
	};
}

function fail() {
	bird = new Bird();
	pipes = new Pipes();
	points = 0;
}

export { boot, paint, sim, act, meta };