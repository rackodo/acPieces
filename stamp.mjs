const commandMap = {
	0: 'rect', // Rectangle
	1: 'oval', // Oval
	2: 'line' // Line
}

const colourMap = {
	0: [255, 0, 0],     // Red
	1: [0, 0, 255],     // Blue
	2: [0, 255, 0],     // Green
	3: [255, 255, 0],   // Yellow
	4: [128, 0, 255],   // Purple
	5: [255, 128, 255], // Pink
	6: [255, 255, 255], // White
	7: [0, 0, 0]        // Black
}

const coordMap = {
    'A': 0,
    'B': 1,
    'C': 2,
    'D': 3,
    'E': 4,
    'F': 5,
    'G': 6,
    'H': 7,
    'I': 8,
    'J': 9,
    'K': 10,
    'L': 11,
    'M': 12,
    'N': 13,
    'O': 14,
    'P': 15,
    'Q': 16,
    'R': 17,
    'S': 18,
    'T': 19,
    'U': 20,
    'V': 21,
    'W': 22,
    'X': 23,
    'Y': 24,
    'Z': 25,
    'a': 26,
    'b': 27,
    'c': 28,
    'd': 29,
    'e': 30,
    'f': 31,
    'g': 32,
    'h': 33,
    'i': 34,
    'j': 35,
    'k': 36,
    'l': 37,
    'm': 38,
    'n': 39,
    'o': 40,
    'p': 41,
    'q': 42,
    'r': 43,
    's': 44,
    't': 45,
    'u': 46,
    'v': 47,
    'w': 48,
    'x': 49,
    'y': 50,
    'z': 51,
    '0': 52,
    '1': 53,
    '2': 54,
    '3': 55,
    '4': 56,
    '5': 57,
    '6': 58,
    '7': 59,
    '8': 60,
    '9': 61,
    '+': 62,
    '/': 63,
    '$': 64
};

function untangle( strands ) {
	let splitStrands = strands.toString().split(".")
	let results = [];
	for (let strand = 0; strand < splitStrands.length; strand++) {
		let knots = splitStrands[strand].split("");
		
		let tool = commandMap[knots[0]];

		let colour = colourMap[knots[1]];
		
		let coords = {
			'xA': coordMap[knots[2]],
			'yA': coordMap[knots[3]],
			'xB': coordMap[knots[4]],
			'yB': coordMap[knots[5]],
		}

		results.push([tool, colour, coords])

	}
	return results;

}

let contactPos, relOriginPos, relEndingPos, strings;

// 🥾 Boot
function boot({ wipe, params }) {
	strings = untangle(params)
}

// 🎨 Paint
function paint({ ink }) {
	if (contactPos) {

		for (let string = 0; string < strings.length; string++) {
			let currentString = strings[string];
			let workingStart = [relOriginPos[0] + currentString[2].xA, relOriginPos[1] + currentString[2].yA]
			let workingEnd = [relOriginPos[0] + currentString[2].xB, relOriginPos[1] + currentString[2].yB]
	
			switch (currentString[0]) {
				case 'rect':
					console.log("Weaving a rectangle with " + currentString[1] + " colour from " + workingStart + " to " + workingEnd)
	
					ink(currentString[1]).box(workingStart[0], workingStart[1], currentString[2].xB, currentString[2].yB)
	
					break;
				case 'line':
					console.log("Weaving a line with " + currentString[1] + " colour from " + workingStart + " to " + workingEnd)
	
					ink(currentString[1]).line(workingStart[0], workingStart[1], workingEnd[0], workingEnd[1])
	
					break;
				case 'oval':
					console.log("Weaving an oval with " + currentString[1] + " colour at " + workingStart + " with radius " + workingEnd)
	
					ink(currentString[1]).oval(workingStart[0], workingStart[1], currentString[2].xB, currentString[2].yB, true)
	
					break;
				default: 
					break;
			}
		}
		return;

		contactPos = undefined;
	}
}

function act({ event }) {
	if (event.is("touch")) {
		contactPos = [event.x, event.y];
		relOriginPos = [contactPos[0] - 32, contactPos[1] - 32];
		relEndingPos = [contactPos[0] + 32, contactPos[1] + 32];
	}
}



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
	title: "Untangle",
	desc: "Untangle strands, strings of encoded commands, into their individual commands and print the details into the console.",
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

export { boot, paint, meta, untangle, act };

// 📚 Library
//   (Useful functions used throughout the piece)
