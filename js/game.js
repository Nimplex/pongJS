const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const init = () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
	gameLoop()
}

const clear = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const gameLoop = () => {
	const ball = new Ball(ctx)

	setInterval(() => {
		clear()
		ball.update()
		ball.draw()
	}, 0)
}

window.onload = init