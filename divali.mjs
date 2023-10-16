export function Divali( input ) {
	let arr = input.split("");
	let output = "";

	for (let i = 0; i < arr.length - 1; i++) {
		let flip = arr.shift();
		arr.push(flip)
	}
	
	output = arr.join("")
	return (output + "123123");
}