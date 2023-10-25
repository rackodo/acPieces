/* 
In honour of Markus Calveley.
*/

// Thanks https://stackoverflow.com/a/24137301.
// (Random item from array)
Array.prototype.random = function () {
	return this[Math.floor((Math.random()*this.length))];
}

let comments = [
	"Brought to you by the letter B!",
	"explodes u :3c",
	"aesthetically pleasing"
]

const commandMap = {
	'📐': 'rect', // Rectangle
	'⭕️': 'oval', // Oval
	'📏': 'line' // Line
}

const colourMap = {
	'🟥': 'red',
	'🟧': 'orange',
	'🟨': 'yellow',
	'🟩': 'green',
	'🟦': 'blue',
	'🟪': 'magenta',
	'⬛️': 'black',
	'⬜️': 'white'
}

export function mparse( code ) {
	let message = [];
	if (code in commandMap) {
		message.push(commandMap[code]);
	} else {
		if (code == 'help') {
			message.push("This is a help message. Wooo?")
		}
	}
	message.push(`\*${comments.random()}\*`)
	message.push("------")
	message.push("**v4**")
	return message.join("\n");
}