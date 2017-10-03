function fillWindow() {
	var content = select("#content");
	resizeCanvas(content.width, content.height);
}

window.onresize = function () {
	fillWindow();
}

function setup() {
	var content = select("#content");
	var canvas = createCanvas(800, 600);
	canvas.parent(content);
	fillWindow();
	stroke(0);
	strokeWeight(2);
	fill(255, 0, 0);
	rectMode(CENTER, CENTER);
}

function draw() {
	if (frameCount > 0) {
		background(255, 32);
		let i = (frameCount % 128) / 2;
		translate(48 + frameCount % (width - 96), height / 2);
		rotate(radians(frameCount % 90));
		if (i < 32) {
			shadow(192, 192, 192);
			shadowOffset(2, 2);
			shadowBlur(5);
			rect(0, 0, 64, 64, i, i);
			shadowClear();
			rect(0, 0, 64, 64, i, i);
		} else {
			i -= 32;
			shadow(192, 192, 192);
			shadowOffset(2, 2);
			shadowBlur(5);
			rect(0, 0, 64, 64, 32 - i, 32 - i);
			shadowClear();
			rect(0, 0, 64, 64, 32 - i, 32 - i);
		}
	}
}
