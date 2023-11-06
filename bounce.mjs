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

let gravity = new Vector(0, 0.03)
let res = {
	width: 300,
	height: 200
}

class Entity {
	constructor(
		pos = new Vector(150, 150),
		size = 5,
		bounciness = 0.5
	) {
		this.pos = pos;
		this.vel = new Vector(0, 0);
		this.size = size;
		this.bounciness = bounciness;

		this.isGrounded = false;
	}

	draw(ink) {
		ink(this.isGrounded ? [0, 255, 255] : "white").circle(this.pos.x, this.pos.y, this.size)
	}

	sim() {
		if (!this.isGrounded) {
			this.vel.add(gravity)
			this.pos.add(this.vel)
			if (this.pos.y >= res.height - this.size - 5) {
				this.pos.y = res.height - this.size - 5;
				this.vel.y = -this.vel.y * this.bounciness
				if (Math.abs(this.vel.y) < 0.02) {
					this.vel.y = 0;
					this.isGrounded = true;
				}
			}
		}
	}
}

// 🥾 Boot
function boot({ wipe, resolution }) {
	// Runs once at the start.
	resolution(res)
}

let balls = []
let axes = [30, 60, 90, 120, 150, 180, 210, 240, 270]
let bouncinesses = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
for (let i = 0; i < axes.length; i++) {
	balls.push(new Entity(new Vector(axes[i], 50), 5, bouncinesses[i]))
}

// 🎨 Paint
function paint({ ink, wipe }) {
	wipe(0)
	ink(255).box(1, 1, 298, 298, "outline")
	ink(255, 255, 255, 128)
	.line(15, 0, 15, 200)
	.line(0, 195, 300, 195)
	axes.forEach((element, index, arr) => {
		ink(255, 255, 255, 128).line(element + 15, 0, element + 15, 200)
		ink(255).write(bouncinesses[index], {x: element, y: 35, center: "xy"})
	});
	balls.forEach(element => {
		element.draw(ink)
	});
	// return false; // Uncomment for a frame loop.
}

// 🎪 Act
// function act({ event }) {
//  // Respond to user input here.
// }

// 🧮 Sim
function sim() {
	// Runs once per logic frame. (120fps locked.)
	balls.forEach(element => {
		element.sim()
	});
}

// 🥁 Beat
// function beat() {
//   // Runs once per metronomic BPM.
// }

// 👋 Leave
// function leave() {
//  // Runs once before the piece is unloaded.
// }

// 📰 Meta
function meta() {
  return {
    title: "Bounce.mjs",
    desc: "A piece called `bounce.mjs`.",
  };
}

// 🖼️ Preview
// function preview({ ink, wipe }) {
// Render a custom thumbnail image.
// }

// 🪷 Icon
// function icon() {
// Render an application icon, aka favicon.
// }

export { boot, paint, meta, sim };

// 📚 Library
//   (Useful functions used throughout the piece)
