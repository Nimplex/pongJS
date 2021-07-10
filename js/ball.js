class Ball {
	constructor(ctx) {
		this.ctx = ctx
		this.size = 50
		this.x = (window.outerWidth / 2) - this.size
		this.y = (window.outerHeight / 2) - this.size
	}
	update() {
	}
	draw() {
		this.ctx.fillRect(this.x, this.y, this.size, this.size);
	}
}