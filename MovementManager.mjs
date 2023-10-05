/* 
HOW TO USE THE MOVEMENT MANAGER:
================================
0. Copy the MovementManager class and paste it into your piece at the top of your code.
1. Create a new MovementManager.
2. Insert the MovementManager's handleKeys() method into act() and pass `event`.
3. Insert the MovementManager's manageMovement() method into sim().
4. You can now refer to WASD or Arrow Key movement by calling MovementManager's `direction` variable.
*/

// 0
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

// 1
let wasd = new MovementManager();

function paint() {
	// 4
	console.log(wasd.direction)
}

// 🎪 Act
function act({ event }) {
	// 2
	wasd.handleKeys( event )
}

// 🧮 Sim
function sim() {
	// 3
	wasd.manageMovement()
}

// 📰 Meta
function meta() {
  return {
    title: "directions",
	author: "bash"
  };
}

export { paint, act, meta, sim };

// 📚 Library
//   (Useful functions used throughout the piece)

