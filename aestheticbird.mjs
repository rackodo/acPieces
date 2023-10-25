// 🥾 Boot
function boot({ wipe, resolution }) {
	// Runs once at the start.
	resolution(200, 400)
	wipe(255);
}

// 🎨 Paint
function paint({ ink, screen }) {
	ink(255).box(1, 1, screen.width - 2, screen.height - 2, "outline")
}

// 🎪 Act
// function act({ event }) {
//  // Respond to user input here.
// }

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
	title: "Aestheticbird",
	desc: "A piece called `aestheticbird`.",
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

export { boot, paint, meta };

// 📚 Library
//   (Useful functions used throughout the piece)
