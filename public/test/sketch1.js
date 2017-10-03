// Fullscreen Methods
function fillWindow() {
	resizeCanvas(window.innerWidth - 32, window.innerHeight - 32);
}

window.onresize = function () {
	fillWindow();
}


var backgroundC,
	shadowC,
	normalC,
	hoverC,
	activeC;
var done;

// p5js-Methods
function setup() {
	createCanvas(800, 600);
	fillWindow();
	textAlign(CENTER, CENTER);

	backgroundC = color("#f3f3f3");
	shadowC = color("#ccc");
	normalC = color("#222");
	hoverC = color("#99BBF5");
	activeC = color("#3e82f7");

	done = true;
}

function update() {

}

function draw() {
	update();

	if (done) {
		background(255);
		var nextButton = 5 + button("Auswählen", 5, 5) + 5;
		nextButton += button("Rechteck", nextButton, 5) + 5;
		nextButton += button("Oval", nextButton, 5) + 5;
		nextButton += button("Freiform", nextButton, 5) + 5;
		nextButton += button("x", nextButton, 5) + 5;
	}
}


function button(label, x, y) {
	var width = textWidth(label) + 20;

	var mx = (mouseX - x);
	mx = 0 <= mx && mx <= width;
	var my = (mouseY - y);
	my = 0 <= my && my <= 30;
	var m = mx && my;
	fill(backgroundC);
	stroke(m ? hoverC : normalC);
	rect(x, y, width, 30, 2, 2);
	fill(normalC);
	noStroke();
	text(label, x + width / 2, y + 15);
	return width;
}
