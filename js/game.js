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
	const pad1 = new Pad(ctx, canvas.width / 2 - 100, 20, 'a', 'd')
	const pad2 = new Pad(
		ctx,
		canvas.width / 2 - 100,
		canvas.height - 40,
		'a',
		'd'
	)

	setInterval(() => {
		clear()
		;[pad1, pad2, ball].forEach((elem) => {
			elem.update()
			elem.draw()
		})
	}, 0)
}

window.onload = init
