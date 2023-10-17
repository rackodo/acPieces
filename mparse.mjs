export function mParse( input ) {
	/* 
	In honour of Markus Calveley. The gayest little bastard to ever be imagined. 
	*/
	let message = [];
	message.push(input);
	message.push("\*Brought to you by the letter B!\*")
	return message.join("\n");
}