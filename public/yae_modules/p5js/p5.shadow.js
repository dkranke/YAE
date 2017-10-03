/*
 *  p5 shadow extension - dkranke
 */

// Dest: ./color/setting.js
p5.prototype.shadowClear = function () {
	this._renderer.drawingContext.shadowColor = 'rgba(0, 0, 0, 0)'
	this._renderer.drawingContext.shadowBlur = 0
	this._renderer.drawingContext.shadowOffsetX = 0
	this._renderer.drawingContext.shadowOffsetY = 0
}

p5.prototype.shadow = function (v1Col, v2, v3, v4) {
	if (v1Col && v2 && v3) {
		v1Col = color(v1Col, v2, v3, v4)
	}
	if (v1Col) {
		if (v1Col.toString) {
			this._renderer.drawingContext.shadowColor = v1Col.toString()
		} else {
			this._renderer.drawingContext.shadowColor = v1Col
		}
	}
	return color(this._renderer.drawingContext.shadowColor)
}

p5.prototype.shadowBlur = function (num) {
	if (num) {
		this._renderer.drawingContext.shadowBlur = num
	}
	return this._renderer.drawingContext.shadowBlur
}

p5.prototype.shadowOffset = function (xVector, y) {
	if (xVector && y) {
		this._renderer.drawingContext.shadowOffsetX = xVector
		this._renderer.drawingContext.shadowOffsetY = y
	} else if (xVector) {
		this._renderer.drawingContext.shadowOffsetX = xVector.x
		this._renderer.drawingContext.shadowOffsetY = xVector.y
	}
}
