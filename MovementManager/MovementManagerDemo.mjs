class MovementManager {
	/*
	Please keep my credit here to support me! Thanks - Bash.
	=================================================================
	This MovementManager was developed by https://github.com/rackodo. 
	Copyright Bash Elliott 2023 (c)
	*/
	
	constructor() {
		this.direction = {
			x: 0,
			y: 0
		}
		this.up = false;
		this.down = false;
		this.left = false;
		this.right = false;
	}	

	handleKeys ( event ) {
		if (event.is("keyboard:down") && !event.repeat) {
			switch (event.key) {
				case "w": this.up = true; break;
				case "s": this.down = true; break;
				case "a": this.left = true; break;
				case "d": this.right = true; break;

				case "ArrowUp": this.up = true; break;
				case "ArrowDown": this.down = true; break;
				case "ArrowLeft": this.left = true; break;
				case "ArrowRight": this.right = true; break;
			}
		}
	
		if (event.is("keyboard:up")) {
			switch (event.key) {
				case "w": this.up = false; break;
				case "s": this.down = false; break;
				case "a": this.left = false; break;
				case "d": this.right = false; break;

				case "ArrowUp": this.up = false; break;
				case "ArrowDown": this.down = false; break;
				case "ArrowLeft": this.left = false; break;
				case "ArrowRight": this.right = false; break;
			}
		}
	}

	manageMovement() {
		if (this.up) {
			this.direction.y = -1;
		}
		if (this.down) {
			this.direction.y = 1
		}
		if (this.up && this.down || !this.up && !this.down) {
			this.direction.y = 0;
		}
	
		if (this.left) {
			this.direction.x = -1;
		}
		if (this.right) {
			this.direction.x = 1
		}
		if (this.left && this.right || !this.left && !this.right) {
			this.direction.x = 0;
		}
	}
}

let dir = new MovementManager();
const playerPos = {
	x: 0,
	y: 0
}
let speed = 0.8;

// 🥾 Boot
function boot({ wipe, screen }) {
	wipe(0);
	playerPos.x = screen.width / 2;
	playerPos.y = screen.height / 2;
}

// 🎨 Paint
function paint({ ink, wipe }) {
	wipe(0)
	ink(66, 135, 245).circle(playerPos.x, playerPos.y, 8, "fill:")
}

// 🎪 Act
function act({ event }) {
	// Respond to user input here.
	dir.handleKeys(event)
}

// 🧮 Sim
function sim() {
	// Runs once per logic frame. (120fps locked.)
	dir.manageMovement()
	playerPos.x += dir.direction.x * speed;
	playerPos.y += dir.direction.y * speed;
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
    title: "MovementManagerDemo",
    desc: "A piece called `MovementManagerDemo`.",
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

export { boot, paint, act, sim, meta };

// 📚 Library
//   (Useful functions used throughout the piece)
