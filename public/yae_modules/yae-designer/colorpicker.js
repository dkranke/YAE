function setup() {
	createCanvas(100, 110);
	background(255);
	colorMode(HSB);

	for (var i = 0; i < 10000; i++) {
		var pos = createVector(i % 100, i / 100);
		stroke(360 / 100 * pos.x, pos.y, 100);
		point(pos.x, pos.y);
	}
	for (var i = 0; i < 100; i++) {
		stroke(0, 0, i);
		line(i, 100, i, 109);
	}
}

function draw() {

}
