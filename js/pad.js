class Pad {
	constructor(ctx, x, y, rightBind, leftBind) {
		this.ctx = ctx
		this.width = 100
		this.height = 20
		this.x = x
		this.y = y
		this.right = rightBind
		this.left = leftBind
	}
	update() {}
	draw() {
		this.ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}
