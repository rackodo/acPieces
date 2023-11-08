import clock from 'https://aesthetic.computer/media/@bash/piece/clock.mjs'

export default class Vector {
	constructor(x = 0, y = 0) {
		this.x = x,
		this.y = y
	}
	
	mag = () => {
		return (Math.sqrt(this.x**2, this.y**2))
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

	randomNumBetween(min, max) {
		return min + Math.random() * (max - min);
	};

	random(minX, minY, maxX, maxY) {
		return new Vector(
			this.randomNumBetween(minX, maxX),
			this.randomNumBetween(minY, maxY)
		);
	}
}

let vec = new Vector().random(0, 0, 300, 300);
let cl = new clock()

function paint({ ink, wipe, resolution, screen }) {
	wipe(0)
	resolution(300)
	ink(255, 127, 128, 128)
	.circle(vec.x, vec.y, 10, true)
	.write(
		vec.mag(),
		{x: screen.width / 2, y: screen.height / 2 + 50, center: "xy"}
	)
	ink(255, 127, 128)
	.write(
		"This isn't meant to be an interactive piece.", 
		{x: screen.width / 2, y: screen.height / 2 - 15, center: "xy"})
	.write(
		"Try importing this into your own piece!", 
		{x: screen.width / 2, y: screen.height / 2, center: "xy"})
	.write(
		"- bash", 
		{x: screen.width / 2, y: screen.height / 2 + 15, center: "xy"})
}

function sim() {
	cl.tick()
	if (cl.time % 120 <= 0.5) {
		vec = vec.random(0, 0, 300, 300)
	}
}

export { paint, sim };