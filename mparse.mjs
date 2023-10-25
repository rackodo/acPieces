/* 
In honour of Markus Calveley.
*/

// Thanks https://stackoverflow.com/a/24137301.
// (Random item from array)
Array.prototype.random = function () {
	return this[Math.floor((Math.random()*this.length))];
}

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



let comments = [
	"Brought to you by the letter B!",
	"explodes u :3c",
	"aesthetically pleasing"
]



export function mparse( code ) {
	let message = [];
	if (code in commandMap) {
		message.push(commandMap[code]);
	} else if (code == 'help') {
		message.push("This is a help message. Wooo?")
	} else {
		message.push("Something's not right. :/")
	}
	message.push("------")
	message.push(`\*${comments.random()}\*`)
	message.push("**v5**")
	return message.join("\n");
}