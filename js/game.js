class Game {
	constructor() {
		this.canvas = document.getElementById('canvas')
		this.ctx = this.canvas.getContext('2d')

		this.canvas.width  = document.documentElement.clientWidth
		this.canvas.height = document.documentElement.clientHeight

		setInterval(() => { this.update(); this.draw() }, 0)
	}
	update() {

	}
	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}
	draw() {
		this.clear()
		this.ctx.fillStyle = '#DAF7A6'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
	}
}

window.onload = new Game()
