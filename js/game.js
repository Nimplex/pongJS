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

const hitPad = new Audio('../assets/hitPad.mp3')
const hitWall = new Audio('../assets/hitWall.mp3')

const gameStart = document.getElementById('game_start')
const gameOver = document.getElementById('game_over')

class Ball {
	constructor(ctx, canvas, game) {
		this.game = game
		this.players = [game.player1, game.player2, new Wall(ctx, canvas, 'left'), new Wall(ctx, canvas, 'right')]
		this.ctx = ctx
		this.canvas = canvas
		this.size = 20
		this.direction = DIRECTION.DOWN
		this.x = this.canvas.width / 2 - this.size / 2
		this.y = this.canvas.height / 2 - this.size / 2
		this.speed = 1.3
	}
	update() {
		if (this.y <= 0 + this.size || this.y >= this.canvas.height - this.size) {
			const { UR, UL, DR, DL, UP, DOWN } = DIRECTION
			const dir = this.direction
			if (dir == UR || dir == UL || dir == UP) this.game.gameOver('1')
			if (dir == DR || dir == DL || dir == DOWN) this.game.gameOver('2')
		}
		this.players.forEach(player => {
			if (
				this.x < player.x + player.width &&
				this.x + this.size > player.x &&
				this.y < player.y + player.height &&
				this.y + this.size > player.y
			) {
				if (player.type == 'wall') {
					hitWall.play()
					if (this.direction == DIRECTION.UP) return this.direction = DIRECTION.DL
					if (this.direction == DIRECTION.DOWN) return this.direction = DIRECTION.UR
					if (this.direction == DIRECTION.UL) return this.direction = DIRECTION.UR
					if (this.direction == DIRECTION.UR) return this.direction = DIRECTION.UL
					if (this.direction == DIRECTION.DR) return this.direction = DIRECTION.DL
					if (this.direction == DIRECTION.DL) return this.direction = DIRECTION.DR
				} else {
					hitPad.play()
					if (this.direction == DIRECTION.UP) return this.direction = DIRECTION.DL
					if (this.direction == DIRECTION.DOWN) return this.direction = DIRECTION.UR
					if (this.direction == DIRECTION.UL) return this.direction = DIRECTION.DL
					if (this.direction == DIRECTION.UR) return this.direction = DIRECTION.DR
					if (this.direction == DIRECTION.DR) return this.direction = DIRECTION.UR
					if (this.direction == DIRECTION.DL) return this.direction = DIRECTION.UL
				}
			}
		})
		if (this.direction == DIRECTION.UP) this.y -= this.speed
		if (this.direction == DIRECTION.DOWN) this.y += this.speed
		if (this.direction == DIRECTION.LEFT) this.x -= this.speed
		if (this.direction == DIRECTION.RIGHT) this.x += this.speed
		if (this.direction == DIRECTION.UL) { this.y -= this.speed; this.x -= this.speed }
		if (this.direction == DIRECTION.UR) { this.y -= this.speed; this.x += this.speed }
		if (this.direction == DIRECTION.DL) { this.y += this.speed; this.x -= this.speed }
		if (this.direction == DIRECTION.DR) { this.y += this.speed; this.x += this.speed }
	}
	draw() {
		this.game.started ? this.ctx.fillRect(this.x, this.y, this.size, this.size) : null
	}
}

class Pad {
	constructor(ctx, canvas, pos) {
		this.type = 'pad'
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

class Wall {
	constructor(ctx, canvas, pos) {
		this.type = 'wall'
		this.ctx = ctx
		this.canvas = canvas
		this.width = 10
		this.height = this.canvas.height
		this.x = 0
		this.y = 0

		switch(pos) {
			case 'left':
				this.x = 0
				this.y = 0
				break;
			case 'right':
				this.x = this.canvas.width
				this.y = 0
				break;
		}
	}
	update() {
	}
	draw() {
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
		this.started = false

		let time;
		let timeout = false;
		let delta = 200;

		window.addEventListener('resize', () => {
			time = new Date()
			if (timeout === false) {
				timeout = true
				setTimeout(resizeend, delta)
			}
		})
		
		const resizeend = () => {
			if (new Date() - time < delta) {
				setTimeout(resizeend, delta)
			} else {
				timeout = false
				location.reload()
			}
		}

		window.addEventListener('keydown', (event) => event.code == 'KeyE' ? this.startGame() : null)

		setInterval(() => { this.started ? this.update() : null; this.draw() }, 0)
	}
	startGame() {
		gameStart.style.display = 'none'
		this.started = true
	}
	gameOver(player) {
		this.started = false
		gameOver.style.display = 'flex'
		gameOver.innerText = `Player ${player} won the game`
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
