'use strict'
const DataTypes = require('DataTypes')

const user = require('./user')
const room = require('./room')
const sequelize = require('../../config/database')

const roomBooking = sequelize.define(
	'RoomBookings',
	{
		id: {
			allowNull: false,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		roomId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		totalPersonBookedFor: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		rentAmount: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		payDate: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		paymentStatus: {
			type: DataTypes.ENUM('paid', 'pending'),
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		deletedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		DataTypes,
		modelName: 'RoomBookings',
		tableName: 'RoomBookings',
		paranoid: true,
	},
)

user.hasMany(roomBooking, { foreignKey: 'userId' })
room.hasMany(roomBooking, { foreignKey: 'roomId' })

roomBooking.belongsTo(user, { foreignKey: 'userId' })
roomBooking.belongsTo(room, { foreignKey: 'roomId' })

module.exports = roomBooking
