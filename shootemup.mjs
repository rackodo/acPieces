// Bang!, 2024.8.04.16.25.04.438
// shootemup by bash

// Function for getting a random number in a range.
function randomNumBetween(min, max) {
	return min + Math.random() * (max - min);
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

function polarToCartesian (x, y, radius, angle) {
	return new Vector(x + radius * Math.cos(angle), y + radius * Math.sin(angle))
}

function findAngle(x1, y1, x2, y2) {
	return Math.atan2(y2 - y1, x2 - x1);
}

// Function for getting distance between two points
const getDistance = (x1, y1, x2, y2) => {
	let a = x1 - x2;
	let b = y1 - y2;

	return Math.sqrt( a*a + b*b )
}

let sPlayerRight = "@bash/2024.8.04.17.32.55.907"
let sPlayerLeft = "@bash/2024.8.04.17.40.13.286"

let sZombieRight = "@bash/2024.8.04.18.39.36.589"
let sZombieLeft = "@bash/2024.8.04.18.40.48.963"

let banger;
let zombieIndex = 0;
let zombies = [];

let score = 0;
let clock = 0;
let zombieTimer = 60;

let highScore = 0;

let scoreVisibility = 255;

function birthZombie() {
	let potentialSpawn;
	let goodSpawn = false;
	while (!goodSpawn) {
		potentialSpawn = new Vector(Math.random() * 128, Math.random() * 128)
		console.log(potentialSpawn, getDistance(potentialSpawn.x, potentialSpawn.y, banger.pos.x, banger.pos.y))
		if (getDistance(potentialSpawn.x, potentialSpawn.y, banger.pos.x, banger.pos.y) <= 40) { console.log("Bad spawn...") } else { goodSpawn = true }
	}
	zombies.push(new Zombie(potentialSpawn.x, potentialSpawn.y, zombieIndex))
	zombieIndex += 1;
}

class BangerBullet {
	constructor(x, y, angle, id) {
		this.pos = new Vector(x, y)
		this.angle = angle
		this.id = id
	}

	draw(ink) {
		ink("red").circle(this.pos.x, this.pos.y, 2)
	}

	tick() {
		this.pos = polarToCartesian(this.pos.x, this.pos.y, 1, this.angle)

		if (this.pos.x <= 1 | this.pos.x >= 127 | this.pos.y <= 1 | this.pos.y >= 127) { this.delete() }
	}

	delete() {
		banger.bullets.splice(banger.bullets.find((bullet) => {this.id == bullet.id}), 1)
	}
}

class Banger {
	constructor(x, y) {
		// Vector vars
		this.pos = new Vector(x, y)
		this.dir = new Vector(0, 0)
		this.target = new Vector(this.pos.x, this.pos.y)
		
		this.gunStartX = 0
		this.gunEnd = new Vector(0, 0)
		this.gunAngle = 0;

		this.bulletIndex = 0;
		this.bullets = [];

		// Input vars
		this.left = false;
		this.right = false;
		this.up = false;
		this.down = false;

		// Visuals
		this.facing = 1;
		this.sprite = sPlayerRight;
	}

	draw(ink) {
		ink().paste(this.sprite, this.pos.x - 4, this.pos.y - 4)
		// ink("red").line(this.facing == 1 ? (this.pos.x + 2, this.pos.y, this.pos.x + 10, this.pos.y) : (this.pos.x - 2, this.pos.y, this.pos.x - 10, this.pos.y))
		ink("red").line(this.gunStartX, this.pos.y, this.gunEnd.x, this.gunEnd.y)

		this.bullets.forEach((bullet) => {
			bullet.draw(ink)
		})
	}

	readInput(event) {
		if (event.is("keyboard:down")) {
			switch (event.key) {
				case "w" : {this.up = true; break;}
				case "s" : {this.down = true; break;}
				case "a" : {this.left = true; break;}
				case "d" : {this.right = true; break;}
			}
		}

		if (event.is("keyboard:up")) {
			switch (event.key) {
				case "w" : {this.up = false; break;}
				case "s" : {this.down = false; break;}
				case "a" : {this.left = false; break;}
				case "d" : {this.right = false; break;}
			}
		}

		if (event.is("move")) {
			this.target.x = event.x;
			this.target.y = event.y;
		}

		if (event.is("touch")) {
			this.bullets.push(new BangerBullet(this.gunEnd.x, this.gunEnd.y, this.gunAngle, this.bulletIndex))
			this.bulletIndex += 1;
		}
	}

	tick() {
		if (this.left && !this.right || this.left) {
			this.dir.x = -1;
		} else if (!this.left && this.right || this.right) {
			this.dir.x = 1;
		} else if (this.left && this.right) {
			this.dir.x = 0;
		} else if (!this.left && !this.right) {
			this.dir.x = 0;
		}

		if (this.up && !this.down || this.up) {
			this.dir.y = -1;
		} else if (!this.up && this.down || this.down) {
			this.dir.y = 1;
		} else if (this.up && this.down) {
			this.dir.y = 0;
		} else if (!this.up && !this.down) {
			this.dir.y = 0;
		}

		if (this.target.x < this.pos.x) { this.facing = 0 }
		else { this.facing = 1}

		this.pos.add(this.dir)

		if (this.pos.x <= 1) { this.pos.x = 126 }
		if (this.pos.x >= 127) { this.pos.x = 2 }
		if (this.pos.y <= 1) { this.pos.y = 126 }
		if (this.pos.y >= 127) { this.pos.y = 2 }
		
		this.gunAngle = findAngle(this.gunStartX, this.pos.y, this.target.x, this.target.y)
		this.gunStartX = this.pos.x + (this.facing == 1 ? 2.5 : -2.5)
		this.gunEnd = polarToCartesian(this.gunStartX, this.pos.y, 10, this.gunAngle)

		this.sprite = (this.facing == 1 ? sPlayerRight : sPlayerLeft)

		this.bullets.forEach((bullet) => {
			bullet.tick()
		})
	}
}

class Zombie {
	constructor(x, y, id) {
		this.pos = new Vector(x, y);
		this.id = id;

		this.facing = 1;
		this.sprite = sZombieRight;
	}

	draw(ink) {
		ink().paste(this.sprite, this.pos.x, this.pos.y)
	}

	tick(target) {
		this.pos = polarToCartesian(this.pos.x, this.pos.y, 0.5, findAngle(this.pos.x, this.pos.y, target.x, target.y))
		if (target.x <= this.pos.x) { this.facing = 0 }
		else { this.facing = 1 }
		this.sprite = (this.facing == 1 ? sZombieRight : sZombieLeft)
	}

	delete() {
		zombies.splice(zombies.find((zombie) => {this.id == zombie.id}), 1)
	}
}

function boot({resolution, api}) {
	console.log(api.notice)
	resolution(128)

	banger = new Banger(64, 64);
	fail()
	// Runs once at the start.
}

function paint({ wipe, ink, screen }) {
	wipe("black");
	
	ink(255, 255 - (score * 1.9), 255 - (score * 1.9)).box(2, 2, screen.width - 4, screen.height - 4, "outline")
	.write(score.toString(), {x: 64, y: 64, center: "xy"})

	ink("yellow", scoreVisibility).write("High score: " + highScore, {x: 3, y: 117})

	zombies.forEach((zombie) => {
		zombie.draw(ink)
	})
	banger.draw(ink)
}

function act({ event: e }) {
	banger.readInput(e)
}

function sim({ ink }) {
	// Runs once per logic frame. (120fps locked.)
	zombies.forEach((zombie) => {
		zombie.tick(banger.pos)

		if (getDistance(zombie.pos.x, zombie.pos.y, banger.pos.x, banger.pos.y) <= 8) {
			fail()
		}
	})

	banger.bullets.forEach(bullet => {
		let closestZombie = null;
		let minDistance = 8;

		zombies.forEach(zombie => {
			const distance = getDistance(bullet.pos.x, bullet.pos.y, zombie.pos.x, zombie.pos.y);
			if (distance < minDistance) {
				minDistance = distance
				closestZombie = zombie;
			}
		})

		if (closestZombie) {
			score++;
			zombies = zombies.filter(z => z !== closestZombie)
			banger.bullets = banger.bullets.filter(b => b !== bullet)
		}
	})

	banger.tick()

	clock++;
	if (clock >= zombieTimer) {
		birthZombie()
		clock = 0;
	}

	if (scoreVisibility >= 0) {
		scoreVisibility -= 2.125
	}
}

function fail() {
	scoreVisibility = 255;
	if (score > highScore) {
		highScore = score
	}
	score = 0;
	zombies = []
	banger.bullets = []
	banger.pos = new Vector(64, 64)
}

function meta() {
	return {
		title: "bang!",
		desc: "shootemup by bash"
	}
}

export { boot, paint, act, sim, meta };