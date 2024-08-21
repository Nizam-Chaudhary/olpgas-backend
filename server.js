require('dotenv').config({ path: `${process.cwd()}/.env` })
const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()

// enable json parsing
app.use(express.json())

// enable body parsing
app.use(express.urlencoded({ extended: false }))

app.use('*', (req, res) => {
	res.status(200).json({
		message: 'Resource not found',
	})
})

app.use((error, req, res) => {
	console.error(error)
	res.status(500).json({
		message: 'Internal Server Error',
	})
})

const startServer = async () => {
	app.listen(PORT, () => {
		console.log(`Server is live on http://localhost:${PORT}`)
	})
}

startServer()
