const DIRECTION = {
	UP: 0,
	DOWN: 1,
	LEFT: 2,
	RIGHT: 3,
	UL: 4,
	UR: 5,
	DL: 6,
	DR: 7,
	NONE: 10,
}

const KEYS = {
	A: 'KeyA',
	D: 'KeyD',
	J: 'KeyJ',
	L: 'KeyL',
}

class Ball {
	constructor(ctx, canvas, game) {
		this.game = game
		this.players = [game.player1, game.player2]
		this.ctx = ctx
		this.canvas = canvas
		this.size = 20
		this.direction = DIRECTION.UP
		this.x = this.canvas.width / 2 - this.size / 2
		this.y = this.canvas.height / 2 - this.size / 2
	}
	update() {
		if (this.x == this.canvas.width - this.size) return this.direction == DIRECTION.UL ? DIRECTION.UR : this.direction == DIRECTION.DL ? DIRECTION.DR : DIRECTION.UR
		if (this.x == this.size) return this.direction == DIRECTION.UL ? DIRECTION.UR : this.direction == DIRECTION.DL ? DIRECTION.DR : DIRECTION.UR
		this.players.forEach(player => {
			console.log(player)
			if (
				this.x < player.x + player.width &&
				this.x + this.size > player.x &&
				this.y < player.y + player.height &&
				this.y + this.size > player.y
			) {
				if (this.direction == DIRECTION.UP) this.direction = DIRECTION.DL
				if (this.direction == DIRECTION.DOWN) this.direction = DIRECTION.UR
				if (this.direction == DIRECTION.UL) this.direction = DIRECTION.DL
				if (this.direction == DIRECTION.UR) this.direction = DIRECTION.DR
				if (this.direction == DIRECTION.DR) this.direction = DIRECTION.UR
				if (this.direction == DIRECTION.DL) this.direction = DIRECTION.DL
				return
			}
		})
		if (this.direction == DIRECTION.UP) this.y -= 1
		if (this.direction == DIRECTION.DOWN) this.y += 1
		if (this.direction == DIRECTION.LEFT) this.x -= 1
		if (this.direction == DIRECTION.RIGHT) this.x += 1
		if (this.direction == DIRECTION.UL) { this.y -= 1; this.x -= 1 }
		if (this.direction == DIRECTION.UR) { this.y -= 1; this.x += 1 }
		if (this.direction == DIRECTION.DL) { this.y += 1; this.x -= 1 }
		if (this.direction == DIRECTION.DR) { this.y += 1; this.x += 1 }
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
		this.direction = DIRECTION.NONE
		this.left = ''
		this.right = ''
		this.x = 0
		this.y = 0

		switch(pos) {
			case 'up':
				this.x = this.canvas.width / 2 - this.width / 2
				this.y = this.height * 1
				this.left = KEYS.A
				this.right = KEYS.D
				break;
			case 'down':
				this.x = this.canvas.width / 2 - this.width / 2
				this.y = this.canvas.height - this.height * 2
				this.left = KEYS.J
				this.right = KEYS.L
				break;
		}

		window.addEventListener('keydown', (e) => {
			if (e.code == this.left) this.direction = DIRECTION.LEFT
			if (e.code == this.right) this.direction = DIRECTION.RIGHT
		})
		window.addEventListener('keyup', (e) => {
			if (e.code == this.left && this.direction == DIRECTION.LEFT) this.direction = DIRECTION.NONE
			if (e.code == this.right && this.direction == DIRECTION.RIGHT) this.direction = DIRECTION.NONE
		})
	}
	update() {
		if (this.x < 0) this.x = 0
		if (this.x > this.canvas.width - this.width) this.x = this.canvas.width - this.width
		if (this.direction == DIRECTION.LEFT) this.x -= 2
		if (this.direction == DIRECTION.RIGHT) this.x += 2
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

		this.player1 = new Pad(this.ctx, this.canvas, 'up')
		this.player2 = new Pad(this.ctx, this.canvas, 'down')
		this.ball = new Ball(this.ctx, this.canvas, this)

		setInterval(() => { this.update(); this.draw() }, 0)
	}
	update() {
		this.player1.update()
		this.player2.update()
		this.ball.update()
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
