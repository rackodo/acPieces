// @bash/Hub, 2023.11.30.16.05.21.050
// An open place to walk around.

/* #region 📚 README 
#endregion */

let w = 256;
let h =128;

let plant = "@bash/2024.8.02.22.07.33.826"
let carpet = "@bash/2024.8.02.22.12.58.078"

function dist(x1, y1, x2, y2) {
	var a = x1 - x2;
	var b = y1 - y2;

	return Math.sqrt( a*a + b*b );
}

const linePoint = (x1, y1, x2, y2, px, py) => {

	// get distance from the point to the two ends of the line
	let d1 = dist(px,py, x1,y1);
	let d2 = dist(px,py, x2,y2);
  
	// get the length of the line
	let lineLen = dist(x1,y1, x2,y2);
  
	// since floats are so minutely accurate, add
	// a little buffer zone that will give collision
	let buffer = 0.1;    // higher # = less accurate
  
	// if the two distances are equal to the line's 
	// length, the point is on the line!
	// note we use the buffer here to give a range, 
	// rather than one #
	if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
	  return true;
	}
	return false;
  }

// Vector code grabbed from https://www.youtube.com/watch?v=XD-7anXSOp0.
class Vector {
	constructor(x, y) {
		this.x = x,
		this.y = y
	}
	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}
	mult(scalar) {
		this.x += scalar;
		this.y += scalar;
	}
	sub(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}
	copy() {
		return new Vector(this.x, this.y);
	}
	static random(minX, minY, maxX, maxY) {
		return new Vector(
			randomNumBetween(minX, maxX),
			randomNumBetween(minY, maxY)
		);
	}
}

class Door {
	constructor(startX, startY, endX, endY, destination, color) {
		this.startPos = new Vector(startX, startY)
		this.endPos = new Vector(endX, endY)
		this.destination = (destination ? destination : "prompt");
		this.color = (color ? color : "");

		this.dx = 0;
		this.dy = 0;
		this.len = 0;
		this.dot = 0;
		
		this.closestX = this.startPos.x;
		this.closestY = this.startPos.y;

		this.contact = false;
	}
	draw(ink) {
		ink(this.color).line(this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y)
	}
	check(world, playerX, playerY) {
		let inside1 = dist(this.startPos.x, this.startPos.y, playerX, playerY);
		let inside2 = dist(this.endPos.x, this.endPos.y, playerX, playerY);
		if (inside1 <= 1 || inside2 <= 1) { this.tele(world) } else {
		let oldClosestX, oldClosestY, newClosestX, newClosestY;
		// Get closest point along line

		oldClosestX = this.closestX;
		oldClosestY = this.closestY;

		this.dx = this.startPos.x - this.endPos.x;
		this.dy = this.startPos.y - this.endPos.y;
		this.len = Math.sqrt( (this.dx*this.dx) + (this.dy*this.dy) );

		this.dot = ( ((playerX-this.startPos.x)*(this.endPos.x-this.startPos.x)) + ((playerY-this.startPos.y)*(this.endPos.y-this.startPos.y)) ) / Math.pow(this.len,2);

		newClosestX = this.startPos.x + (this.dot * (this.endPos.x-this.startPos.x));
		newClosestY = this.startPos.y + (this.dot * (this.endPos.y-this.startPos.y));

		// Logic
		if (linePoint(this.startPos.x, this.startPos.y, this.endPos.x, this.endPos.y, newClosestX, newClosestY)) {
			this.closestX = newClosestX;
			this.closestY = newClosestY;

			let distX = this.closestX - playerX;
			let distY = this.closestY - playerY;
			let dist = Math.sqrt((distX*distX) + (distY*distY));
			if (dist <= 1) {
				this.contact = true;
				this.tele(world)
				return true;
			}
			else {
				this.contact = false;
				return false;
			}
		} else {
			this.closestX = oldClosestX;
			this.closestY = oldClosestY;
			return false;
		}
	}}

	tele(world) {
		world.teleport(this.destination)
	}
}

let doors = [];

// 🥾 Boot
async function boot({system: {world}}) { 
	doors.push(
		new Door(32, 0, 96, 0, "@bash/bird"),
		new Door(32, h - 1, 96, h - 1, "@bash/fire!"),
		new Door(160, 0, 224, 0, "chat"),
		new Door(160, h - 1, 224, h - 1, "@bash/shootemup", "yellow"),
		new Door(0, 32, 0, 96, "prompt"),
		new Door(w - 1, 32, w - 1, 96, "profile @bash")
	)

	world.me.pos.x = w / 2;
	world.me.pos.y = h / 2;
}

// 🏔️ Background
function background({ wipe }) {
  wipe("grey");
}

// 🎨 Paint
function paint($) {
	
	const { ink, api, savepan, loadpan, pan, unpan, net, hud } = $;

	hud.label("@bash's hub", "cyan")

	ink("black").box(-2, -2, w + 4, h + 4)
	ink(112, 79, 46).box(0, 0, w, h);
	
	ink(200, 0, 0).box(0, 40, w, 48);
	ink(232, 183, 21).line(0, 45, w - 1, 45)
	.line(0, 83, w - 1, 83)
	.write("@bash/hub", {x: w / 2, y: 66, center: "xy", size: 2 })
	
	doors.forEach((door) => {
		door.draw(ink);
	})

	ink("black").write("@bash/bird", { x: 64, y: -12, center: "x" })
	.write("@bash/fire!", { x: 64, y: h + 4, center: "x" })
	.write("chat", { x: 192, y: -12, center: "x" })
	.write("@bash/shootemup", { x: 192, y: 132, center: "x" })
	.write("prompt", {x: -39, y: 64, center: "y"})
	.write("profile", {x: w + 4, y: 64, center: "y"})

	ink("yellow").write("*NEW* (Desktop only)", {x: 192, y: 112, center: "x"})

	ink().stamp(plant, 128, -8)
	ink().stamp(plant, 16, 112)
	ink().stamp(carpet, 16, 64)
  
}

// 🎪 Act
function act() {}

// 🧮 Sim
function sim({ system: { world } }) {
	doors.forEach((door) => {
		door.check(world, world.me.pos.x, world.me.pos.y)
		// console.log(world.me.pos, door.startX, door.startY, door.endX, door.endY)
	})
	
// 	if (
//     world.me &&
//     world.size &&
//     world.me.moved &&
//     world.me.pos.x === world.size.width
//   )
//     world.teleport("@bash/bird", { x: 0, y: 0 });
}

// 🥁 Beat
// function beat() {
//   // Runs once per metronomic BPM.
// }

// 👋 Leave
function leave() {}

// 📰 Meta
function meta() {
  return {
    title: "@bash/hub",
    desc: "Look at all of bash's shit and other things",
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

export const world = { width: w, height: h };
export const system = "world";
export { boot, background, paint, act, sim, leave, meta };

// 📚 Library
//   (Useful functions used throughout the piece)
