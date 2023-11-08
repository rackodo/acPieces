// Uitest, 2023.11.09.10.04.15.381
// A piece called `uitest`.

/* #region 📚 README 
#endregion */

/* #region 🏁 TODO 
#endregion */

let btn;

// 🥾 Boot
function boot({ wipe, ui, screen }) {
  // Runs once at the start.
  wipe(0);
  const m = 24;
  btn = new ui.Button(m, m, screen.width - m * 2, screen.height - m * 2);
}

// 🎨 Paint
function paint({ ink, screen }) {
	btn.paint(() => {
		ink(btn.down ? [245, 220, 50] : [255, 0, 0])
		  .box(btn.box)
		  .ink(255)
		  .write(`a`, { center: "xy" })
		  .ink("red")
		  .write(`b`, { center: "x", y: screen.height / 2 - 16 });
		ink(0).line(0, screen.height - 1, screen.width, screen.height - 1);
		ink(255).line(
		  0,
		  screen.height - 1, screen.width,
		  screen.height - 1,
		);
	});
}

// 🎪 Act
// function act({ event }) {
//  // Respond to user input here.
// }

// 🧮 Sim
// function sim() {
//  // Runs once per logic frame. (120fps locked.)
// }

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
    title: "Uitest",
    desc: "A piece called `uitest`.",
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

export { boot, paint, meta };

// 📚 Library
//   (Useful functions used throughout the piece)
