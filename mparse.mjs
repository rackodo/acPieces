/* 
In honour of Markus Calveley.
*/

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
	message.push("\*Brought to you by the letter B!\*")
	message.push("------")
	message.push("**v3**")
	return message.join("\n");
}