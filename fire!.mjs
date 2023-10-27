let keyleft = false;
let keyright = false;

class Player {
	constructor() {
		this.radius = 20;
		this.direction = 0;
	}
}

// 🥾 Boot
function boot({ wipe, resolution }) {
  // Runs once at the start.
  resolution(300)
  wipe(0);
}

// 🎨 Paint
function paint({ ink, screen, wipe }) {
	wipe(0)
	ink(255).box(1, 1, screen.width - 2, screen.height - 2, "outline")
	console.log(keyleft, keyright)
}

// 🎪 Act
function act({ event }) {
	// Respond to user input here.
	if (event.is("keyboard:down") && !event.repeat) {
		if (event.key == "ArrowLeft") {
			keyleft = true;
		}
		if (event.key == "ArrowRight") {
			keyright = true;
		}
	}
	if (event.is("keyboard:up")) {
		if (event.key == "ArrowLeft") {
			keyleft = false;
		}
		if (event.key == "ArrowRight") {
			keyright = false;
		}
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
    title: "Fire!",
    desc: "A piece called `fire!`.",
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

export { boot, paint, act, meta };

// 📚 Library
//   (Useful functions used throughout the piece)
