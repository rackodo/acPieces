// Blank, 2024.10.23.10.46.29.982
// A blank piece.


class Vector3 {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

class Camera {
	constructor(x, y, z, pitch, yaw) {
		this.pos = new Vector3(x, y, z)

		this.pitch = pitch
		this.yaw = yaw
	}
}

let points = [
	new Vector3( 0,  0,  1),
	new Vector3( 0,  1, -1),
	new Vector3( 1, -1, -1),
	new Vector3(-1, -1, -1)
]

let cam = new Camera(-3, 0, 0, 0, 0)
console.log(cam)

/* 📝 Notes 
*/

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