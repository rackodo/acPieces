const getDistance = (x1, y1, x2, y2) => {
	let a = x1 - x2;
	let b = y1 - y2;

	return Math.sqrt( a*a + b*b )
}

class HSlider {
	constructor(
		color = [255, 255, 255],
		thickness = 3,
		ballSize = 5,
		startX, 
		endX,
		y, 
		minValue = 0, 
		maxValue = 1,
		initialValue = 0) {
			this.color = color;
			this.thickness = thickness;
			this.ballSize = ballSize;
			this.startX = startX;
			this.endX = endX;
			this.y = y;
			this.minValue = minValue;
			this.maxValue = maxValue;
			this.initialValue = initialValue;

			this.isHeld = false;
			this.value = (minValue + maxValue) / 2;
			this.rawValue = (startX + endX) / 2;
			this.lastUserPos = {
				x: 0,
				y: 0
			}

			if (initialValue < minValue | initialValue > maxValue) {
				throw new Error('Initial value cannot be outside value range.')
			}

			if (startX >= endX) {
				throw new Error('Incorrect min and/or max value set.')
			}
	}

	draw(ink) {

		ink((this.isHeld ? [255, 0, 0] : this.color))
		
		.pline([[this.startX, this.y], [this.endX, this.y]], this.thickness)
		.pline([[this.startX, this.y - this.ballSize], [this.startX, this.y + this.ballSize]], this.thickness)
		.pline([[this.endX, this.y - this.ballSize], [this.endX, this.y + this.ballSize]], this.thickness)
		
		.circle(this.rawValue, this.y, this.ballSize)
	}

	calculate(event) {
		if (this.isTouching(event.x, event.y)) {
			this.isHeld = true;
			this.lastUserPos = {
				x: event.x,
				y: event.y
			}
		} else {
			this.isHeld = false;
		}
	}

	sim() {
		if (this.isHeld) {
			if (this.lastUserPos.x <= this.startX) {
				this.rawValue = this.startX;
			} else if (this.lastUserPos.x >= this.endX) {
				this.rawValue = this.endX;
			} else {
				this.rawValue = this.lastUserPos.x;
			}
		}
	}

	isTouching = (x, y) => {
		return (getDistance(this.rawValue, this.y, x, y) <= this.ballSize)
	}
}

let sliderA = new HSlider([0, 255, 255], 2, 6, 25, 125, 100, 0, 1, 0.5)

/* #region 📚 README 
#endregion */

/* #region 🏁 TODO 
#endregion */

// 🥾 Boot
function boot({ wipe, resolution }) {
  // Runs once at the start.
  resolution(200)
  wipe(0);
}

// 🎨 Paint
function paint({ ink, wipe }) {
	wipe(0);
	sliderA.draw(ink)
//   return false; // Uncomment for a frame loop.
}

// 🎪 Act
function act({ event }) {
	if (event.is("touch") || event.is("drag")) {
		sliderA.calculate(event)
	}
 // Respond to user input here.
}

// 🧮 Sim
function sim() {
	// Runs once per logic frame. (120fps locked.)
	sliderA.sim()
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
    title: "UILibrary",
    desc: "A piece called `UILibrary`.",
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

export { boot, paint, meta, act, sim };
export const nohud = true;

// 📚 Library
//   (Useful functions used throughout the piece)
