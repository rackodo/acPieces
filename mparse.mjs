/* 
In honour of Markus Calveley.
*/

// Thanks https://stackoverflow.com/a/24137301.
// (Random item from array)
Array.prototype.random = function () {
	return this[Math.floor((Math.random()*this.length))];
}

const shortCommands = {
	'🐟': 'pond'
}

const longCommands = {
	'📐': 'rect',
	'⭕️': 'oval',
	'📏': 'line'
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

let comments = [
	"Brought to you by the letter B!",
	"explodes u :3c",
	"aesthetically pleasing"
]

let helpMenu = [
	'**Long Commands**',
	'📐 - Rectangle. Asks for colour, width and height.',
	'⭕️ - Oval. Asks for colour, horizontal radius and vertical radius.',
	'📏 - Line. Asks for colour, starting X positon, starting Y positon, ending X position, ending Y position.',
	' ',
	'**Short Commands**',
	'🐟 - Pond. Splish splash :)'
]

export function mparse( code ) {
	let message = [];
	if (code in longCommands) {
		message.push(longCommands[code], ", a long command.");
	} else if (code in shortCommands) {
		message.push(shortCommands[code], ", a short command.")
	}
	else if (code == 'help') {
		helpMenu.forEach(function(item) {
			message.push(item)
		})
	} else {
		message.push("Something's not right. :/")
	}
	message.push("------")
	message.push(`\*${comments.random()}\*`)
	message.push("**v7**")
	return message.join("\n");
}