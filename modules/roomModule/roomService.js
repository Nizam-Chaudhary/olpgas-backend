const catchAsync = require("../../utils/catchAsync");
const roomDetail = require("../../db/models/roomDetail");
const room = require("../../db/models/room");

class RoomService {
	addRoomDetails = async (body) => {
		return await roomDetail.create({
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
		});
	};

	addRoom = async (body, roomId) => {
		return await room.create({
			roomName: body.roomName,
			address: body.address,
			city: body.city,
			state: body.state,
			bookingStatus: body.bookingStatus,
			occupancy: body.occupancy,
			occupiedBy: body.occupiedBy,
			roomFeatureId: roomId,
			ownerId: body.ownerId,
		});
	};

	updateRoom = async (body, roomId, roomDetailId) => {
		await roomDetail.update(
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
		);

		await room.update(
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
		);

		return;
	};

	getRoom = async (id, page, limit) => {
		const offset = (page - 1) * limit;

		let whereClause;
		if (!id) {
			whereClause = { id: id };
		}

		return await room.findAndCountAll({
			include: {
				model: roomDetail,
			},
			where: whereClause,
			limit: limit,
			offset: offset,
		});
	};

	deleteRoom = async (id) => {
		await room.destroy({
			where: { id: id },
		});
		return;
	};
}

module.exports = RoomService;
