const moment = require('moment')
const sequelize = require('../../config/database')
const room = require('../../db/models/room')
const roomBooking = require('../../db/models/roomBooking')
const AppError = require('../../utils/appError')

class RoomBookingService {
	addRoomBooking = async (input, userId) => {
		const transaction = await sequelize.transaction()
		try {
			const roomRes = await room.findByPk(input.roomId)
			const roomDetailRes = await roomRes.getRoomDetail()

			if (!roomDetailRes.shareable) {
				input.totalPersonBookedFor = roomDetailRes.occupancy
			}

			const NoOfPersonCanStay = roomDetailRes.occupancy - roomRes.occupiedBy
			if (input.totalPersonBookedFor > NoOfPersonCanStay) {
				throw new AppError('Not enough occupancy available', 400)
			}
			const rentAmount = Math.floor(
				(roomDetailRes.rentAmount / roomDetailRes.occupancy) *
					input.totalPersonBookedFor,
			)

			const depositAmount = Math.floor(
				(roomDetailRes.deposit / roomDetailRes.occupancy) *
					input.totalPersonBookedFor,
			)

			const payDate = moment().add(10, 'days')

			const roomBookingRes = await roomBooking.create(
				{
					userId: userId,
					roomId: input.roomId,
					totalPersonBookedFor: input.totalPersonBookedFor,
					rentAmount: rentAmount,
					depositAmount: depositAmount,
					payDate: payDate,
				},
				{ transaction },
			)

			roomRes.occupiedBy = input.totalPersonBookedFor
			await roomRes.save({ transaction })

			await transaction.commit()
			return {
				status: 'success',
				message: 'Room Booked Successfully',
				roomBooking: roomBookingRes,
			}
		} catch (error) {
			await transaction.rollback()
			throw error
		}
	}

	getRoomBookingHistory = async (
		page = 1,
		limit = 20,
		userId,
		paymentStatus = null,
	) => {
		const offset = (page - 1) * limit

		let whereClause = { userId: userId }
		if (paymentStatus) {
			whereClause = {
				...whereClause,
				paymentStatus: paymentStatus,
			}
		}
		const { rows, count } = await roomBooking.findAndCountAll({
			where: whereClause,
			offset: offset,
			limit: limit,
		})

		return {
			status: 'success',
			totalRecords: count,
			totalPages: Math.ceil(count / limit),
			currentPage: page,
			roomBookingsHistory: rows,
		}
	}
}

module.exports = new RoomBookingService()
