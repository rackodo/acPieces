let res = 100;
let time = 0;
let mag = 15;
let freq = 15;

let bars = true;

function arccot(x) { return Math.PI / 2 - Math.atan(x)}

// 🥾 Boot
function boot({ wipe, resolution }) {
  // Runs once at the start.
	resolution(res)
	wipe(0);
}

// 🎨 Paint
function paint({ ink, wipe }) {
	wipe(0)
	if (!bars) {
		sineWave( ink, freq, mag, 0.5 )
		squareWave( ink, freq, mag, 0.5 )
		triangleWave( ink, freq, mag + 5, 0.5 )
		sawtoothWave( ink, freq, mag + 10, 0.5 )
	} else {
		ink(255).line(0, 50, 100, 50)
		ink(255, 128, 0)
		.line(20, 20, 20, 80)
		.circle(20, 50 + (sine(time, res / freq, 20) * 30) + 0.5, 3)
		ink(0, 255, 128)
		.line(40, 20, 40, 80)
		.circle(40, 50 + (square(time, res / freq, 20) * 30), 3)
		ink(255, 0, 128)
		.line(60, 20, 60, 80)
		.circle(60, 50 + (triangle(time - 0.5, res / freq, 20) * 20), 3)
		ink(255, 196, 128)
		.line(80, 20, 80, 80)
		.circle(80, 50 + (sawtooth(time, res / freq, 20) * 20), 3)
	}
	time += 0.01;
}

function sineWave( ink, freq, mag, mult ) {
	for (let i = 0; i < res; i++) {
		ink(255, (255 / res) * i, 0).circle(i, ((res / 4 * 0.5) + (Math.sin(i / (res / freq) + time / mult) * (res / mag))), 0.5)
	}
}

function sine( index, freq, mag ) {
	return(Math.sin(index / freq * mag))
}

function squareWave( ink, freq, mag, mult ) {
	for (let i = 0; i < res; i++) {
		ink(0, 255, (255 / res) * i).circle(i, (res / 4 * 1.5) + Math.sign(Math.sin(i / (res / freq) + time / mult)) * (res / mag), 0.5)
	}
}

function square( index, freq, mag ) {
	return(Math.sign(Math.sin(index / freq * mag)))
}

function triangleWave( ink, freq, mag, mult ) {
	for (let i = 0; i < res * 2; i++) {
		ink(255, 0, (255 / res) * i, 255).circle(i, (res / 4 * 2.5) + ((res / mag) * Math.asin(Math.cos(i / (res / freq) + time / mult + Math.PI / -2))), 0.5)
	}
}

function triangle( index, freq, mag ) {
	return(Math.asin(Math.cos((index / freq) * mag)))
}

function sawtoothWave( ink, freq, mag, mult ) {
	for (let i = 0; i < res; i++) {
		ink((255 / res) * i + 128, (255 / res) * i, (255 / res) * i - 64).circle(i, ((res / 4 * 3.5) + (-arccot	(Math.tan(i / (res / freq) + time / mult))) * (res / mag)), 0.5)
	}
}

function sawtooth( index, freq, mag ) {
	let arccot = (x) => {
		return Math.PI / 2 - Math.atan(x)
	}

	return(-arccot(Math.tan(index / freq * mag)) + 1.5)
}

// 🎪 Act
function act({ event }) {
	// Respond to user input here.
	if (event.is("keyboard:down") | event.is("touch")) {
		bars = !bars;
	}
}

// 🧮 Sim
// function sim() {
//  // Runs once per logic frame. (120fps locked.)
// }

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
    title: "Sine",
    desc: "A piece called `sine`.",
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

export { boot, paint, meta, act };

// 📚 Library
//   (Useful functions used throughout the piece)
