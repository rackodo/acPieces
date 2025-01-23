// Projection, 2024.10.21.21.09.26.926
// A blank piece.

/* 📝 Notes 
	From https://endesga.xyz/?page=projection
*/

class vector {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	dot( a, b ) {
		return a.x * b.x + a.y * b.y + a.z * b.z;
	}

	cross( a, b ) {
		return new vector(
			a.y * b.z - a.z * b.y,
			a.z * b.x - a.x * b.z,
			a.x * b.y - a.y * b.x
		)
	}

	length( v ) {
		return Math.sqrt( vector.dot( v, v ) );
	}
}

class projection {
	constructor(view_scale, spherical, sphere_scale) {
		this.view_scale = view_scale;
		this.spherical = spherical;
		this.sphere_scale = sphere_scale;
	}
}

function new_projection(fov_degrees, spherical, sphere_scale) {
	return new projection(
		1. / Math.tan(fov_degrees * .5),
		spherical,
		sphere_scale
	)
}


function world_to_view( v ) {
	return new vector(-v.y, -v.z, v.x);
}

function vector_project( v, p ) {
	let pos = world_to_view(v);
	let z = ( ( 1. - p.spherical ) * pos.z ) + 
		( p.spherical * (
			vector.length(
				new vector( pos.x * pos.y, pos.z * p.sphere_scale )
			) / p.sphere_scale
		) )

		return new vector(
			pos.x / z * p.view_scale,
			pos.y / z * p.view_scale,
			1. / z
		)
}

function paint({ wipe, ink, line, screen }) {
  wipe("gray");
  ink("yellow");
  line(0, 0, screen.width, screen.height);
}

// 📚 Library

// function boot() {
 // Runs once at the start.
// }

// function act({ event: e }) {
//  // Respond to user input here.
// }

// function sim() {
//  // Runs once per logic frame. (120fps locked.)
// }

// function beat() {
//   // Runs once per metronomic BPM.
// }

// function leave() {
//  // Runs once before the piece is unloaded.
// }

// function preview({ ink, wipe }) {
// Render a custom thumbnail image.
// }

// function icon() {
// Render an application icon, aka favicon.
// }

// ⚠️ Also available: `brush` and `filter`.