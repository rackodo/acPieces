let bri = 0;
let direction = 1;
let multiplier = 5;
let origin;
let destination;
let penDown = false;

// 🥾 Boot
function boot({  }) {
}

function act({ event, system: sys }) {
	if (event.is("touch")) {
		origin = sys.nopaint.brush;
		destination = sys.nopaint.brush;
		penDown = true;
		console.log("Land", origin);
	}
	if (event.is("draw")) {
		destination = sys.nopaint.brush;
		console.log("Drawing", destination);
	}
	if (event.is("lift")) {
		penDown = false;
		console.log("Lift", event);
	}
}

// 🎨 Paint
function paint({ page, screen, system: sys }) {
	if (origin) {
		if (penDown) {
			bri += direction * multiplier;
			if (bri >= 255) {
				direction = -1;
			}
			if (bri <= -1) {
				direction = 1;
			}
			page(sys.painting)
			.ink(bri).line(origin.x, origin.y, destination.x, destination.y)
			.page(screen);
		}
	}
}

// 📰 Meta
function meta() {
  return {
    title: "silverlining",
    desc: "",
  };
}

export { boot, paint, meta, act };
export const system = "nopaint";