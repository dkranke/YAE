// Fullscreen Methods
function fillWindow() {
	resizeCanvas(window.innerWidth, window.innerHeight);
}

window.onresize = function () {
	fillWindow();
}

var lastMouseIsPressed, mousePressed, mouseReleased;

// p5js-Methods
function setup() {
	createCanvas(800, 600);
	fillWindow();
	textAlign(CENTER, CENTER);
}


var shape = [];
var tool = {
	name: "rect",
	ctor: ["point", "point"],
	args: ["number", "number", "number", "number"],
	edit: ["point", "point", "point", "point"],
	index: -1,
	apply: (ctor) => {
		if (!ctor) return;
		if (!ctor[0] || !ctor[1]) return;

		var data = {
			type: "rect",
			args: { // call rect(...args); or rect.apply(null, args);
				0: ctor[0].x,
				1: ctor[0].y,
				2: ctor[1].x - ctor[0].x,
				3: ctor[1].y - ctor[0].y
			},
			edit: {
				0: ctor[0].copy(),
				1: createVector(ctor[1].x, ctor[0].y),
				2: createVector(ctor[1].x, ctor[1].y),
				3: createVector(ctor[0].x, ctor[1].y)
			}
		}

		return data;
	}
};

function update() {
	mousePressed = mouseIsPressed && !lastMouseIsPressed;
	mouseReleased = !mouseIsPressed && lastMouseIsPressed;


}

function draw() {
	update();

	background(mousePressed ? color(0, 255, 0) : mouseReleased ? color(255, 0, 0) : 255)

	lastMouseIsPressed = mouseIsPressed;
}
