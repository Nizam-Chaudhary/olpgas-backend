require('dotenv').config()
const user = require('../db/models/user')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

const authenticateUser = catchAsync(async (req, res, next) => {
	if (
		!req.headers.authorization ||
		!req.headers.authorization.startsWith('Bearer')
	) {
		throw new AppError('Please provide token', 401)
	}
	const token = req.headers.authorization.split(' ')[1]

	if (!token) {
		throw new AppError('Please provide token', 401)
	}

	const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY)

	if (!tokenDetail) {
		throw new AppError('Invalid token', 401)
	}

	req.user = await user.findByPk(tokenDetail.id)
	next()
})

module.exports = authenticateUser
