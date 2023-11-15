import Vector from 'https://assets.rackodo.dev/aesthetic-computer/vector.mjs'

let points = []

for (let i = 0; i < 100; i++) {
	points.push(new Vector(Math.random() * 300, Math.random() * 300))
}


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
	points.forEach((point, index, arr) => {
		ink(255, (255 / points.length) * index, 0, (255 / points.length) * index + 127).circle(point.x, point.y, (20 / points.length) * index, true)
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
}

// 🧮 Sim
function sim() {
 // Runs once per logic frame. (120fps locked.)
	for (let i = 0; i < points.length; i++) {
		if (points[i + 1] != undefined) {
			let distance = getDistance(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)

			if (distance >= 3) {
				let direction = Math.atan2(points[i + 1].y - points[i].y, points[i + 1].x - points[i].x)

				let angle = new Vector(Math.cos(direction), Math.sin(direction))

				points[i].add(angle)
			}
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
