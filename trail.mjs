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

let points = []

for (let i = 0; i < 5; i++) {
	points.push(new Vector(150 - (i * 5), 150))
}

let fruit = new Vector(Math.random() * 300, Math.random() * 300)

const getDistance = (x1, y1, x2, y2) => {
	let a = x1 - x2;
	let b = y1 - y2;
	
	return Math.sqrt( a*a + b*b )
}

// 🥾 Boot
function boot({ wipe, resolution }) {
	// Runs once at the start.
	// resolution(300)
	wipe(0);
  console.log(points)
}

// 🎨 Paint
function paint({ ink, wipe }) {
	wipe(0)
	ink("lime").circle(fruit.x, fruit.y, 5, true)

	points.forEach((point, index, arr) => {
		ink(255, (255 / points.length) * index, 0, (255 / points.length) * index + 127).circle(point.x, point.y, 5, true)
	});

	for (let i = 0; i < points.length; i++) {
		if (points[i + 1] != undefined) {
			ink(255, (127 / points.length) * i).line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
		}
	}
	
}

// 🎪 Act
function act({ event }) {
 // Respond to user input here.
	points[points.length - 1].x = event.x;
	points[points.length - 1].y = event.y;
	if(getDistance(event.x, event.y, fruit.x, fruit.y) <= 5) {
		points.unshift(new Vector(points[0].x + ((Math.random() * 50) - 25), points[0].y + ((Math.random() * 50) -25)))
		fruit.x = 25 + Math.random() * 250
		fruit.y = 25 + Math.random() * 250
	}
}

// 🧮 Sim
function sim() {
 // Runs once per logic frame. (120fps locked.)
	for (let i = 0; i < points.length; i++) {
		if (points[i + 1] != undefined) {
			let distance = getDistance(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)

			if (distance >= 5) {
				let direction = Math.atan2(points[i + 1].y - points[i].y, points[i + 1].x - points[i].x)

				let angle = new Vector(Math.cos(direction), Math.sin(direction))

				points[i].add(angle)
			}

			console.log(points.some((point) => {
				if (getDistance(points[i].x, points[i], point.x, point.y) < 3) {
					return true;
				} else {
					return false;
				}
			}))
		}
	}
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
    title: "Trail",
    desc: "A piece called `trail`.",
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

export { boot, paint, sim, act, meta };

// 📚 Library
//   (Useful functions used throughout the piece)
