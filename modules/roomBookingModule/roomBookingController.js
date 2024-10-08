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

	getRoomBookingHistory = catchAsync(async (req, res) => {
		const { page, limit, paymentStatus } = req.query
		const userId = req.user.id
		const roomBookingHistoryRes =
			await RoomBookingService.getRoomBookingHistory(
				page,
				limit,
				userId,
				paymentStatus,
			)

		if (!roomBookingHistoryRes) {
			throw new AppError('Error fetching room booking history', 400)
		}

		return res.status(201).json(roomBookingHistoryRes)
	})

	cancelRoomBooking = catchAsync(async (req, res) => {
		const { id } = req.params
		const roomBookingCancellationRes =
			await RoomBookingService.cancelRoomBooking(id)

		if (!roomBookingCancellationRes) {
			throw new AppError('Error cancelling room booking', 400)
		}

		return res.status(201).json(roomBookingCancellationRes)
	})

	updateRoomBookingPaymentStatus = catchAsync(async (req, res) => {
		const roomBookingId = req.params.id
		const paymentStatus = req.body.paymentStatus
		const updateRoomBookingPaymentStatusRes =
			await RoomBookingService.updateRoomBookingPaymentStatus(
				roomBookingId,
				paymentStatus,
			)

		if (!updateRoomBookingPaymentStatusRes) {
			throw new AppError('Error updating room booking payment status', 400)
		}

		return res.status(201).json(updateRoomBookingPaymentStatusRes)
	})
}

module.exports = new RoomBookingController()
