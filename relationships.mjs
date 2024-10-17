// Blank, 2024.10.16.18.09.17.917
// A blank piece.

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

let cursor = new Vector(0, 0)
let holdLimited = false;
let res = 128;

class Box {
	constructor(width, height, x, y) {
		this.width = (width ? width : 16)
		this.height = (height ? height : 16)
		
		this.pos = new Vector(x, y)

		this.livePos = new Vector(x, y)

		this.futurePos = new Vector(x, y)
		
		this.minBound = new Vector(NaN, NaN)
		this.maxBound = new Vector(NaN, NaN)
		this.cursorRelative = new Vector(NaN, NaN)

		this.isTouching = false;
		this.isHolding = false;

		this.vel = new Vector(0, 0)
		this.dir = new Vector(NaN, NaN)
		this.friction = 5
	}

	draw(ink) {
		ink(255, 0, 0, 128).box(this.futurePos.x - this.width / 2, this.futurePos.y - this.height / 2, this.width, this.height, "outline")
		ink(0, 0, 255, 128).box(this.pos.x - this.width / 2, this.pos.y - this.height / 2, this.width, this.height, "outline")

		ink(this.isHolding ? [255, 255, 0] : (this.isTouching ? [0, 255, 0] : 255)).box(this.livePos.x - this.width / 2, this.livePos.y - this.height / 2, this.width, this.height, "outline")
	}

	act(event) {
		// Update Bounds
		this.minBound = new Vector(this.livePos.x - this.width / 2, this.livePos.y - this.height / 2)
		this.maxBound = new Vector(this.livePos.x + this.width / 2, this.livePos.y + this.width / 2)

		// Check if Touching
		if (
			cursor.x >= this.minBound.x & 
			cursor.x <= this.maxBound.x & 
			cursor.y >= this.minBound.y & 
			cursor.y <= this.maxBound.y 
		) {
			this.isTouching = true;
		} else {
			this.isTouching = false;
		}

		// Update relative cursor position
		if (this.isTouching & !this.isHolding) {
			this.cursorRelative.x = cursor.x - this.minBound.x
			this.cursorRelative.y = cursor.y - this.minBound.y
		}

		// On touch a box
		if (event.name == "touch" & this.isTouching & !holdLimited) {
			this.isHolding = true;
			holdLimited = true;
		}

		// While touching box
		if (event.name == "draw" & this.isHolding) {
			this.futurePos.x = (event.x - event.drag.x + (event.drag.x)) + this.width / 2 + -this.cursorRelative.x
			this.futurePos.y = (event.y - event.drag.y + (event.drag.y)) + this.height / 2 + -this.cursorRelative.y
		}

		// On stop touching a box
		if (event.name == "lift" & this.isHolding) {
			this.isHolding = false;
			holdLimited = false;
			this.pos.x = this.futurePos.x
			this.pos.y = this.futurePos.y
			this.futurePos.x = this.pos.x
			this.futurePos.y = this.pos.y
		}
	}

	sim() {
		this.dir.x = (this.futurePos.x / this.livePos.x) * 2 - 2
		this.dir.y = (this.futurePos.y / this.livePos.y) * 2 - 2

		this.vel.x += (this.dir.x)
		this.vel.y += (this.dir.y)

		this.vel.x -= (this.vel.x * 0.125)
		this.vel.y -= (this.vel.y * 0.125)

		this.livePos.x += this.vel.x
		this.livePos.y += this.vel.y

		if (Math.abs(this.vel.x) < 0.001) { this.vel.x = 0; this.livePos.x = this.futurePos.x }
		if (Math.abs(this.vel.y) < 0.001) { this.vel.y = 0; this.livePos.y = this.futurePos.y }

		if (this.livePos.x < this.width / 2 | this.livePos.x > res - this.width / 2) { this.livePos.x = this.futurePos.x; this.vel.x = 0 }
		if (this.livePos.y < this.height / 2 | this.livePos.y > res - this.height / 2) { this.livePos.y = this.futurePos.y; this.vel.y = 0 }
	}
}

let boxes = [
	new Box(16, 16, 32, 40),
	new Box(16, 16, 96, 40),
	new Box(16, 16, 64, 96)
]

function paint({ wipe, ink, line, screen }) {
  wipe("gray");
  boxes.forEach(box => {
	box.draw(ink)
  })
//   ink(255, 255, 0).circle(cursor.x, cursor.y, 4, "solid")

}

// 📚 Library

function boot({resolution}) {
	resolution(res)
}

function act({ event: e }) {
	cursor.x = e.x;
	cursor.y = e.y;

	boxes.forEach(box => {
		box.act(e)
	})
}

function sim() {
	boxes.forEach(box => {
		box.sim()
	})
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