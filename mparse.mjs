export function mparse( input ) {
	/* 
	In honour of Markus Calveley.
	*/
	let message = [];
	message.push(input);
	message.push("\*Brought to you by the letter B!\*")
	return message.join("\n");
}