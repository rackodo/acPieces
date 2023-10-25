export function mparse( code ) {
	/* 
	In honour of Markus Calveley.
	*/
	let message = [];
	if (code == "✨") {
		message.push("You input ✨!");
	} else if (code == "🌈") {
		message.push("You input 🌈!")
	} else {
		message.push("You didn't input ✨ or 🌈.")
	}
	message.push("\*Brought to you by the letter B!\* **Iteration 1.0**")
	return message.join("\n");
}