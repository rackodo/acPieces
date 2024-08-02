// Blank, 2024.8.01.13.03.18.886
// A blank piece.

/* 📝 Notes 
*/

function boot({ api }) {
	console.log(api.stamp)
}

function paint({ wipe, ink, line, screen }) {
  wipe("gray");
  ink("yellow");
  line(0, 0, screen.width, screen.height);
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