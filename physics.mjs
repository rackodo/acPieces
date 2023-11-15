import Vector from 'https://assets.rackodo.dev/aesthetic-computer/vector.mjs'

class Ball {
	constructor(
		colour = [0, 255, 255],
		velX = 1, velY = 1 ) {
		this.size = 0.1;
		this.colour = colour;
		
		this.gravity = new Vector(0.0, 0.005)
		this.pos = new Vector(150, 150)
		this.vel = new Vector(velX, velY)

		this.groundedX = false;
		this.groundedY = false;
		this.isGrounded = false;
		
		this.speed = 1;
		this.bounciness = 0.8;
		this.friction = new Vector(0.001, 0.00);
		this.maxVel = 5;
	}

	draw(ink) {
		ink(this.colour).circle(this.pos.x, this.pos.y, this.size, true)
	}

	update() {
		// console.log(this.vel)
		// console.log(Math.floor(this.pos.x), Math.floor(this.pos.y), Math.floor(this.vel.x), Math.floor(this.vel.y))
		if (!this.isGrounded) {
			this.vel.add(this.gravity)
			this.pos.add(this.vel)
			if (this.pos.x >= 300 - this.size) {
				this.pos.x = 300 - this.size;
				this.vel.x = -this.vel.x * this.bounciness
			}
			if (this.pos.y >= 300 - this.size) {
				this.pos.y = 300 - this.size;
				this.vel.y = -this.vel.y * this.bounciness
			}
			if (this.pos.x <= 0 + this.size) {
				this.pos.x = 0 + this.size;
				this.vel.x = -this.vel.x * this.bounciness
			}
			if (this.pos.y <= 0 + this.size) {
				this.pos.y = 0 + this.size;
				this.vel.y = -this.vel.y * this.bounciness
			}
			if (
				Math.abs(this.vel.x) + Math.abs(this.vel.y) / 2 <= 0.0323 &&
					(this.pos.x >= 300 - this.size) |
					(this.pos.x <= 0 + this.size) |
					(this.pos.y >= 300 - this.size) |
					(this.pos.y <= 0 + this.size)
				) {
				this.isGrounded = true;
			}

			// console.log(this.vel.x)

			if (this.vel.y < 0) {
				this.vel.y += this.friction.y;
			} else {
				this.vel.y -= this.friction.y;
			}



			if (this.vel.x < 0) {
				this.vel.x += this.friction.x;
			} else {
				this.vel.x -= this.friction.x;
			}

		}
	}
}

let balls = []

for (let i = 0; i < 1000; i++) {
	balls.push(new Ball([Math.random() * 255, Math.random() * 255, Math.random() * 255], Math.random() * 10 - 5, Math.random() * 10 - 5))
}

// 🥾 Boot
function boot({ wipe, resolution }) {
  // Runs once at the start.
	console.clear()
	wipe(0);
	resolution(300)
}

// 🎨 Paint
function paint({ ink, wipe }) {
	wipe(0)
	balls.forEach(element => {
		element.draw(ink)
	});
}

// 🎪 Act
// function act({ event }) {
//  // Respond to user input here.
// }

// 🧮 Sim
function sim() {
	balls.forEach(element => {
		element.update()
	});
	// Runs once per logic frame. (120fps locked.)
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
    title: "Physics",
    desc: "A piece called `physics`.",
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

export { boot, paint, sim, meta };

// 📚 Library
//   (Useful functions used throughout the piece)
