//// Variable Setup
// Basics - Points, timer, keyboard bools
let points = 0;
let timer = 0;
let keyleft = false;
let keyright = false;

// Bullet config
let bulletIndex = 0;
let bullets = [];
let bulletSpeed = 1;

// Enemy config
let enemyIndex = 0;
let enemies = [];
let enemySpeed = 0.3;
let enemySpawnRate = 1.5;

// Boundary and threshold config
let boundary = 130;
let thresholdSize = 20;

//// Functions
// Function for getting distance between two points
const getDistance = (x1, y1, x2, y2) => {
	let a = x1 - x2;
	let b = y1 - y2;

	return Math.sqrt( a*a + b*b )
}

// Function for getting a random number in a range.
function randomNumBetween(min, max) {
	return min + Math.random() * (max - min);
}

// Function for converting polar coordinates (r, Θ) to cartesianal coordinates (x, y)
function polarToCartesian (offset, radius, angle) {
	return {
		x: offset + radius * Math.cos(angle),
		y: offset + radius * Math.sin(angle)
	}
}

//// Classes
// Player class
class Player {
	constructor() {
		//// Player variables
		// Variables for the player's constraints in movement and orientation.
		this.radius = thresholdSize + 10;
		this.angle = 0;
		this.direction = 0;
		this.vel = 0;
		
		/// Variables for the player's movements.
		// Base speed.
		this.baseSpeed = 0.01;
		// The rate of transition of speed.
		this.friction = 0.05;
		// The initial rotation speed.
		this.attack = 0.15;
		// The maximum speed of the player.
		this.maxSpeed = 3;

		// Variables for the physical appearance of the player.
		this.bodySize = 5;
		this.barrelSize = 5;

		// Init cartesian coordinates of the player.
		this.cartPos = {
			x: 150,
			y: 150
		}

		// Init cartesian coordinates of the base of the barrel.
		this.barrelStart = {
			x: 150,
			y: 150
		}
		
		// Init cartesian coordinates of the tip of the barrel.
		this.barrelEnd = {
			x: 150,
			y: 150
		}
	}

	// Draw the player.
	draw(ink) {
		ink(0, 255, 255).
		circle(this.cartPos.x, this.cartPos.y, this.bodySize, true).
		circle(this.barrelEnd.x, this.barrelEnd.y, 3).line(this.barrelStart.x, this.barrelStart.y, this.barrelEnd.x, this.barrelEnd.y)
	}

	// Player logic.
	update() {
		// Set positions based on polar coordinates.
		this.cartPos = polarToCartesian(150, this.radius, this.angle)
		this.barrelStart = polarToCartesian(150, this.radius + this.bodySize, this.angle)
		this.barrelEnd = polarToCartesian(150, this.radius + this.bodySize + this.barrelSize, this.angle)

		// Velocity update.
		this.vel += this.attack * this.direction;

		// Smooth transitions from 0 to max speed, and vice versa.
		if (this.vel >= 0) {
			this.vel -= this.friction;
		}
		if (this.vel <= 0) {
			this.vel += this.friction;
		}
		
		if (this.vel <= -this.maxSpeed) {
			this.vel = -this.maxSpeed;
		}
		if (this.vel >= this.maxSpeed) {
			this.vel = this.maxSpeed
		}

		// Update variable based on velocity and base speed.
		this.angle += this.vel * this.baseSpeed;
	}

	// Shooting function.
	shoot() {
		bullets.push(new Bullet(this.radius + this.bodySize + this.barrelSize, this.angle));
		bulletIndex += 1;
	}
}

// Bullet class
class Bullet {
	constructor(radius, angle, index) {
		//// Bullet variables
		// Variables for the bullet's constraints in movement and orientation. Plus bullet size.
		this.radius = radius;
		this.angle = angle;
		this.index = index;
		this.size = 3;


		// Init cartesian coordinates of the bullet.
		this.cartPos = {
			x: -100,
			y: -100
		}
	}

	// Draw the bullet.
	draw(ink) {
		ink(255).circle(this.cartPos.x, this.cartPos.y, this.size);
	}

	// Update bullet logic.
	update() {
		// Make the bullet shoot out.
		this.radius += bulletSpeed;
		// Update cartesian coords.
		this.cartPos = polarToCartesian(150, this.radius, this.angle);

		// If the bullet touches the boundary, get rid of it.
		if (this.radius >= boundary - this.size) {
			this.destroy()
		}
	}

	// Destroy bullet.
	destroy() {
		bullets.splice(bullets.findIndex((x) => x.bulletIndex === this.bulletIndex), 1)
	}
}

// Enemy class
class Enemy {
	constructor(index) {
		// Variables for the enemy's constraints in movement and orientation. Plus bullet size.
		this.radius = 125;
		this.angle = randomNumBetween(0, 314) / 10;
		this.index = index;
		this.isHit = false;

		// Init cartesian coordinates of the enemy.
		this.cartPos = {
			x: -100,
			y: -100
		}
	}

	// Draw the enemy.
	draw(ink) {
		ink(255, 0, 0).circle(this.cartPos.x, this.cartPos.y, 5);
	}

	// Update enemy logic.
	update() {
		// Make enemy approach the center.
		this.radius -= enemySpeed;
		// Update cartesian coords.
		this.cartPos = polarToCartesian(150, this.radius, this.angle);
	}

	// Destroy enemy.
	destroy() {
		enemies.splice(enemies.findIndex((x) => x.enemyIndex === this.enemyIndex), 1)
	}
}

// Init new player.
let player = new Player();

// 🥾 Boot
function boot({ wipe, resolution }) {
  // Runs once at the start.
  resolution(300)
  wipe(0);
}

// 🎨 Paint
function paint({ ink, screen, wipe }) {
	wipe(255, 255, 255, 0)

	// Draws background.
	ink(randomNumBetween(5, 15)).circle(150, 150, 150).circle(150, 150, 149).circle(150, 150, 148).circle(150, 150, 150, true)
	ink(255, 255, 255, 128).circle(150, 150, 130)

	// Draws boundary on which the player rotates about.
	ink(255).circle(150, 150, player.radius)

	// Draws the boundary.
	ink(255, 255, 0).circle(150, 150, thresholdSize)
	
	// Draws the player.
	player.draw(ink)
	
	// Draws bullets.
	bullets.forEach(function(item) {item.draw(ink)})

	// Draws enemies.
	enemies.forEach(function(item) {item.draw(ink)})

	// Draws the score.
	ink("white").write(points.toString(), {x: 152, y: 152, center: "xy", size: (points < 100 ? 2 : 1.5)})
}

// 🎪 Act
function act({ event }) {
	// Key controls
	if (event.is("keyboard:down") && !event.repeat) {
		if (event.key == "ArrowLeft" || event.key == "a") {
			keyleft = true;
		}
		if (event.key == "ArrowRight" || event.key == "d") {
			keyright = true;
		}
		if (event.key == " ") {
			player.shoot()
		}
	}
	if (event.is("keyboard:up")) {
		if (event.key == "ArrowLeft" || event.key == "a") {
			keyleft = false;
		}
		if (event.key == "ArrowRight" || event.key == "d") {
			keyright = false;
		}
	}
}

// 🧮 Sim
function sim() {
	// Updates player logic.
	player.update()
	// Updates bullets logic.
	bullets.forEach(function(item) {item.update()})
	// Updates enemies logic and manages the fail condition.
	enemies.forEach(function(item) {
		item.update();

		if (getDistance(item.cartPos.x, item.cartPos.y, 150, 150) <= thresholdSize + 5) {
			fail()
		}
	})

	// Handles player directions.
	if (keyleft && !keyright) {
		player.direction = -1;
	} else if (!keyleft && keyright) {
		player.direction = 1;
	} else if (keyleft && keyright) {
		player.direction = 0;
	} else if (!keyleft && !keyright) {
		player.direction = 0;
	}

	// Handles enemy spawns.
	timer += 1;
	if (timer >= enemySpawnRate * 120) {
		enemies.push(new Enemy(enemyIndex))
		enemyIndex += 1;
		timer = 0;
		enemySpawnRate -= 0.01
	}

	// Bullet-enemy collision detection.
	bullets.forEach(function(bullet) {
		enemies.forEach(function(enemy) {
			if (getDistance(bullet.cartPos.x, bullet.cartPos.y, enemy.cartPos.x, enemy.cartPos.y) <= 15) {
				enemy.destroy()
				bullet.destroy()
				points += 1;
			}
		})
	})
}

// 📰 Meta
function meta() {
  return {
    title: "Fire!",
    desc: "A piece called `fire!`.",
  };
}

// Resets the game.
function fail() {
	player = new Player();
	bulletIndex = 0;
	enemyIndex = 0;

	bullets = [];
	enemies = [];

	points = 0;
	enemySpawnRate = 1.5;
	timer = 0;
}

export { boot, paint, act, sim, meta };