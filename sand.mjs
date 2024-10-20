// Sand, 2024.10.20.00.28.11.878
// bash are you fucking insane what's wrong with you

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

const round = (number, step) => {
	const half = step / 2;
	return number + half - ((number + half) % step);
  };

let particleSize = 4;
let res = 32 * particleSize;
let isTouching = false;
let particles = [];
let cursorPos = new Vector(-999, -999);

class Particle {
	constructor(x, y, color) {
		this.pos = new Vector(x, y);
		this.atRest = false;
		this.color = color;
		this.moveablePositions = [
			[0, 1 * particleSize],
			[1 * particleSize, 1 * particleSize],
			[-1 * particleSize, 1 * particleSize]
		]
	}
	
	draw(ink) {
		ink(this.color).box(this.pos.x, this.pos.y, 1 * particleSize, 1 * particleSize);
	}
}

function canMoveTo(x, y) {
	if (x < 0 || x >= res || y < 0 || y >= res) { return false }

	for (const particle of particles) {
		if (particle.pos.x == x && particle.pos.y == y) { return false }
	}

	return true;
}

function paint({ wipe, ink, line, screen }) {
	wipe("gray")
	particles.forEach(particle => {
		particle.draw(ink)
	})
}

// 📚 Library

function boot({ resolution }) {
	resolution(res)
}

function act({ event: e }) {
	if (e.name == "touch") {
		isTouching = true;
	}
	if (e.name == "lift" & isTouching == true) {
		isTouching = false;
	}
	if (isTouching) {
		try {
			cursorPos.x = round(e.x, 4);
			cursorPos.y = round(e.y, 4);
		} catch (e) {
			console.log(e)
		}
	}
}

function sim({ num }) {
	if (isTouching) {
		particles.push(new Particle(cursorPos.x, cursorPos.y, num.randInt(255)))
	}
	
	for (const [id, particle] of particles.entries()) {
		for (const moveablePosition of particle.moveablePositions) {
			if (canMoveTo(particle.pos.x + moveablePosition[0], particle.pos.y + moveablePosition[1])) {

				if (Math.abs(moveablePosition[0]) > 0 && Math.abs(moveablePosition[1]) > 0) {
					if (!canMoveTo(particle.pos.x + moveablePosition[0], particle.pos.y) && !canMoveTo(particle.pos.x, particle.pos.y + moveablePosition[1])) {
						continue;
					}
				}

				particle.pos.x += moveablePosition[0];
				particle.pos.y += moveablePosition[1];
				break;
			}
		}
	}
}

// function beat() {
//   // Runs once per metronomic BPM.
// }

// function leave() {
//  // Runs once before the piece is unloaded.
// }

// function preview({ ink, wipe }) {
// Render a custom thumbnail image.
// }

// function icon() {
// Render an application icon, aka favicon.
// }

// ⚠️ Also available: `brush` and `filter`.

// export const nohud = true;