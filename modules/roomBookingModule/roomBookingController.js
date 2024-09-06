const AppError = require('../../utils/appError')
const catchAsync = require('../../utils/catchAsync')
const RoomBookingService = require('./roomBookingService')

class RoomBookingController {
	addRoomBooking = catchAsync(async (req, res) => {
		const roomBookingRes = await RoomBookingService.addRoomBooking(
			req.body,
			req.user.id,
		)

		if (!roomBookingRes) {
			throw new AppError('Error booking room', 400)
		}

		return res.status(201).json(roomBookingRes)
	})
}

module.exports = new RoomBookingController()
