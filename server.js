require('dotenv').config({ path: `${process.cwd()}/.env` })
const PORT = process.env.PORT || 3000
const express = require('express')
const globalErrorHandler = require('./controller/errorController')
const app = express()
const AppError = require('./utils/appError')

// enable json parsing
app.use(express.json())

// enable body parsing
app.use(express.urlencoded({ extended: false }))

// fallback route
app.get('/', (req, res) => {
	res.send('Hello')
})

app.use('*', () => {
	throw new AppError('Resource not found')
})

// Global Error Handler
app.use(globalErrorHandler)

app.listen(PORT, () => {
	console.log(`server is listening on http://localhost:${PORT}`)
})
