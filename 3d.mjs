// Blank, 2024.10.21.21.23.04.488
// A blank piece.

let res = 300;

let iterations = 3;

let points = [];

let camx = 0;
let camy = 0;
let camz = -(iterations);
let camYaw = 0;
let camPitch = 0;
let camRoll = 0;
let perspective = 100;
let w = res/2;
let h = res/2;


// Camera rotations
const rotate = (a, b, angle) => [
	Math.cos(angle) * a - Math.sin(angle) * b,
	Math.sin(angle) * a + Math.cos(angle) * b
];

function calculate() {
	points = [];
	for(let i=0;i<iterations;i+=1){
		for(let j=0;j<iterations;j+=1){
			for(let k=0;k<iterations;k+=1){
		
				let x = (i - (iterations - (iterations / 2 + .5)))*.8;
				let y = (j - (iterations - (iterations / 2 + .5)))*.8;
				let z = (k - (iterations - (iterations / 2 + .5)))*.8;
				
				[x,z] = rotate(x,z,camYaw);
				[y,z] = rotate(y,z,camPitch);
				[x,y] = rotate(x,y,camRoll);
		
				x -= camx;
				y -= camy;
				z -= camz;
				points.push({x, y, z, i, j, k})
			}
		}
	}
	points.sort((a, b) => b.z - a.z);
}

function paint({ wipe, ink, line, screen }) {
	wipe("gray");
	calculate()
	for(let i in points) {
		let x = points[i].x;
		let y = points[i].y;
		let z = points[i].z;
		let realSize = 0.2;
		let size = realSize / z * perspective;
		if(z > 0){
			let X = w + x / z * perspective;
			let Y = h + y / z * perspective;
			ink((255 / (iterations - 1)) * (points[i].i),(255 / (iterations - 1)) * (points[i].j), (255 / (iterations - 1)) * (points[i].k)).circle(X, Y, size, "solid")
		}
	}

	ink("white").
	write("Points: " + points.length, 6, 250).
	write("Size: " + iterations + "x" + iterations + "x" + iterations, 6, 262).
	write("Use arrow keys to rotate cube", 6, 274).
	write("Use 1 and 2 to change number of points", 6, 286)
}
// 📚 Library

function boot({ resolution }) {
	resolution(res)
}

function act({ event: e }) {
	if (e.is("keyboard:down")) {
		switch (e.key) {
			case "ArrowLeft": {camYaw += .1; return};
			case "ArrowRight": {camYaw -= .1; return};
			case "ArrowDown": {camPitch -= .1; return};
			case "ArrowUp": {camPitch += .1; return};
			case "1": {iterations -= 1; camz += 1; return};
			case "2": {iterations += 1; camz -= 1; return};
			case "i": {console.log(camx, camy, camz, camYaw, camPitch, perspective)}
		}
	}
}

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