require('dotenv').config({ path: `${process.cwd()}/.env` })
//const AppError = require('../utils/appError')

const globalErrorHandler = (err, req, res, next) => {
	console.error(err)
	if (process.env.NODE_ENV === 'development') {
		return sendErrorDev(err, res)
	}

	sendErrorProd(err, res)
}

const sendErrorDev = (err, res) => {
	const statusCode = err.statusCode || 500
	const status = err.status || 'error'
	const message = err.message || 'something went wrong'

	return res.status(statusCode).json({
		status: status,
		message: message,
	})
}

const sendErrorProd = (err, res) => {
	const statusCode = err.statusCode || 500
	const status = err.status || 'error'
	const message = err.message || 'something went wrong'

	if (err.isOperational) {
		return res.status(statusCode).json({
			status: status,
			message: message,
		})
	}

	return res.status(statusCode).json({
		status: 'error',
		message: 'something went wrong',
	})
}

module.exports = globalErrorHandler
