const catchAsync = require('../../utils/catchAsync')
const roomDetail = require('../../db/models/roomDetail')
const room = require('../../db/models/room')
const AppError = require('../../utils/appError')
const sequelize = require('../../config/database')

class RoomService {
	addRoom = async (body, ownerId) => {
		const transaction = await sequelize.transaction()
		try {
			const roomRes = (
				await room.create(
					{
						roomName: body.roomName,
						address: body.address,
						city: body.city,
						state: body.state,
						bookingStatus: body.bookingStatus,
						occupiedBy: body.occupiedBy,
						ownerId: ownerId,
					},
					{ transaction },
				)
			).toJSON()

			const roomDetailRes = (
				await roomDetail.create(
					{
						id: roomRes.roomFeatureId,
						roomArea: body.roomArea,
						shareable: body.shareable,
						occupancy: body.occupancy,
						roomType: body.roomType,
						rentAmount: body.rentAmount,
						deposit: body.deposit,
						description: body.description,
						suitableFor: body.suitableFor,
						features: body.features,
						ratings: body.ratings,
						imageUrls: body.imageUrls,
					},
					{ transaction },
				)
			).toJSON()

			await transaction.commit()

			return {
				status: 'success',
				message: 'Room added successfully',
				room: { room: roomRes, roomDetail: roomDetailRes },
			}
		} catch (err) {
			await transaction.rollback()
			throw err
		}
	}

	updateRoom = async (body, roomId) => {
		const transaction = await sequelize.transaction()
		try {
			const roomRes = await room.findByPk(roomId)

			roomRes.roomName = body.roomName || roomRes.roomName
			roomRes.address = body.address || roomRes.address
			roomRes.city = body.city || roomRes.city
			roomRes.state = body.state || roomRes.state
			roomRes.bookingStatus = body.bookingStatus || roomRes.bookingStatus
			roomRes.occupancy = body.occupancy || roomRes.occupancy
			roomRes.occupiedBy = body.occupiedBy || roomRes.occupiedBy

			await roomRes.save({ transaction })

			const roomDetailRes = await roomDetail.findByPk(roomRes.roomFeatureId)

			roomDetailRes.roomArea = body.roomArea || roomDetailRes.roomArea
			roomDetailRes.shareable = body.shareable || roomDetailRes.shareable
			roomDetailRes.occupancy = body.occupancy || roomDetailRes.occupancy
			roomDetailRes.roomType = body.roomType || roomDetailRes.roomType
			roomDetailRes.rentAmount = body.rentAmount || roomDetailRes.rentAmount
			roomDetailRes.deposit = body.deposit || roomDetailRes.deposit
			roomDetailRes.description = body.description || roomDetailRes.description
			roomDetailRes.suitableFor = body.suitableFor || roomDetailRes.suitableFor
			roomDetailRes.features = body.features || roomDetailRes.features
			roomDetailRes.ratings = body.ratings || roomDetailRes.ratings
			roomDetailRes.images = body.images || roomDetailRes.images

			await roomDetailRes.save({ transaction })

			await transaction.commit()
			return {
				status: 'success',
				message: 'Room updated successfully',
			}
		} catch (err) {
			await transaction.rollback()
			throw err
		}
	}

	getRoom = async (id = null, page = 1, limit = 10) => {
		const offset = (page - 1) * limit

		let whereClause
		if (id) {
			whereClause = { id: id }
		}

		const { count, rows } = await room.findAndCountAll({
			include: {
				model: roomDetail,
			},
			where: whereClause,
			limit: limit,
			offset: offset,
		})

		return {
			status: 'success',
			count: count,
			currentPage: page,
			pages: Math.ceil(count / limit),
			room: rows,
		}
	}

	deleteRoom = async (id) => {
		const transaction = await sequelize.transaction()
		try {
			const roomRes = await room.findByPk(id)

			await roomDetail.destroy(
				{
					where: {
						id: roomRes.roomFeatureId,
					},
				},
				{ transaction },
			)

			await roomRes.destroy({ transaction })

			await transaction.commit()

			return {
				status: 'success',
				message: 'Room removed successfully',
			}
		} catch (err) {
			await transaction.rollback()
			throw err
		}
	}
}

module.exports = new RoomService()
