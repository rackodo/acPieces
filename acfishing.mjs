// acfishing, 2024.12.04.08.02.53.527
// A acfishing piece.

/* 📝 Notes
 */

let server;
const all = {};

function boot({ wipe, net: { socket }, handle }) {
	wipe(0);
	server = socket((id, type, content) => {
		if (type === "left") {
			console.log("Leaving: ", id);
			delete all[id]
		}
		if (type === "joined") {
			console.log("Hello: ", id);
		}
		if (type.startsWith("connected")) {
			console.log("Your ID is: ", id);
			all[id] = { handle: handle() || "players" };
			server.send("acfishing:join", { ...all[id] });
		}
	})
}

function paint({ api, wipe, ink, line, screen, box, circle, pen, write }) {
  // console.log(api); // Log the API or enter `docs` (WIP) in `prompt`.

  wipe("gray"); // Clear the background.

  ink("yellow"); // Paint a diagonal yellow line.
  line(0, 0, screen.width, screen.height);

  let x = 16,
    y = 32; // Paint RGB boxes.
  ink("red").box(x, y, 32, 32);
//   ink(0x00ff00).box(x, y + 32, 32, 32);
  ink(0, 0, 255, 128).box(x, y + 64, 32, 32);

  if (pen) {
    ink().circle(pen.x, pen.y, 6); // Paint a cursor with text underneath.
    ink("white").write("Hello AC!", { x: pen.x, y: pen.y + 12, center: "x" });
  }
}

// 📚 Library

// function boot() {
// Runs once at the start.
// }

// function act({ event: e }) {
//  // Respond to user input here.
// }

// function sim() {
//  // Runs once per logic frame. (120fps locked.)
// }

// function beat() {
//   // Runs once per system metronome (BPM) tick.
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
