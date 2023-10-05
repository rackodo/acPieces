let deployed = false;
let dropletIndex = 0;
let dropletStorage = [];

// const dropletPos = {
// 	x: 0,
// 	y: 0
// }

class Droplet {
	constructor(x, y, hasLanded, dropletIndex) {
		this.hasLanded = hasLanded;
		this.dropletIndex = dropletIndex;
		this.pos = {
			x: x,
			y: y
		}
	}

	simulate(sys) {
		if (this.pos.y <= sys.painting.height && !this.hasLanded) {
			this.pos.y += 1;
		} else {
			this.hasLanded = false;
			dropletStorage.splice(dropletStorage.findIndex((x) => x.dropletIndex === this.dropletIndex), 1)
		}
	}
}

function createNewDroplet(x, y) {
	dropletIndex += 1;
	console.log("Making droplet!")
	return new Droplet(x, y, false, dropletIndex);
}

function boot({ api }) {
	console.log(api.page);
}

function act({ event, system: sys }) {
	if ( event.is("touch") || event.is("draw") ) {
		// if (!deployed) {
		// 	dropletPos.x = sys.nopaint.brush.x;
		// 	dropletPos.y = sys.nopaint.brush.y;
		// 	deployed = true;
		// }

		dropletStorage.push(createNewDroplet(sys.nopaint.brush.x, sys.nopaint.brush.y));
	}
}

// paint
function paint({ screen, page, system: sys }) {
	// if (deployed) {
	// 	page(sys.painting).ink().box(dropletPos.x - 1, dropletPos.y - 1, 2, 2).page(screen);
		
	// }

	// dropletStorage.forEach(function(item, index, arr) {
	// 	page(sys.painting).ink().box(index.)
	// })

	// console.log(dropletStorage);

	dropletStorage.forEach(function(item, index, arr) {
		page(sys.painting).ink().box(item.pos.x - 1, item.pos.y -1, 2, 2).page(screen);
	})

	sys.nopaint.needsPresent = true;
}

function sim({ system: sys }) {
	dropletStorage.forEach(function(item, index, arr) {
		item.simulate(sys);
	})

	console.log(dropletStorage.length);
}

// 📰 Meta
function meta() {
  return {
    title: "Bounce",
    desc: "",
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

export { boot, meta, act, paint, sim };
export const system = "nopaint";

// 📚 Library
//   (Useful functions used throughout the piece)
