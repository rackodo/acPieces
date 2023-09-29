// silverlining, 2023.9.29.07.46.26.051
// 

let bri = 0;
let direction = 1;
let multiplier = 5;

// 🥾 Boot
function boot({ wipe }) {
  wipe(255);
}

// 🎨 Paint
function paint({ ink, pen, screen }) {
	bri += direction * multiplier;
	if (bri >= 255) {
		direction = -1;
	}
	if (bri <= -1) {
		direction = 1;
	}
	ink(bri).line([screen.center.x, screen.center.y], [pen.x, pen.y]);
}

// 📰 Meta
function meta() {
  return {
    title: "silverlining",
    desc: "",
  };
}

export { boot, paint, meta };

