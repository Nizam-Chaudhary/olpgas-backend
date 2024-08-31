const catchAsync = require('../../utils/catchAsync')
const AppError = require('../../utils/appError')
const RoomService = require('./roomService')

const addRoom = catchAsync(async (req, res) => {
	console.log(req.user)
	const roomRes = await RoomService.addRoom(req.body, req.user.id)

	if (!roomRes) {
		throw new AppError('Error adding room', 400)
	}

	return res.status(200).json({
		status: 'success',
		message: 'Room added successfully',
	})
})

const updateRoom = catchAsync(async (req, res) => {
	await RoomService.updateRoom(
		req.body,
		req.params.roomId,
		req.params.roomDetailId
	)

	return res.status(200).json({
		status: 'success',
		message: 'Room updated successfully',
	})
})

const getRoom = catchAsync(async (req, res) => {
	const result = await RoomService.getRoom(
		req.query.id,
		req.query.page,
		req.query.limit
	)

	if (!result) {
		throw new AppError('No room found', 400)
	}

	return res.status(200).json(result)
})

const deleteRoom = catchAsync(async (req, res) => {
	await RoomService.deleteRoom(req.params.id)
	return res.status(200).json({
		status: 'success',
		message: 'Room deleted successfully',
	})
})

module.exports = { addRoom, updateRoom, getRoom, deleteRoom }
