class Clock {
	constructor() {
		this.time = 0;

		this.min = 0;
		this.sec = 0;
		this.ms = 0;


		this.stopwatchTime = `00:00.00`
		this.fancyTime = `0min, 0s`
		this.basicTime = `0 0 0`

		this.pad = (num, size) => {
			num = num.toString();
			while (num.length < size) num = "0" + num;
			return num;
		}
	}

	tick() {
		this.min = Math.floor(this.time / 7200)
		this.sec = Math.floor(this.time / 120) % 60
		this.ms = Math.floor((this.time % 120) * 0.83)

		this.stopwatchTime = `${this.pad(this.min, 2)}:${this.pad(this.sec, 2)}.${this.pad(this.ms, 2)}`
		this.fancyTime = `${this.min}min, ${this.pad(this.sec)}s`
		this.basicTime = `${this.min} ${this.sec} ${this.ms}`

		this.time += 1
	}

	reset() {
		this.time = 0;
	}
}

// 📰 Meta
function meta() {
  return {
    title: "Clock",
    desc: "A piece called `clock`.",
  };
}

let cl = new Clock()

function paint({wipe, ink, screen, resolution}) {
	wipe(0)
	resolution(300)
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
	
	ink(255).write(
		"Time you've wasted here: " + cl.stopwatchTime, 
		{x: screen.width / 2, y: screen.height / 2 + 50, center: "xy"})
}

function sim() {
	cl.tick()
}

export { paint, meta, sim };
export default Clock

// 📚 Library
//   (Useful functions used throughout the piece)
