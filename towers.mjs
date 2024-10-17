class GridCreature {
	constructor(x, y, grid) {
		this.pos = {x: x, y: y}
		this.grid = grid;

		this.draw = (ink) => {
			ink().paste("@bash/2024.8.05.20.01.58.166", this.grid.returnGridX(this.pos.x), this.grid.returnGridY(this.pos.y), {scale: this.grid.size / 16})
		}
	}
}

class Grid {
	constructor(x, y, rows, cols, size) {
		this.pos = {x: x, y: y}
		this.rows = rows
		this.cols = cols
		this.size = size

		this.items = Array.from(Array(this.rows), () => new Array(this.cols).fill(undefined))

		this.returnGridX = (x) => {
			return(this.pos.x + (x * this.size))
		}
	
		this.returnGridY = (y) => {
			return(this.pos.y + (y * this.size))
		}
	}

	

	draw(ink) {
		for (let h = 0; h < this.cols; h++) {
			for (let w = 0; w < this.rows; w++) {
				ink((w + h) % 2 == 0 ? "tan" : "white").box(this.returnGridX(w), this.returnGridY(h), this.size)
				if (typeof(this.items[w][h]) == "object") {
					this.items[w][h].draw(ink)
					console.log("Drawing", this.items[w][h])
				}
			}
		}
	}
}

let grid = new Grid(8, 8, 16, 16, 16)
grid.items[2][4] = new GridCreature(2, 4, grid)
grid.items[5][7] = new GridCreature(5, 7, grid)

function boot({ resolution, hud }) {
	hud.label("(WIP) Towers", "cyan")
	resolution(272, 320)
	//  Runs once at the start.
	console.log(grid.items)
}

function paint({ wipe, ink }) {
	wipe("black");
	grid.draw(ink)
	ink("white").line(0, 272, 272, 272)
}

function act({ event: e }) {
	// Respond to user input here.
}

function sim() {
	// Runs once per logic frame. (120fps locked.)
}

function meta() {
	return {
		title: "towers",
		desc: "something different"
	}
}

export { boot, paint, act, sim, meta }

// ⚠️ Also available: `brush` and `filter`.