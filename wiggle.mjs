import clock from 'https://aesthetic.computer/media/@bash/piece/clock.mjs'

let cl = new clock()

// 🥾 Boot
function boot({ wipe, resolution, ink }) {
	// Runs once at the start.
	console.clear()
	resolution(300)
	wipe(0);
	console.log(cl)
}

let x = 0
let y = 0

// 🎨 Paint
function paint({ ink, wipe, screen }) {
	for (let i = 0; i < screen.pixels.length; i++) {
		screen.pixels[i] = screen.pixels[i] - 10;
	}
	ink(255).circle(
		x, 
		y, 
		2, 
		true)
	// console.log(screen.pixels)
}

// 🎪 Act
// function act({ event }) {
//  // Respond to user input here.
// }

// 🧮 Sim
function sim() {
	// Runs once per logic frame. (120fps locked.)
	cl.tick()
	x = 150 + Math.cos(cl.time / (1 * 10)) * 10
	y = 150 + Math.sin(cl.time / (1 * 10)) * 10
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
    title: "Wiggle",
    desc: "A piece called `wiggle`.",
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
