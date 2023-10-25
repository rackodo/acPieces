const commandMap = {
	'📐': 'rect', // Rectangle
	'⭕️': 'oval', // Oval
	'📏': 'line' // Line
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

export function mparse( code ) {
	/* 
	In honour of Markus Calveley.
	*/
	let message = [];
	if (code in commandMap) {
		message.push(commandMap[code]);
	} else {
		message.push("bummer :(")
	}
	message.push("\*Brought to you by the letter B!\*")
	message.push("------")
	message.push("**v2**")
	return message.join("\n");
}