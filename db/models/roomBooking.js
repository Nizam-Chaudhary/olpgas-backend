'use strict'

const user = require('./user')
const room = require('./room')
const { DataTypes } = require('sequelize')
const sequelize = require('../../config/database')

const RoomBookings = sequelize.define(
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
		depositAmount: {
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
			defaultValue: 'pending',
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
		paranoid: true,
		freezeTableName: true,
		modelName: 'RoomBookings',
	},
)

user.hasMany(RoomBookings, { foreignKey: 'userId' })
room.hasMany(RoomBookings, { foreignKey: 'roomId' })

RoomBookings.belongsTo(user, { foreignKey: 'userId' })
RoomBookings.belongsTo(room, { foreignKey: 'roomId' })

module.exports = RoomBookings
