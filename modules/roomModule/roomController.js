const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')
const RoomService = require('./roomService')
const roomDetail = require('../../db/models/roomDetail')

const addRoom = catchAsync(async (req, res) => {
	console.log(req.user)
	const response = await RoomService.addRoom(req.body, req.user.id)

	if (!response) {
		throw new AppError('Error adding room', 400)
	}

	return res.status(200).json(response)
})

const updateRoom = catchAsync(async (req, res) => {
	const response = await RoomService.updateRoom(req.body, req.params.id)

	return res.status(200).json(response)
})

const getRoom = catchAsync(async (req, res) => {
	const result = await RoomService.getRoom(
		req.query.id,
		req.query.page,
		req.query.limit,
	)

	if (!result) {
		throw new AppError('No room found', 400)
	}

	return res.status(200).json(result)
})

const deleteRoom = catchAsync(async (req, res) => {
	const response = await RoomService.deleteRoom(req.params.id)
	return res.status(200).json(response)
})

module.exports = { addRoom, updateRoom, getRoom, deleteRoom }
