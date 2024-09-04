const catchAsync = require('../../utils/catchAsync')
const roomDetail = require('../../db/models/roomDetail')
const room = require('../../db/models/room')
const AppError = require('../../utils/appError')
const sequelize = require('../../config/database')

class RoomService {
	addRoom = async (body, ownerId) => {
		const transaction = sequelize.transaction()

		await room
			.create(
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
			.catch(async (err) => {
				await transaction.rollback()
				throw new AppError('Error adding room', 400)
			})

		if (!roomRes) {
			throw new AppError('Error adding room', 400)
		}

		await roomDetail
			.create(
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
			.catch(async (err) => {
				await transaction.rollback()
				throw new AppError('Error adding room', 400)
			})

		await transaction.commit()

		return true
	}

	updateRoom = async (body, roomId, roomDetailId) => {
		const transaction = sequelize.transaction()
		await roomDetail
			.update(
				{
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
					images: body.images,
				},
				{
					where: { id: roomDetailId },
				},
				{ transaction },
			)
			.catch(async (err) => {
				await transaction.rollback()
				throw new AppError('Error updating room', 400)
			})

		await room
			.update(
				{
					roomName: body.roomName,
					address: body.address,
					city: body.city,
					state: body.state,
					bookingStatus: body.bookingStatus,
					occupancy: body.occupancy,
					occupiedBy: body.occupiedBy,
					roomFeatureId: roomId,
					ownerId: body.ownerId,
				},
				{
					where: { id: roomId },
				},
				{ transaction },
			)
			.catch(async (err) => {
				await transaction.rollback()
				throw new AppError('Error updating room', 400)
			})

		return {
			message: 'Room update successfully',
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

	deleteRoom = async (roomId, roomDetailId) => {
		const transaction = sequelize.transaction()
		await room
			.destroy(
				{
					where: { id: roomId, roomDetailId },
				},
				{ transaction },
			)
			.catch(async (err) => {
				await transaction.rollback()
				throw new AppError('Error removing room', 400)
			})

		await roomDetail
			.destroy(
				{
					where: {
						id: roomDetailId,
					},
				},
				{ transaction },
			)
			.catch(async (err) => {
				await transaction.rollback()
				throw new AppError('Error removing room', 400)
			})

		await transaction.commit()

		return {
			status: 'success',
			message: 'Room removed successfully',
		}
	}
}

module.exports = new RoomService()
