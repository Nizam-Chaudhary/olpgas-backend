require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const globalErrorHandler = require('./modules/errorModule/errorController')
const app = express()
const AppError = require('./utils/appError')

// enable json parsing
app.use(express.json())

// enable body parsing
app.use(express.urlencoded({ extended: false }))

// Routes
const authRoute = require('./route/authRoute')
const userRoute = require('./route/userRoute')
const roomRoute = require('./route/roomRoute')
const roomBookingRoute = require('./route/roomBookingRoute')

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/room', roomRoute)
app.use('/api/v1/roomBooking', roomBookingRoute)

// fallback route
app.use('*', () => {
	throw new AppError('Resource not found')
})

// Global Error Handler
app.use(globalErrorHandler)

app.listen(PORT, () => {
	console.log(`server is listening on http://localhost:${PORT}`)
})
