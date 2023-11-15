import Vector from 'https://assets.rackodo.dev/aesthetic-computer/vector.mjs'
import clock from 'https://assets.rackodo.dev/aesthetic-computer/clock.mjs'

let points = []

let cl = new clock()

for (let i = 0; i < 50; i++) {
	points.push(new Vector(Math.random() * 300, Math.random() * 300))
}


const getDistance = (x1, y1, x2, y2) => {
	let a = x1 - x2;
	let b = y1 - y2;
	
	return Math.sqrt( a*a + b*b )
}

// 🥾 Boot
function boot({ wipe, resolution, ink }) {
	// Runs once at the start.
	console.clear()
	resolution(100)
	wipe(0);
}

function source( x, y, imageWidth )
{
    var pos = ( ( y * imageWidth ) + x ) * 4;
	var val =
    {
        r : pos,
        g : pos + 1,
        b : pos + 2,
        a : pos + 3
    };

    return val;
}

function average(array = [1, 2, 3]) {
	return (array.reduce((partialSum, a) => partialSum + a, 0)) / array.length;
}

function setPixel(imageArray, x, y, imageWidth, r, g, b, a) {
	// console.log(imageArray)
	var pixel = source(x, y, imageWidth);

	imageArray[pixel.r] = r;
	imageArray[pixel.g] = g;
	imageArray[pixel.b] = b;
	imageArray[pixel.a] = a;
}

function blur(imageArray, x, y, imageWidth) {
	var sourcePixel = source(x, y, imageWidth)
	
	var neighbours = []

	neighbours.push(source(x - 1, y - 1, imageWidth))
	neighbours.push(source(x, y - 1, imageWidth))
	neighbours.push(source(x + 1, y - 1, imageWidth))
	neighbours.push(source(x + 1, y, imageWidth))
	neighbours.push(source(x + 1, y + 1, imageWidth))
	neighbours.push(source(x, y + 1, imageWidth))
	neighbours.push(source(x - 1, y + 1, imageWidth))
	neighbours.push(source(x - 1, y, imageWidth))

	imageArray[sourcePixel.r] = average(neighbours.r);
	imageArray[sourcePixel.g] = average(neighbours.g);
	imageArray[sourcePixel.b] = average(neighbours.b);
	imageArray[sourcePixel.a] = average(neighbours.a);
}

// 🎨 Paint
function paint({ screen, ink }) {
	// wipe(0)	

	for (let y = 0; y < screen.height; y++) {
		for (let x = 0; x < screen.width; x++) {
			setPixel(screen.pixels, x, y, screen.width, (200 / screen.width) * x, (200 / screen.height) * y, 0, 255)
		}
	}

	ink(255)
	.write("0,0", {x: 0, y: 0})
	.write("1,0", {x: screen.width - 17, y: 0})
	.write("1,1", {x: screen.width - 16, y: screen.height - 10})
	.write("0,1", {x: 0, y: screen.height - 10})

	// points.forEach((point, index, arr) => {
	// 	ink(0, (255 / points.length) * index, (255 / points.length) * index).circle(point.x, point.y, (5 / points.length) * index, true)
	// });

	// for (let i = 0; i < points.length; i++) {
	// 	if (points[i + 1] != undefined) {
	// 		ink(255, 127).line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
	// 	}
	// }
}

// 🎪 Act
function act({ event }) {
 // Respond to user input here.
	points[points.length - 1].x = event.x;
	points[points.length - 1].y = event.y;
}

// 🧮 Sim
function sim() {
	cl.tick()
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
    title: "UV",
    desc: "A piece called `uv`.",
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
export const nohud = true;

// 📚 Library
//   (Useful functions used throughout the piece)
