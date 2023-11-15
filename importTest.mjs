console.log("Importing clock...")
import clock from 'https://assets.rackodo.dev/aesthetic-computer/clock.mjs'
console.log("Imported.")

let cl = new clock();

// 🥾 Boot
function boot({ wipe }) {
  // Runs once at the start.
  wipe(0);
}

// 🎨 Paint
function paint({ ink, wipe, screen }) {
	wipe(0)
	ink(255)
	.write(cl.fancyTime, {x: screen.width / 2, y: screen.height / 2 - 10, center: "xy"})
	.write(cl.stopwatchTime, {x: screen.width / 2, y: screen.height / 2, center: "xy"})
	.write(cl.basicTime, {x: screen.width / 2, y: screen.height / 2 + 10, center: "xy"})
}

function sim() {
	cl.tick()
}

// 📰 Meta
function meta() {
  return {
    title: "Blank",
    desc: "A blank piece.",
  };
}
export { boot, paint, meta, sim };

// 📚 Library
//   (Useful functions used throughout the piece)
