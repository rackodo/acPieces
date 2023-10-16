let center = {
	x: undefined,
	y: undefined
}

const getDistance = (x1, y1, x2, y2) => {
	let a = x1 - x2;
	let b = y1 - y2;

	return Math.sqrt( a*a + b*b )
}

class Detector {
	constructor () {
		this.CircleDetect = class {
			constructor(x, y, radius) {
				this.origin = {
					x: x,
					y: y
				}
				this.radius = radius;
				this.isTouching = false;
				this.isHeld = false;
			}

			draw(ink) {
				ink(this.isTouching ? "yellow" : "white").circle(this.origin.x, this.origin.y, this.radius - 0.5, false)
				ink(this.isTouching ? "yellow" : "white").circle(this.origin.x, this.origin.y, this.radius, false)
				ink(this.isTouching ? "yellow" : "white").circle(this.origin.x, this.origin.y, this.radius + 0.5, false)
			}

			calculate(x, y, click) {
				let distance = getDistance(x, y, this.origin.x, this.origin.y)
			
				if (distance <= this.radius) {
					this.isTouching = true;
					if (click) {
						this.isHeld = true;
					} else {
						this.isHeld = false;
					}
				}
				else {
					this.isTouching = false;
				}
			}
		};
		this.RectDetect = class {
			constructor(x, y, w, h) {
				this.origin = {
					x: x,
					y: y
				}
				this.size = {
					x: w,
					y: h
				}
				this.isTouching = false;
				this.isHeld = false;
			}

			draw(ink) {
				ink(this.isTouching ? "yellow" : "white").box(this.origin.x, this.origin.y, this.size.x - 0.5, this.size.y - 0.5)
				ink(this.isTouching ? "yellow" : "white").box(this.origin.x, this.origin.y, this.size.x, this.size.y)
				ink(this.isTouching ? "yellow" : "white").box(this.origin.x, this.origin.y, this.size.x + 0.5, this.size.y + 0.5)

				ink("red").circle(this.origin.x, this.origin.y, 2)
				ink("red").circle(this.origin.x, this.origin.y + this.size.y, 2)
				ink("red").circle(this.origin.x + this.size.x, this.origin.y, 2)
				ink("red").circle(this.origin.x + this.size.x, this.origin.y + this.size.y, 2)
			}

			calculate(x, y, click) {
			let relative = {
				x: this.origin.x + this.size.x,
				y: this.origin.y + this.size.y
			}

				if (
					x >= this.origin.x && 
					x <= relative.x && 
					y >= this.origin.y && 
					y <= relative.y
				) {
					this.isTouching = true;
					if (click) {
						this.isHeld = true;
					} else {
						this.isHeld = false;
					}
				}
				else {
					this.isTouching = false;
				}
			}
		}
		this.point = {
			x: undefined,
			y: undefined
		}
		this.isClicking = false;
	}

	trackPoint ( event ) {
		this.point.x = event.x;
		this.point.y = event.y;
		if (event.is("touch")) {
			this.isClicking = true;
		}
		if (event.is("lift")) {
			this.isClicking = false;
		}
	}
	
}

let detect = new Detector();

let circleA = new detect.CircleDetect(undefined, undefined, 10);
let circleB = new detect.CircleDetect(undefined, undefined, 10);
let rectA = new detect.RectDetect(5, 25, 50, 50);

// 🥾 Boot
function boot({ wipe, screen, num }) {
	center.x = screen.width / 2;
	center.y = screen.height / 2;

	// Runs once at the start.
	wipe(0)

	circleA.origin = {x: center.x - 50, y: center.y}
	circleB.origin = {x: center.x + 50, y: center.y}
}

// 🎨 Paint
function paint({ ink, wipe }) {
	wipe(0)
	circleA.draw(ink)
	circleB.draw(ink)

	rectA.draw(ink)

	ink(255, 255, 255, 50).line(circleA.origin, circleB.origin)

	ink("white").write(Math.round(getDistance(circleA.origin.x, circleA.origin.y, circleB.origin.x, circleB.origin.y)), {x: (circleA.origin.x+circleB.origin.x)/2, y: (circleA.origin.y+circleB.origin.y)/2, center: "xy"})
}

// 🎪 Act
function act({ event }) {
	// Respond to user input here.
	detect.trackPoint(event)

	if (event.is("draw")) {
		if (circleA.isHeld) {
			circleA.origin = {x: event.x, y: event.y}
		}
		if (circleB.isHeld) {
			circleB.origin = {x: event.x, y: event.y}
		}
	}
}

// 🧮 Sim
function sim() {
	// Runs once per logic frame. (120fps locked.)
	circleA.calculate(detect.point.x, detect.point.y, detect.isClicking)
	circleB.calculate(detect.point.x, detect.point.y, detect.isClicking)
	rectA.calculate(detect.point.x, detect.point.y, detect.isClicking)
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
	title: "Touchdetection2",
	desc: "A piece called `touchdetection`.",
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

export { boot, paint, meta, act, sim };

// 📚 Library
//   (Useful functions used throughout the piece)
