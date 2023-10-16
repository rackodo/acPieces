export function Divali( input ) {
	let arr = input.split("");
	let output = [];

	for (let i = 0; i < arr.length + 1; i++) {
		output.push(arr.join(""))
		let flip = arr.shift();
		arr.push(flip)
	}

	return output;
}