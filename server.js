require('dotenv').config()
const PORT = process.env.APP_PORT
const express = require('express')
const globalErrorHandler = require('./controller/errorController')
const app = express()
const AppError = require('./utils/appError')

// enable json parsing
app.use(express.json())

// enable body parsing
app.use(express.urlencoded({ extended: false }))

// Routes
const authRoute = require('./route/authRoute')

app.use('/api/v1/auth', authRoute)

// fallback route
app.use('*', () => {
	throw new AppError('Resource not found')
})

// Global Error Handler
app.use(globalErrorHandler)

app.listen(PORT, () => {
	console.log(`server is listening on http://localhost:${PORT}`)
})
