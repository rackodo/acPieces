// Stamp, 24.02.13.15.23
// A basic stamp brush that imports a user's painting.

let stamp = "@jeffrey/2024.2.13.15.31.05.635"

function boot({ params }) {
	if (params[0] != undefined) {
		stamp = params[0]
	}
}

function brush({ clear, pen }) {
	console.log(stamp)
  clear().stamp(stamp, pen.x, pen.y);
}

export { boot, brush };