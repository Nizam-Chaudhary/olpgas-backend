const catchAsync = require('../utils/catchAsync')
const user = require('../db/models/user')
const AppError = require('../utils/appError')

const getUserDetail = catchAsync(async (req, res) => {
	const id = req.user.id

	let result = await user.findByPk(id)

	result = result.toJSON()

	delete result.password
	delete result.updatedAt
	delete result.deletedAt

	return res.status(200).json({
		status: 'success',
		user: result,
	})
})

const updateUserDetail = catchAsync(async (req, res) => {
	const id = req.user.id

	let result = await user.findByPk(id)

	result.fullName = req.body.fullName || result.fullName
	result.age = req.body.age || result.age
	result.gender = req.body.gender || result.gender
	result.phoneNumber = req.body.phoneNumber || result.phoneNumber
	result.address = req.body.address || result.address
	result.city = req.body.city || result.city
	result.state = req.body.state || result.state

	await result.save()

	result = result.toJSON()

	delete result.password
	delete result.updatedAt
	delete result.deletedAt

	return res.status(200).json({
		status: 'success',
		user: result,
	})
})

module.exports = { getUserDetail, updateUserDetail }
