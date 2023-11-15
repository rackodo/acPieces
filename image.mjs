import Vector from 'https://assets.rackodo.dev/aesthetic-computer/vector.mjs'

let points = []

var xhr = new XMLHttpRequest();
var img;
var imgW = 24;
var imgH = 24;

// Use JSFiddle logo as a sample image to avoid complicating
// this example with cross-domain issues.
xhr.open("GET", "https://i.imgur.com/rT21Q0K.png", true);

// Ask for the result as an ArrayBuffer.
xhr.responseType = "arraybuffer";

xhr.onload = function (e) {
	// this.response.byteLength = 8
  // Obtain a blob: URL for the image data.
  img = new Uint8Array(this.response)
}

xhr.send()

for (let i = 0; i < 50; i++) {
	points.push(new Vector(Math.random() * 300, Math.random() * 300))
}

const getDistance = (x1, y1, x2, y2) => {
	let a = x1 - x2;
	let b = y1 - y2;
	
	return Math.sqrt( a*a + b*b )
}

// 🥾 Boot
function boot({ wipe, resolution, ink }) {
	// Runs once at the start.
	console.clear()
	resolution(100)
	wipe(0);
	console.log(img)
}

function sourceColour( imageArray, x, y, imageWidth )
{
    var pos = ( ( y * imageWidth ) + x ) * 4;
	var val =
    {
        r : imageArray[pos],
        g : imageArray[pos + 1],
        b : imageArray[pos + 2],
        a : imageArray[pos + 3]
    };

    return val;
}

function sourcePos( x, y, imageWidth )
{
    var pos = ( ( y * imageWidth ) + x ) * 4;
	var val =
    {
        r : pos,
        g : pos + 1,
        b : pos + 2,
        a : pos + 3
    };

    return val;
}

function setPixel(imageArray, x, y, imageWidth, r, g, b, a) {
	// console.log(imageArray)
	var pixel = sourcePos(x, y, imageWidth);

	imageArray[pixel.r] = r;
	imageArray[pixel.g] = g;
	imageArray[pixel.b] = b;
	imageArray[pixel.a] = a;
}

// 🎨 Paint
function paint({ screen, ink }) {
	for (let y = 0; y < imgH; y++) {
		for (let x = 0; x < imgW; x++) {
			var sourceCol = sourceColour(img, x, y, imgW);

			setPixel(screen.pixels, x, y, screen.width, sourceCol.r, sourceCol.g, sourceCol.b, sourceCol.a)
		}
	}
	// console.log(screen.pixels)
	console.log("print")
}
	// return false;}

// 🧮 Sim
function sim() {
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
    title: "UV",
    desc: "A piece called `uv`.",
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

export { boot, paint, sim, meta };
export const nohud = true;

// 📚 Library
//   (Useful functions used throughout the piece)
