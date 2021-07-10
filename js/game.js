const DIRECTION = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3,
}

class Ball {
	constructor(ctx, canvas) {
		this.ctx = ctx
		this.canvas = canvas
		this.size = 20
		this.direction = DIRECTION.UP
		this.x = this.canvas.width / 2 - this.size / 2
		this.y = this.canvas.height / 2 - this.size / 2
	}
	update() {

	}
	draw() {
		this.ctx.fillRect(this.x, this.y, this.size, this.size)
	}
}

class Pad {
	constructor(ctx, canvas, pos) {
		this.ctx = ctx
		this.canvas = canvas
		this.width = 80
		this.height = 20
		switch(pos) {
			case 'up':
				this.x = this.canvas.width / 2 - this.width / 2
				this.y = this.height * 2
				break;
			case 'down':
				this.x = this.canvas.width / 2 - this.width / 2
				this.y = this.canvas.height - this.height * 2
				break;
		}
	}
	handleKeyboard() {

	}
	update() {

	}
	draw() {
		this.ctx.fillRect(this.x, this.y, this.width, this.height)
	}
}

class Game {
	constructor() {
		this.canvas = document.getElementById('canvas')
		this.ctx = this.canvas.getContext('2d')

		this.canvas.width  = document.documentElement.clientWidth
		this.canvas.height = document.documentElement.clientHeight

		this.ball = new Ball(this.ctx, this.canvas)
		this.player1 = new Pad(this.ctx, this.canvas, 'up')
		this.player2 = new Pad(this.ctx, this.canvas, 'down')

		setInterval(() => { this.update(); this.draw() }, 0)
	}
	update() {

	}
	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}
	draw() {
		this.clear()
		this.ctx.fillStyle = '#0f0f0f'
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.fillStyle = '#FFFFFF'
		this.ball.draw()
		this.player1.draw()
		this.player2.draw()
	}
}

window.onload = new Game()
