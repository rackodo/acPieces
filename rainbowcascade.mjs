let deployed = false;
let dropletCount = 1;

const dropletPos = {
	x: 0,
	y: 0
}

function boot({ api }) {
	console.log(api.page);
}

function act({ event, system: sys }) {
	if (event.is("touch") ) {
		if (!deployed) {
			dropletPos.x = sys.nopaint.brush.x;
			dropletPos.y = sys.nopaint.brush.y;
			deployed = true;
		}
	}
}

// paint
function paint({ screen, page, system: sys }) {
	if (deployed) {
		page(sys.painting).ink().box(dropletPos.x - 1, dropletPos.y - 1, 2, 2).page(screen);
		sys.nopaint.needsPresent = true
	}
}

function sim({ system: sys }) {
	if (deployed) {
		if (dropletPos.y <= sys.painting.height) {
			console.log(dropletCount, dropletPos)
			dropletPos.y += 1;
		} else {
			dropletCount += 1;
			deployed = false;
		}	
	}
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
