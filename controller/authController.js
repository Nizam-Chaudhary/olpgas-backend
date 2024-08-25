const catchAsync = require('../utils/catchAsync')
const user = require('../db/models/user')

const signup = catchAsync(async (req, res) => {
	const input = req.body

	let data = await user.create({
		fullName: input.fullName,
		age: input.age,
		gender: input.gender,
		email: input.email,
		password: input.password,
		phoneNumber: input.phoneNumber,
		address: input.address,
		city: input.city,
		state: input.state,
	})

	data = data.toJSON()

	delete data.createdAt
	delete data.updatedAt
	delete data.deletedAt
	delete data.password

	if (!data) {
		return res.status(400).json({
			status: 'fail',
			message: 'error creating user',
		})
	}
	return res.status(201).json({
		status: 'success',
		user: data,
	})
})

module.exports = { signup }
