let offset = 0.1;
let time = 255;

let msgs = [
	"Where are we going?",
	"Do we even know?",
	"When will we find out?",
	"..."
]

let msgInd = 0

const center = {
	x: 0,
	y: 0
}

function boot({ wipe, screen }) {
  // Runs once at the start.
  wipe(0);

  center.x = screen.width / 2;
  center.y = screen.height / 2;

//   console.log(api.printLine)
}

// 🎨 Paint
function paint({ ink, wipe }) {
	for (let j = 0; j < 2; j += 0.1) {
		wipe(0);
		time -= 0.1;

		// Local variable setup
		let distance = 0.1;
		let angle = offset;
		let rad = 60;

		
		// Draw background "boundaries"
		ink(0, 188, 191, 128).circle(center.x, center.y, rad, false)
		ink(0, 188, 191, 128).line(center.x - rad, center.y, center.x + rad, center.y)
		ink(0, 188, 191, 128).line(center.x, center.y - rad, center.x, center.y + rad)
		
		// Draw spiral
		for (let i = 0; i < 2; i += 0.1) {
			let posX = center.x + ((distance / 5) * Math.cos(angle * (Math.PI / 5) + (j * Math.PI)))
			let posY = center.y + ((distance / 5) * Math.sin(angle * (Math.PI / 5) + (j * Math.PI)))
			
			let randomR = Math.floor(Math.random() * (256 - 0) + 0)
			let randomG = Math.floor(Math.random() * (256 - 0) + 0)
			let randomB = Math.floor(Math.random() * (256 - 0) + 0)
			
			ink(randomR, randomG, randomB).line(center.x, center.y, posX, posY)
			ink(randomR, randomG, randomB).circle(posX, posY, 3, true)
			
			distance += i * (3 * 5) ;
			angle += i * (Math.PI * (Math.PI * 0.01) * 5);
		}

		// Write messages
		ink(time).write(msgs[msgInd], {x: center.x, y: center.y + 70, center: "xy"});

		// Controls message loop + text colour
		if (time < 0) {
			msgInd += 1;
			if (msgInd == msgs.length) {
				msgInd = 0;
			}
			time = 255;
		}
	}
	offset += 0.1;

}

// 📰 Meta
function meta() {
  return {
    title: "thoughts",
    desc: "thinkpiece by bash.",
  };
}

export { boot, paint, meta };
