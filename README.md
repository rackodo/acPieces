# Bash's AC Pieces
a selection of pieces published to (or will be published to) [aesthetic.computer](https://github.com/digitpain/aesthetic.computer).

## To Do
```
[x] silverlining
	[x] clicks or taps update the origin of the pen
	[x] allow this piece to save to the canvas

[ ] stamp
	[x] microcommand strings (strands) implementation
	[x] decoding strands into stamps
	[x] allow use of stamps in preview space
	[x] paint stamps onto canvas
	[-] develop stamp encoder
		[x] website (see https://github.com/rackodo/strand-encoder)
		[ ] builtin gui

	[?] (OPTIONAL) pull strands from pastebin
		unsure how to implement without exposing an API key, which could be abused

[x] rainbowcascade
	[?] mental note for the future - try to make this more efficient and less resource heavy? it CHUGS memory atm

[ ] movementmanager
	[x] base implementation
	[ ] wasd and arrow key separation
	could allow for two players at once. maybe three if i throw in ijkl keys, but i don't know if that would be worth the time

[x] thoughts
	nothing to really say here, except i had to learn about radial coordinates to make this one work. lowkey super proud of myself

[x] touchdetection
	[x] check if mouse is inside circle
	[x] add circle detector
	[x] create demo
	twocirclesdemo is only meant to showcase the detection of hovers, clicks and drags. it doesn't need to be perfect if it shows the concept and what can be done
	[x] add rectangle detector
	this will be vastly easier than the circle detector. check if the cursor is inside the bounds of a box, that's much easier than calculating angles, distances, etc.

	A---------+ A: (0,0) | B: (5,5) | C: (2, 3)
	|         |
	|  C      | IF (C.x > A.x) AND (C.x < B.x) THEN C.x is inside the bounds 
	|         | IF (C.y > A.y) AND (C.y < B.y) THEN C.y is inside the bounds
	+---------B

	[?] refine, maybe?
```
