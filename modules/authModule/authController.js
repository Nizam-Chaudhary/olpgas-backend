const catchAsync = require('../../utils/catchAsync')
const user = require('../../db/models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const AppError = require('../../utils/appError')

const signup = catchAsync(async (req, res) => {
	const input = req.body

	let result = await user.create({
		fullName: input.fullName,
		age: input.age,
		gender: input.gender,
		email: input.email,
		password: input.password,
		confirmPassword: input.confirmPassword,
		phoneNumber: input.phoneNumber,
		address: input.address,
		city: input.city,
		state: input.state,
	})

	result = result.toJSON()

	delete result.createdAt
	delete result.updatedAt
	delete result.deletedAt
	delete result.password

	result.token = generateToken({
		id: result.id,
	})

	if (!result) {
		return res.status(400).json({
			status: 'fail',
			message: 'error creating user',
		})
	}

	return res.status(201).json({
		status: 'success',
		user: result,
	})
})

const login = catchAsync(async (req, res) => {
	const email = req.body.email
	const password = req.body.password

	if (!email || !password) {
		throw new AppError('Please provide credentials', 400)
	}

	const result = await user.findOne({
		where: { email: email },
	})

	if (!result) {
		throw new AppError('Invalid Email or Password', 400)
	}

	if (!bcrypt.compareSync(password, result.password)) {
		throw new AppError('Invalid Email or Password', 400)
	}

	const token = generateToken({
		id: result.id,
	})

	return res.status(200).json({
		status: 'success',
		token: token,
	})
})

const generateToken = (payload) => {
	return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})
}

module.exports = { signup, login }
