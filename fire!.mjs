//// Variable Setup
// Basics - Points, timer, keyboard bools
let points = 0;
let timer = 0;
let left = false;
let right = false;

let highScore = 0;

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

let whirClock = 0;

let titleScreenVisible = true;
let titleScreenOpacity = 255;

let titleScreenFadeTriggered = false;
let titleScreenFadeTime = 0.5;
let titleScreenFadeTimer = 0;

//// Functions
String.prototype.toRGB = function() {
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    var rgb = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255;
        rgb[i] = value;
    }
    return [rgb[0], rgb[1], rgb[2]];
}

let playerColour;

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
function polarToCartesian (offset = {x: 0, y: 0}, radius, angle) {
	return {
		x: offset.x + radius * Math.cos(angle),
		y: offset.y + radius * Math.sin(angle)
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
		ink(playerColour).
		circle(this.cartPos.x, this.cartPos.y, this.bodySize, true).
		circle(this.barrelEnd.x, this.barrelEnd.y, 3).line(this.barrelStart.x, this.barrelStart.y, this.barrelEnd.x, this.barrelEnd.y)
	}

	// Player logic.
	update() {
		// Set positions based on polar coordinates.
		this.cartPos = polarToCartesian({x: 150, y: 150}, this.radius, this.angle)
		this.barrelStart = polarToCartesian({x: 150, y: 150}, this.radius + this.bodySize, this.angle)
		this.barrelEnd = polarToCartesian({x: 150, y: 150}, this.radius + this.bodySize + this.barrelSize, this.angle)

		// Velocity update.
		this.vel += this.attack * this.direction;

		// Smooth transitions from 0 to max speed, and vice versa.
		if (this.vel >= -0.01) {
			this.vel -= this.friction;
		}
		if (this.vel <= -0.01) {
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
		this.cartPos = polarToCartesian({x: 150, y: 150}, this.radius, this.angle);

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
		this.cartPos = polarToCartesian({x: 150, y: 150}, this.radius, this.angle);
	}

	// Destroy enemy.
	destroy() {
		enemies.splice(enemies.findIndex((x) => x.enemyIndex === this.enemyIndex), 1)
	}
}

class ParticleSystem {
	constructor(
		lifetime, 
		fadeDuration,
		origin,
		particleCount, 
		range, 
		delay, 
		minSpeed,
		maxSpeed,
		scale) {

		this.lifetime = lifetime;
		this.fadeDuration = fadeDuration;
		this.origin = origin;
		this.particleIndex = 0;

		this.particleCount = particleCount;
		this.range = range;
		this.delay = delay;

		this.minSpeed = minSpeed;
		this.maxSpeed = maxSpeed;
		this.scale = scale;

		this.triggered = false;

		this.particles = []
	};

	trigger() {
		this.particles = Array.from({ length: this.particleCount}, (value, index) => new Particle(
			this.lifetime + (index * this.delay), 
			this.fadeDuration, 
			{x: this.origin.x + randomNumBetween(-this.range, this.range), y: this.origin.y + randomNumBetween(-this.range, this.range)},
			index, 
			randomNumBetween(this.minSpeed, this.maxSpeed),
			this.scale))
		this.triggered = true;
	}

	sim() {
		this.particles.forEach((item) => {
			item.update()
			if (item.dead) {
				return this.particles.splice(this.particles.findIndex((x) => x.index === item.index), 1)
			}
		})
	}
}

class Particle {
	constructor(
		lifetime, 
		fadeDuration, 
		origin = {x: 0, y: 0}, 
		index,
		speed,
		size) {
		this.decay = 0;

		this.lifetime = lifetime * 120;
		this.fadeDuration = fadeDuration * 120;
		
		this.opacity = 255;
		this.dead = false;
		this.index = index;

		this.partColour = [randomNumBetween(playerColour[0] - 50, playerColour[0] + 50), randomNumBetween(playerColour[1] - 50, playerColour[1] + 50), randomNumBetween(playerColour[2] - 50, playerColour[2] + 50)]
		
		this.origin = origin;
		
		this.scale = randomNumBetween(1, size)
		
		this.angle = randomNumBetween(0, 628) / 100
		this.radius = 0;
		this.speed = speed;

		this.cartPos = {
			x: -100,
			y: -100
		}

	}
	
	async draw(ink) {
		ink(this.partColour[0], this.partColour[1], this.partColour[2], this.opacity).circle(this.cartPos.x, this.cartPos.y, this.scale, true)
	}
	
	async update() {
		this.decay += 1;

		this.radius += this.speed;

		this.cartPos = polarToCartesian({x: this.origin.x, y: this.origin.y}, this.radius, this.angle);

		if (this.decay >= this.lifetime) {
			this.opacity -= (255 / this.fadeDuration)
			if (this.opacity <= 0) {
				this.dead = true;
			}
		}
	}
}

// Init new player.
let player = new Player();

let explosion = new ParticleSystem(0.25, 0.75, {x: 150, y: 150}, 100, 10, 0.001, 0.05, 0.3, 3)

// 🥾 Boot
function boot({ wipe, resolution, handle }) {
  // Runs once at the start.
  if (handle()) {
	let hndl = Array.from(handle())
	hndl.splice(0, 1)
	hndl = hndl.join("")
	console.log(hndl)
	playerColour = hndl.toRGB()
  }
  else {
	playerColour = [0, 255, 255]
  }
  resolution(300)
  wipe(0);
  player.vel = 0;
}

// 🎨 Paint
function paint({ ink, wipe }) {
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

	explosion.particles.forEach(function(item) {item.draw(ink)})

	if (titleScreenVisible) {
		drawTitleScreen(ink)
	}
}

// 🎪 Act
function act({ event, sound: { synth} }) {
	const shoot = () => {
		synth({
		  type: "sine",
		  tone: 300,
		  attack: 0,
		  decay: 1,
		  volume: 0.5,
		  duration: 0.2,
		});
	}
	// Key controls
	if (event.is("keyboard:down") && !event.repeat) {
		if (event.key == "ArrowLeft" || event.key == "a") {
			left = true;
		}
		if (event.key == "ArrowRight" || event.key == "d") {
			right = true;
		}
		if (event.key == " ") {
			if (!titleScreenFadeTriggered) {
				titleScreenFadeTriggered = true;
			}
			player.shoot()
			shoot()
		}
	}
	if (event.is("keyboard:up")) {
		if (event.key == "ArrowLeft" || event.key == "a") {
			left = false;
		}
		if (event.key == "ArrowRight" || event.key == "d") {
			right = false;
		}
	}

	// Touch Controls
	if (event.is("touch")) {
		if (event.x <= 100) {
			left = true;
		}
		if (event.x >= 100 && event.x <= 200) {
			if (!titleScreenFadeTriggered) {
				titleScreenFadeTriggered = true;
			}
			player.shoot()
			shoot()
		}
		if (event.x >= 200) {
			right = true;
		}
	}
	if (event.is("lift")) {
		if (event.x <= 100) {
			left = false;
		}
		if (event.x >= 200) {
			right = false;
		}
	}
}

// 🧮 Sim
function sim({ sound: { synth } }) {
	let vol = 0;
	const whir = () => {
		synth({
		  type: "square",
		  tone: 10,
		  attack: 0,
		  decay: 0,
		  volume: vol,
		  duration: 0.01,
		});
	}

	const hit = () => {
		synth({
		  type: "sine",
		  tone: 600,
		  attack: 0,
		  decay: 1,
		  volume: 0.75,
		  duration: 0.2,
		});
	}

	const crash = () => {
		synth({
		  type: "square",
		  tone: 50,
		  attack: 0,
		  decay: 0,
		  volume: 0.75,
		  duration: 0.2,
		});
	}

	if (explosion.triggered) {
		explosion.sim()
	}

	vol = Math.abs(player.vel) / 4
	// Updates player logic.
	player.update()
	// Updates bullets logic.
	bullets.forEach(function(item) {item.update()})
	// Updates enemies logic and manages the fail condition.
	enemies.forEach(function(item) {
		item.update();

		if (getDistance(item.cartPos.x, item.cartPos.y, 150, 150) <= thresholdSize + 5) {
			fail()
			crash()
		}
	})


	whirClock += 1;
	if (Math.abs(player.vel) > 0 && whirClock >= 10) {
		whir()
		whirClock = 0;
	}

	// Handles player directions.
	if (left && !right || left) {
		player.direction = -1;
	} else if (!left && right || right) {
		player.direction = 1;
	} else if (left && right) {
		player.direction = 0;
	} else if (!left && !right) {
		player.direction = 0;
	}

	// Handles enemy spawns.
	timer += 1;
	if (timer >= enemySpawnRate * 120 && titleScreenFadeTriggered) {
		enemies.push(new Enemy(enemyIndex))
		enemyIndex += 1;
		timer = 0;
		enemySpawnRate -= 0.01
	}

	// Bullet-enemy collision detection.
	bullets.forEach(function(bullet) {
		enemies.forEach(function(enemy) {
			if (getDistance(bullet.cartPos.x, bullet.cartPos.y, enemy.cartPos.x, enemy.cartPos.y) <= 15) {
				hit()
				enemy.destroy()
				bullet.destroy()
				points += 1;
			}
		})
	})

	if (titleScreenVisible) {
		if (titleScreenFadeTriggered) {
			titleScreenFadeTimer += 1;
			titleScreenOpacity -= (255 / (120 * titleScreenFadeTime));
			if (titleScreenOpacity <= 0) {
				titleScreenVisible = false;
			}
		}
	}
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
	explosion.origin = player.cartPos
	explosion.trigger()

	player = new Player();
	bulletIndex = 0;
	enemyIndex = 0;

	bullets = [];
	enemies = [];

	highScore = (points > highScore ? points : highScore)

	points = 0;
	enemySpawnRate = 1.5;
	timer = 0;

	titleScreenOpacity = 255;
	titleScreenVisible = true;
	titleScreenFadeTimer = 0;
	titleScreenFadeTriggered = false;
}

function drawTitleScreen(ink) {
	ink(255, 0, 0, titleScreenOpacity * 0.102).box(0, 0, 100, 300);
	ink(0, 255, 0, titleScreenOpacity * 0.102).box(100, 0, 100, 300);
	ink(0, 0, 255, titleScreenOpacity * 0.102).box(200, 0, 100, 300);

	ink(255, 255, 0, titleScreenOpacity)
	.write("Current high score: " + highScore.toString(), {x: 150, y: 105, center: "xy"})
	.write("SHOOT TO START", {x: 150, y: 265, center: "xy", size: 1})

	ink(255, 255, 255, titleScreenOpacity)
	.write("FIRE!", {x: 154, y: 75, center: "xy", size: 2})
	.write("A game by bash", {x: 150, y: 90, center: "xy"})
	.write("LEFT ARROW", {x: 50, y: 200, center: "xy"})
	.write("TAP LEFT", {x: 50, y: 210, center: "xy"})
	.write("TO MOVE LEFT", {x: 50, y: 230, center: "xy"})
	.write("SPACE", {x: 150, y: 200, center: "xy"})
	.write("TAP MIDDLE", {x: 150, y: 210, center: "xy"})
	.write("TO SHOOT", {x: 150, y: 230, center: "xy"})
	.write("RIGHT ARROW", {x: 250, y: 200, center: "xy"})
	.write("TAP RIGHT", {x: 250, y: 210, center: "xy"})
	.write("TO MOVE RIGHT", {x: 250, y: 230, center: "xy"})
	.write("-------------------------------------------------", {x: 150, y: 220, center: "xy"})
}
export { boot, paint, act, sim, meta };